import random
from datetime import date

from django.http import QueryDict
from django.shortcuts import render
from django_eventstream import send_event
from rest_framework import status, parsers, generics
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework.viewsets import ModelViewSet
from rest_live.mixins import RealtimeMixin

from attendance.services.emotionDetector import detectUserEmotion
from attendance.services.statistics import attendanceSummary, studentPerSection
from course.permissions import InstructionPermission

from attendance.services.canvasUtils import CanvasUtils

from account.models import Student, Instructor
from attendance.models import Issue, Attendance
from course.models import Section
from attendance.serializers import IssueSerializer, AttendanceSerializer
from course.services.schedule import currentCourse
from recognition.models import StudentImage
from recognition.services.recognize_image import recognize_image


class TeacherDailyReportAPIView(APIView):
    """
    View attendance report
    """
    permission_classes = [IsAuthenticatedOrReadOnly, InstructionPermission]

    def get(self, request):
        user = self.request.user
        instructor = get_object_or_404(Instructor, user=user)
        data = {"today_report": AttendanceSerializer(Attendance.objects.filter(section__instructor=instructor,
                                                                               recordedDate=date.today()), many=True).data}
        return Response(
            data,
            status=status.HTTP_200_OK
        )


class StudentNameAPIView(APIView):
    """
    get student name
    """
    permission_classes = [IsAuthenticatedOrReadOnly, InstructionPermission]

    def get(self, request, id):
        student = get_object_or_404(Student, pk=id)
        user = student.user
        return Response({
            "first_name": user.first_name,
            "last_name": user.last_name
        },status=status.HTTP_200_OK
        )


class AttendanceStatisticsAPIView(APIView):
    """
    return total number of late, present, and absent
    """
    permission_classes = [IsAuthenticatedOrReadOnly, InstructionPermission]

    def get(self, request):
        user = self.request.user
        instructor = get_object_or_404(Instructor, user=user)
        return Response(
            attendanceSummary(instructor),
            status=status.HTTP_200_OK)


class SectionStatisticsAPIView(APIView):
    """
    return total number of late, present, and absent
    """
    permission_classes = [IsAuthenticatedOrReadOnly, InstructionPermission]

    def get(self, request):
        user = self.request.user
        instructor = get_object_or_404(Instructor, user=user)
        return Response(
            studentPerSection(instructor),
            status=status.HTTP_200_OK)


class AttendanceLiveViewSet(generics.ListCreateAPIView, RealtimeMixin):
    """
    taking attendance in real time
    """
    queryset = Attendance.objects.none()
    serializer_class = AttendanceSerializer
    #permission_classes = [IsAuthenticatedOrReadOnly, InstructionPermission]

    def get_queryset(self):
        section_id = self.kwargs["section"]
        user = self.kwargs["user"]
        section = get_object_or_404(Section, id=section_id, instructor__user=user)
        return Attendance.objects.filter(section=section)


class AttendanceSectionAPIView(APIView):
    """
    View Attendance
    """
    permission_classes = [IsAuthenticatedOrReadOnly, InstructionPermission]

    def get(self, request):
        data = {}
        user = self.request.user
        instructor = get_object_or_404(Instructor, user=user)
        current_section = currentCourse(user)[1]
        if current_section is not None:
            attendance = Attendance.objects.filter(section=current_section, recordedDate=date.today())
            data["attendance"] = AttendanceSerializer(attendance, many=True).data
            data["attendance_status"] = 1
            return Response(
                data,
                status=status.HTTP_200_OK
            )
        else:
            data["attendance"]=None
            data["attendance_status"] = 0
            return Response(
                data,
                status=status.HTTP_200_OK
            )


class AttendanceStudentAPIView(APIView):
    """
    Student taking attendance
    """
    permission_classes = [IsAuthenticatedOrReadOnly]
    parser_classes = [parsers.FormParser, parsers.JSONParser, parsers.MultiPartParser]

    def get(self, request):
        data = {}
        user = self.request.user
        student = get_object_or_404(Student, user=user)
        images_loaded = StudentImage.objects.filter(student=student).count()
        print("AttendanceStudentAPIView: Found this many images for the student:")
        print(images_loaded)
        attendanceExist = Attendance.objects.filter(student=student, section=currentCourse(user)[1],
                                                    recordedDate=date.today()).exists()
        if images_loaded ==0:
            data["message"] = "Attendance cannot be recorded. Please upload images"
            data["authorization"] = 0
            return Response(
                data,
                status=status.HTTP_200_OK
            )
        elif attendanceExist:
            data["message"] = "Attendance already recorded"
            data["authorization"] = 0
            return Response(
                data,
                status=status.HTTP_200_OK
            )
        else:
            data["message"] = "You are ready to take attendance but you are recommended to upload more picture in the " \
                              "future" if 1<=images_loaded<5 else "Ready to take attendance"
            data["authorization"] = 1
            return Response(
                data,
                status=status.HTTP_200_OK
            )

    def post(self, request):
        print(request.FILES)
        data = request.data
        print("AttendanceStudentAPIView: Requested emotion is:")
        print(data["emotion"])
        verifyEmotion = detectUserEmotion(request.FILES["emotionImage"])
        print("AttendanceStudentAPIView: Found emotion is:")
        print(verifyEmotion)
        id = recognize_image(request.FILES["regularImage"], self.request.user)
        if verifyEmotion == data["emotion"] and id["id"] is not None:
            student = get_object_or_404(Student, id=id["id"])
            attendance = Attendance(status="Present", section=currentCourse(student.user)[1], student=student)
            attendance.save()
            # Now that attendance has been taken, we can update the corresponding assignment on Canvas.
            # We need the course the student took attendance for, as well as the student.
            canvas = CanvasUtils()
            canvas.updateAttendanceScore(currentCourse(student.user)[1], student)
            print(attendance)
            return Response({
                "message": "You have been marked present",
                "completed": True
            },
                status=status.HTTP_200_OK
            )
        return Response({
                "message": "Please try again. You could not be identified",
                "completed": False
            },
                status=status.HTTP_200_OK
        )


class IssueSubmissionAPIView(APIView):
    """
    submitting an issue
    """
    def post(self, request):
        # Pull the subject and message from the request
        data = request.data
        request_subject = data["subject"]
        request_message = data["message"]
        print("IssueSubmissionAPIView: The issue's subject is:")
        print(request_subject)
        print("IssueSubmissionAPIView: The issue's description is:")
        print(request_message)
        # Do not allow empty requests to be submitted
        if (len(request_subject) == 0 or len(request_message) == 0):
            return Response({
                "message": "Cannot submnit a blank issue!",
                "completed": False
            },
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # If the request is not blank, get the user that made it
        request_user = self.request.user
        # Verify that the user is a student
        request_student = get_object_or_404(Student, user=request_user)
        print("IssueSubmissionAPIView: Got a student! Their canvas ID is:")
        print(request_student.canvasId)
        # Get the section that the user is making the issue for
        curr_section = currentCourse(request_student.user)[1]
        print("IssueSubmissionAPIView: Found a section for the student! It is:")
        print(curr_section)
        # Now we have all the information we need to complete the issue, so make it.
        # The student is allowed to have multiple issues, so no need to check if one exists already.
        issue = Issue(student=request_student, section=curr_section, subject=request_subject, message=request_message)
        # Save the issue in the backend
        issue.save()
        # Return a response indicating that the issue has been created. This will autoredirect the user back to the
        # home page, since completed is set to True here.
        return Response({
            "message": "Issue has been submitted!",
            "completed": True
        },
            status=status.HTTP_200_OK
        )


class IssueApprovalAPIView(APIView):
    """
    approving issues
    """
    def post(self, request):
        print("IssueApprovalAPIView: Going to approve issues!")
        # Get the request field. This contains the list of issues to modify
        data = request.data
        issues_to_modify_raw = data["issues_to_modify"]
        print("IssueApprovalAPIView: The issues to modify are:")
        print(issues_to_modify_raw)
        # Split the comma-separated list into its constituents
        # TODO add checking to make sure the list follows the right format
        issues_to_modify_list = issues_to_modify_raw.split(",")
        # Create an empty list to store the actual issues
        issues_to_accept_ids = []
        # At this point, issues_to_modify_list is a list of either individual numbers
        # or ranges (separated by the "-" character)
        # Iterate through each entry
        for issue_range in issues_to_modify_list:
            # If the entry is a range...
            if "-" in issue_range:
                # Find the starting and stopping points
                entries = issue_range.split("-")
                # Add all of the values in that range to the list
                for entry in range(int(entries[0]), int(entries[1])+1):
                    issues_to_accept_ids.append(entry)
            # Otherwise, the entry is just a number, so add it to the list
            else:
                issues_to_accept_ids.append(int(issue_range))
        print("IssueApprovalAPIView: The issues to approve are now:")
        print(issues_to_accept_ids)
        
        # For each issue that should be accepted...
        for issue_to_accept_id in issues_to_accept_ids:
            # Get the issue with the matching ID if it exists
            if (Issue.objects.filter(id=issue_to_accept_id).exists()):
                issue_to_accept = Issue.objects.filter(id=issue_to_accept_id)[0]
                # Find the student that had the issue
                student_with_issue = issue_to_accept.student
                # Find the section the issue was associated with
                section_with_issue = issue_to_accept.section
                # Increment the attendance score associated with the student in that section
                canvas = CanvasUtils()
                canvas.updateAttendanceScore(section_with_issue, student_with_issue)
                print("IssueApprovalAPIView: Updated the score!")
                # Delete the issue once the score has been updated - no need to see it anymore!
                Issue.objects.filter(id=issue_to_accept_id).delete()
        
        return Response({
            "message": "Issues have been approved!",
            "completed": True
        },
            status=status.HTTP_200_OK
        )


class IssueRejectionAPIView(APIView):
    """
    rejecting issues
    """
    def post(self, request):
        print("IssueRemovalAPIView: Going to reject issues!")
        # Get the request field. This contains a list of issues to modify
        data = request.data
        issues_to_modify_raw = data["issues_to_modify"]
        # Split the comma-separated list into its constituents
        # TODO add checking to make sure the list follows the right format
        issues_to_modify_list = issues_to_modify_raw.split(",")
        # Create an empty list to store the actual issues
        issues_to_reject_ids = []
        # At this point, issues_to_modify_list is a list of either individual numbers
        # or ranges (separated by the "-" character)
        # Iterate through each entry
        for issue_range in issues_to_modify_list:
            # If the entry is a range...
            if "-" in issue_range:
                # Find the starting and stopping points
                entries = issue_range.split("-")
                # Add all of the values in that range to the list
                for entry in range(int(entries[0]), int(entries[1])+1):
                    issues_to_reject_ids.append(entry)
            # Otherwise, the entry is just a number, so add it to the list
            else:
                issues_to_reject_ids.append(int(issue_range))
        print("IssueRejectionAPIView: The issues to reject are now:")
        print(issues_to_reject_ids)

        # For each issue that should be rejected...
        for issue_to_reject_id in issues_to_reject_ids:
            # Delete the issue if it exists. There's no need to update a score
            # or save the issue, since it will be rejected.
            # TODO figure out if there's a way to send a message to the student
            # on Canvas letting them know that their issue was rejected
            if (Issue.objects.filter(id=issue_to_reject_id).exists()):
                print("IssueRejectionAPIView: Found a matching issue!")
                Issue.objects.filter(id=issue_to_reject_id).delete()

        return Response({
            "message": "Issues have been rejected!",
            "completed": True
        },
            status=status.HTTP_200_OK
        )

