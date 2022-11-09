from datetime import date

from django.http import QueryDict
from django.shortcuts import render
from django_eventstream import send_event
from rest_framework import status, parsers
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404

from attendance.services.statistics import attendanceSummary, studentPerSection
from course.permissions import InstructionPermission

from attendance.services.canvasUtils import CanvasUtils

from account.models import Student, Instructor
from attendance.models import Issue, Attendance
from course.models import Section
from attendance.serializers import IssueSerializer, AttendanceSerializer


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


class SectionAttendanceAPIView(APIView):
    """
    taking attendance
    """
    permission_classes = [IsAuthenticatedOrReadOnly, InstructionPermission]

    def get(self, request):
        send_event('test', 'message', {'text': 'hello world'})



