from datetime import date
import logging

from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status, parsers
from rest_framework.authtoken.models import Token

from attendance.services.canvasUtils import CanvasUtils
from course.services.schedule import currentCourse
from account.services import account_registration_verification, retrieve_students_from_sections, \
    retrieve_issues_admin, retrieve_section_schedule

from account.serializers import UserSerializer, StudentSerializer
from course.serializers import CourseSerializer, SectionSerializer
from attendance.serializers import IssueSerializer, AttendanceSerializer

from account.models import Instructor, Student
from attendance.models import Issue, Attendance

from account.tasks import testPrint

# obtain logger instance
logger = logging.getLogger(__name__)

class GenerateTokenAPIView(APIView):
    """
    Generate user token
    """
    # permission_classes = [IsAuthenticated]
    parser_classes = [parsers.FormParser, parsers.JSONParser, parsers.MultiPartParser]

    def post(self, request):
        data = request.data
        canvas = CanvasUtils()
        if "canvas_code" in data:
            user = canvas.getUserAndCanvasToken(data["canvas_code"])
            print(user)
            token = Token.objects.get_or_create(user=user)
            print(token)
        elif self.request.user:
            token = Token.objects.get_or_create(user=self.request.user)
        else:
            return Response(
                {
                    "access_token": "",
                    "message": "Cound not identify user"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        return Response(
            {
                "access_token": token[0].key,
            },
            status=status.HTTP_200_OK
        )


class GenerateAssignmentAPIView(APIView):
    """
    Generate assignments for automatic attendance
    """
    parser_classes = [parsers.FormParser, parsers.JSONParser, parsers.MultiPartParser]

    def post(self, request):
        data = request.data
        canvas = CanvasUtils()
        # If the canvas code is in the data passed in through the request...
        if "canvas_code" in data:
            # Call the canvas util that will create assignments for attendance
            # canvas.createAttendanceAssignments(data["canvas_code"])
            return Response(
                {
                    "message": "Assignments created!"
                },
                status=status.HTTP_200_OK
            )
        # This request will not work without the canvas code. Signify as much.
        else:
            return Response(
                {
                    "message": "Could not create assignments!"
                },
                status=status.HTTP_400_BAD_REQUEST
            )


class InitialInfoAPIView(APIView):
    """
    Return general info about the user and courses
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        logger.info("Testing logger")
        logger.warning("Testing logger")
        data = {}
        user = self.request.user
        canvas = CanvasUtils()
        isInstructor = Instructor.objects.filter(user=user).exists()
        data["user"] = UserSerializer(user).data
        data["current_course"] = CourseSerializer(currentCourse(user)[0]).data
        data["current_section"] = SectionSerializer(currentCourse(user)[1]).data
        data["registration_completed"] = {"completed": account_registration_verification(user)}
        data["role_teacher"] = isInstructor
        if isInstructor:
            instructor = get_object_or_404(Instructor, user=user)
            issues = Issue.objects.filter(section__instructor=instructor)
            data["issues"] = retrieve_issues_admin(instructor)
            data["students"] = retrieve_students_from_sections(instructor)
            data["schedule"] = retrieve_section_schedule(instructor)
            data["report"] = AttendanceSerializer(Attendance.objects.filter(section__instructor=instructor,
                                                                            section__course__end_date__gte=date.today()),
                                                  many=True).data
        else:
            student = get_object_or_404(Student, user=user)
            issues = Issue.objects.filter(section__students=student)
            data["issues"] = IssueSerializer(issues, many=True).data
            data["report"] = AttendanceSerializer(Attendance.objects.filter(section__students=student,
                                                                            section__course__end_date__gte=date.today()),
                                                  many=True).data

        return Response(
            data,
            status=status.HTTP_200_OK
        )
