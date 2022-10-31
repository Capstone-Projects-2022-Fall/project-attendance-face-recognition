from django.http import QueryDict
from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status, parsers
from django.shortcuts import get_object_or_404
from attendance.services.canvasUtils import CanvasUtils
from rest_framework.views import APIView
from course.permissions import InstructionPermission
from account.models import Instructor

from course.models import Course, Section, Schedule

from course.serializers import CourseSerializer, SectionSerializer


class TeacherCanvasCoursesAPIView(APIView):
    """
    List of teacher's current courses
    """
    permission_classes = [IsAuthenticated, InstructionPermission]

    def get(self, request):
        canvas = CanvasUtils()
        courses = canvas.CurrentCanvasCourse(self.request.user)
        return Response(
            courses,
            status=status.HTTP_200_OK
        )


class SetupCourseAPIView(APIView):
    """
    Teacher course attendance configuration
    """
    permission_classes = [IsAuthenticated, InstructionPermission]

    def get(self, request):
        instructor = get_object_or_404(Instructor, user=self.request.user)
        courses = []
        for section in Section.objects.filter(instructor=instructor):
            # verify date to be added
            courses.append(section.course)
        serializer = CourseSerializer(courses, many=True)
        return Response(
            serializer.data
        )

    def post(self, request):
        data = request.data
        if not Course.objects.filter(canvasId=data["canvasId"]).exists():
            serializer = CourseSerializer(context={'request': request}, data=data)
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
        else:
            return Response(
                CourseSerializer(get_object_or_404(Course, canvasId=data["canvasId"])).data
            )


class SetupCourseDetailAPIView(APIView):
    """
    Teacher course attendance modification
    """
    permission_classes = [IsAuthenticated, InstructionPermission]

    def get(self, request, pk):
        course = get_object_or_404(Course, pk=pk)
        return Response(
            CourseSerializer(course).data,
        )

    def patch(self, request, pk):
        data = request.data
        course = get_object_or_404(Course, pk=pk)
        serializer = CourseSerializer(course, data=data, partial=True)
        return Response(
            serializer.data,
        )

    def delete(self, request, pk):
        course = get_object_or_404(Course, pk=pk)
        course.delete()
        return Response(
            status=status.HTTP_204_NO_CONTENT
        )


class SetupSectionAPIView(APIView):
    """
    Teacher section attendance configuration
    """
    def get(self, request, course):
        sections = Section.objects.filter(course=course)
        return Response(
            SectionSerializer(sections, many=True).data
        )

    def post(self, request, course):
        data = request.data
        if isinstance(data, QueryDict):
            data._mutable = True
        data["instructor"] = get_object_or_404(Instructor, user=self.request.user).id
        data["course"] = course
        if not Section.objects.filter(canvasId=data["canvasId"]).exists():
            serializer = SectionSerializer(context={'request': request}, data=data)
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
        else:
            return Response(
                SectionSerializer(get_object_or_404(Course, canvasId=data["canvasId"])).data
            )


class SetupSectionDetailAPIView(APIView):
    """
    Teacher section attendance configuration
    """
    def get(self, request, pk):
        sections = get_object_or_404(Section, pk=pk)
        return Response(
            SectionSerializer(sections).data
        )

    def patch(self, request, pk):
        data = request.data
        section = get_object_or_404(Section, pk=pk)
        serializer = CourseSerializer(section, data=data, partial=True)
        return Response(
            serializer.data,
        )

    def delete(self, request, pk):
        section = get_object_or_404(Section, pk=pk)
        section.delete()
        return Response(
            status=status.HTTP_204_NO_CONTENT
        )