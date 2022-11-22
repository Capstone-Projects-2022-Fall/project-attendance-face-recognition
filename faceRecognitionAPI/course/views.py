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
from account.models import Student

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


class ImportCourseAPIView(APIView):
    """
    Auto-import the course the instructor is teaching
    """
    def post(self, request):
        print("ImportCourseAPIView: Ready to import courses on the backend!")
        # Get the user that made the request
        user = self.request.user
        # Verify that the user is an instructor
        instructor = get_object_or_404(Instructor, user=user)
        print("ImportCourseAPIView: Found an instructor! They are:")
        print(instructor)
        # Get the course the instructor is currently teaching on Canvas
        canvas = CanvasUtils()
        current_course = canvas.currentCanvasCourse(user)
        print("ImportCourseAPIView: Found the course for the instructor! It is:")
        print(current_course)
        # Save the course in the backend if it does not exist already
        if not (Course.objects.filter(canvasId=current_course[0]["canvasId"])).exists():
            print("ImportCourseAPIView: The course has not been added to the backend yet!")
            course = Course(canvasId=current_course[0]["canvasId"], name=current_course[0]["name"], course_number=current_course[0]["course_number"],
                            start_date=current_course[0]["start_date"], end_date=current_course[0]["end_date"])
            course.save()
            # Save the sections in the backend
            for course_section in current_course[0]["section"]:
                print("ImportCourseAPIView: Creating a section!")
                # Create the corresponding object
                # We have already determined the instructor and the course, so we can bring those in.
                # Unfortunately, I don't see a way to pull the student's section from Canvas. Until I can figure that
                # out, just assume that all students are in all sections. This will work for the demo
                section = Section.objects.get_or_create(name=course_section["name"], canvasId=course_section["canvasId"], course=course, instructor=instructor)[0]
                students = Student.objects.all()
                section.students.add(*students)
                # Save the section
                # We don't need to see if it exists, beacuse the sections can't exist if the course doesn't exist.
                section.save()
                print("ImportCourseAPIView: Added a section!")
        return Response({
            "message": "Course has been imported!",
            "completed": True
        },
            status=status.HTTP_200_OK
        )
