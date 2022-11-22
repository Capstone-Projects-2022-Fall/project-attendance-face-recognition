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
from datetime import datetime

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


class SyncWithCanvasAPIView(APIView):
    """
    Sync with Canvas. Add courses, sections, and students.
    """
    def post(self, request):
        # Log in to canvas and get the instructor's courses
        canvas = CanvasUtils()
        instructor_courses = canvas.getUserCourses(self.request.user)
        # Get the instructor object for the user
        instructor = get_object_or_404(Instructor, user=self.request.user)
        print("SyncWithCanvasAPIView: Found courses for the instructor! They are:")
        print(instructor_courses)
        # For each course...
        for instructor_course in instructor_courses:
            # Save the course in the backend
            # First, make sure that the course does not already exist as we do not want to duplicate courses
            if not (Course.objects.filter(canvasId=instructor_course.id)).exists():
                print("SyncWithCanvasAPIView: Need to add this course to the backend!")
                # Fill out the course fields
                course = Course(canvasId=instructor_course.id, name=instructor_course.name, course_number=instructor_course.course_code, 
                                start_date=datetime.strptime(instructor_course.start_at, "%Y-%m-%dT%H:%M:%SZ").date(),
                                end_date=datetime.strptime(instructor_course.end_at, "%Y-%m-%dT%H:%M:%SZ").date())
                # Save the course to the backend
                course.save()
            else:
                # The course already exists - grab it here.
                course = Course.objects.get(canvasId=instructor_course.id)

            # Even if the course already exists, the section will constantly need to be updated with new students as they log onto AFR
            # for the first time. We also want to create a Section object if one did not exist before.
            sections = instructor_course.get_sections()
            try:
                # The section exists on the backend, so we only want to update the students
                backend_section = Section.objects.get(course=course, instructor=instructor)
                print("SyncWithCanvasAPIView: The section already exists!")
                # Get the corresponding section on Canvas
                for canvas_section in sections:
                    if (canvas_section.name == backend_section.name):
                        section = canvas_section
                # Get the Canvas IDs of the students enrolled in the section
                student_IDs = []
                for enrollment in section.get_enrollments():
                    # Enrollee is a student
                    if (enrollment.role == "StudentEnrollment"):
                        student_IDs.append(int(enrollment.user_id))
                # Get the students in the section
                curr_section_students = backend_section.students
                # Iterate over all students on AFR
                for student in Student.objects.all():
                    # If the student is enrolled in the section but was not previously in it on AFR, add them here.
                    if (int(student.canvasId) in student_IDs):
                        # Set a flag that indicates whether or not to add the student
                        should_add_student = 1
                        # Iterate through all current students
                        for curr_student in backend_section.students.all():
                            if (student.canvasId == curr_student.canvasId):
                                should_add_student = 0
                        if (should_add_student == 1):
                            print("SyncWithCanvasAPIView: Should add the student!")
                            section.students.add(student)
                        else:
                            print("SyncWithCanvasAPIView: The student already exists!")

            except:
                # The section does not exist - this would raise a NotFound error that we catch here.
                print("SyncWithCanvasAPIView: The section does not exist yet!")
                for section in sections:
                    # Get the Canvas IDs of the instructors and students enrolled in the section
                    instructor_IDs = []
                    student_IDs = []
                    for enrollment in section.get_enrollments():
                        # Enrollee is a teacher
                        if (enrollment.role == "TeacherEnrollment"):
                            instructor_IDs.append(int(enrollment.user_id))
                        # Enrollee is a student
                        if (enrollment.role == "StudentEnrollment"):
                            student_IDs.append(int(enrollment.user_id))
                    # This is the instructor's section if their ID matches that of an instructor in the section
                    if (int(instructor.canvasId) in instructor_IDs):
                        print("SyncWithCanvasAPIView: Found the section for the instructor!")
                        # Form an object to store the students in that section
                        students_in_section = []
                        # Iterate over all students on AFR
                        for student in Student.objects.all():
                            if (int(student.canvasId) in student_IDs):
                                print("SyncWithCanvasAPIView: Found a student for that section!")
                                students_in_section.append(student)
                                print("Added the student, does this work?")
                        # Now that we have all the students we can create the section
                        # The students have to be added later as they may be an array of objects, but we can initialize everything else here
                        new_section = Section.objects.get_or_create(name=section.name, canvasId=section.id, course=course, instructor=instructor)[0]
                        print("created the section")
                        # Add the students to the section
                        new_section.students.add(*students_in_section)
                        print("added the students")
                        # Save the section
                        new_section.save()
                        print("SyncWithCanvasAPIView: Added a section!")

        return Response({
            "message": "Course has been imported!",
            "completed": True 
        },
            status=status.HTTP_200_OK
        )


class SubmitScheduleAPIView(APIView):
    """
    Set up the schedule for the section
    """
    def post(self, request):
        print("SubmitScheduleAPIView: Submitting a schedule!")
        data = request.data
        # Get the request fields
        section_name = data["section"]
        weekday = data["weekday"]
        start_time = data["start_time"]
        end_time = data["end_time"]
        # Get the user and verify that they are an instructor
        user = self.request.user
        instructor = get_object_or_404(Instructor, user=user)
        # Get the sections associated with the instructor
        sections = Section.objects.filter(instructor=instructor)
        # Determine which section the schedule is for
        for section in sections:
            if (section.name==section_name):
                # Create a Schedule object for the section and save it
                # Classes can only have one schedule for now, so don't save it if one
                # already exists
                if not (Schedule.objects.filter(section=section).exists()):
                    schedule = Schedule(weekday=weekday, start_time=start_time, end_time=end_time, section=section)
                    schedule.save()

        return Response({
            "message": "Schedule has been created!",
            "completed": True
        },
            status=status.HTTP_200_OK
        )
