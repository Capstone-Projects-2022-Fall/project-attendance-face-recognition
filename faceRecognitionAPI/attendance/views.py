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


class StudentIssuesAPIView(APIView):
    """
    Submit and view created issue
    """
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request, id):
        user = self.request.user
        student = get_object_or_404(Student, user=user)
        section = get_object_or_404(Section, id=id)
        issues = Issue.objects.filter(section__student=student, section=section)
        serializer = IssueSerializer(issues, many=True)
        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )

    def post(self, request, id):
        data = request.data
        if isinstance(data, QueryDict):
            data._mutable = True
        user = self.request.user
        student = get_object_or_404(Student, user=user)
        data["student"] = student.id
        data["section"] = id
        serializer = IssueSerializer(context={'request': request}, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )
        else:
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )


class TeacherIssuesAPIView(APIView):
    """
    View students issues and resolve them
    """
    permission_classes = [IsAuthenticatedOrReadOnly, InstructionPermission]

    def get(self, request, id):
        user = self.request.user
        instructor = get_object_or_404(Instructor, user=user)
        section = get_object_or_404(Section, id=id)
        issues = Issue.objects.filter(section__instructor=instructor, section=section)
        serializer = IssueSerializer(issues, many=True)
        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )
    # add a way for teacher to modify tiket


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
    taking attendance
    """
    queryset = Attendance.objects.none()
    serializer_class = AttendanceSerializer
    #permission_classes = [IsAuthenticatedOrReadOnly, InstructionPermission]

    def get_queryset(self):
        id = self.kwargs.get("section",1)
        print(id)
        section = get_object_or_404(Section, id=id)
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
        emotions = ["happy", "sad", "angry", "surprised","fear"]
        rand_emotions = emotions[random.randint(0, 3)]
        user = self.request.user
        student = get_object_or_404(Student, user=user)
        images_loaded = StudentImage.objects.filter(student=student).count()
        attendanceExist = Attendance.objects.filter(student=student, section=currentCourse(user)[1],
                                                    recordedDate=date.today()).exists()
        if images_loaded ==0:
            data["message"] = "Attendance already recorded"
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
            data["emotion"] = rand_emotions,
            return Response(
                data,
                status=status.HTTP_200_OK
            )

    def post(self, request):
        print(request.FILES)
        data = request.data
        verifyEmotion = detectUserEmotion(request.FILES["emotionImage"])
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



