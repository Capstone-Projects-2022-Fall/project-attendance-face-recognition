import logging
from datetime import datetime
import environ
import requests
from canvasapi import Canvas
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from account.models import CanvasToken
from account.models import Instructor, Student
from account.tasks import newCanvasToken
from attendance.services.attendanceScore import calculateAttendanceScore
from course.models import Course, Section, AttendanceSetting
import json

env = environ.Env(
    DEBUG=(bool, False)
)
environ.Env.read_env()
# obtain logger instance
logger = logging.getLogger(__name__)


class CanvasUtils:
    """
    Working with canvas api
    """

    def __init__(self):
        self.API_URL = env("CANVAS_URL")
        self.client_id = env("CANVAS_CLIENTID")
        self.client_secret = env("CANVAS_CLIENT_SECRET")
        self.grader_access_token = env("GRADER_ACCESS_TOKEN")

    def getUserAndCanvasToken(self, canvas_code):
        """
        get new canvas token to access token
        :param canvas_code:
        :return:
        """
        user = None
        data = {
            "grant_type": "authorization_code",
            "client_id": self.client_id,
            "client_secret": self.client_secret,
            "redirect_uri": env("AFR_URL"),
            "code": canvas_code,
            "replace_tokens": 1
        }
        logger.error("Requesting new access token")
        r = requests.post(url=self.API_URL + "/login/oauth2/token", data=data)
        data = r.json()

        # canvas API Key
        access_token = data["access_token"]
        # initialize a new canvas object
        canvas = Canvas(self.API_URL, access_token)
        # get current canvas user
        canvas_user = canvas.get_current_user().get_profile()

        if User.objects.filter(email=canvas_user["primary_email"]).exists():
            logger.info("Retrieving user")
            user = get_object_or_404(User, email=canvas_user["primary_email"], username=canvas_user["primary_email"])
        else:
            logger.info("Creating new user")
            name = str(canvas_user["sortable_name"]).split(",")
            user = User(username=canvas_user["primary_email"], email=canvas_user["primary_email"],
                        first_name=name[1].strip(),
                        last_name=name[0].strip())
            user.save()
            print("user detail", user)
        print("user detail", user)
        newCanvasToken.delay(data, user.id, self.API_URL, canvas_user["id"])
        return user

    def getCanvasToken(self, user):
        """
        get previous token or refresh token
        :return:
        """
        canvasToken = get_object_or_404(CanvasToken, user=user)
        if not canvasToken.is_valid():
            data_value = {
                "grant_type": "refresh_token",
                "client_id": self.client_id,
                "client_secret": self.client_secret,
                "refresh_token": canvasToken.refreshToken
            }
            try:
                r = requests.post(url=self.API_URL + "/login/oauth2/token", data=data_value)
                data = r.json()
                print(data_value)
                print(data)
                logger.info("Get a new Access token from a refresh token")
                canvasToken.accessToken = data["access_token"]
                canvasToken.expires = data["expires_in"]
                canvasToken.save()
            except:
                logger.error("Not able to get new access token")
                return None
        return canvasToken.accessToken

    def canvasActiveCourses(self, user):
        """
        return a list of active courses from canvas
        """
        access_token = self.getCanvasToken(user)
        # initialize a new canvas object
        canvas = Canvas(self.API_URL, access_token)
        logger.info("Retrieving list of active courses")
        prof = canvas.get_current_user()
        courses = prof.get_courses()
        return courses

    def getCourseInfo(self, canvas_course_id, user):
        """
        Get course info
        :return:
        """
        # canvas API Key
        access_token = self.getCanvasToken(user)
        # initialize a new canvas object
        canvas = Canvas(self.API_URL, access_token)
        course = canvas.get_course(canvas_course_id)
        logger.info("Get course info")
        return course

    def canvasActiveSection(self, user, id):
        """
        return a list of active section from a course
        """
        course = self.getCourseInfo(id, user)
        sections = course.get_sections()
        return sections, course

    def canvasSectionInfo(self, user, id):
        """
        return detail about a section
        """
        # canvas API Key
        access_token = self.getCanvasToken(user)
        # initialize a new canvas object
        canvas = Canvas(self.API_URL, access_token)
        section = canvas.get_section(id)
        logger.info("Get section info")
        return section

    def createAttendanceAssignment(self, user, section_id):
        """
        create an attendance assignment in a course the user is teaching
        """
        access_token = self.getCanvasToken(user)
        # initialize a new canvas object
        canvas = Canvas(self.API_URL, access_token)
        logger.info("retrieving course and section")
        instructor= get_object_or_404(Instructor, user=user)
        section = get_object_or_404(Section, id=section_id, instructor=instructor)
        course = section.course
        if not AttendanceSetting.objects.filter(section=section, assignment=True):
            logger.info("create attendance assignment")
            attendanceSetting = get_object_or_404(AttendanceSetting, section=section)
            canvas_course = canvas.get_course(int(course.canvasId))
            temp = canvas_course.create_assignment({
                "name": "Attendance",
                "description": "Student's Attendance during the semester",
                "submission_types": ["online_text_entry"],
                "points_possible": 100,
                "omit_from_final_grade": True,
                "notify_of_update": True,
                "published": True
            })
            logger.info("Record that assignment has been created")
            print(temp)
            attendanceSetting.assignment = True
            attendanceSetting.assignmentCanvasId = temp.id
            attendanceSetting.save()

    def registeringStudentToSection(self, user, section_canvas_id):
        """
        create an account for all students from this section
        """
        # canvas API Key
        access_token = self.getCanvasToken(user)
        # initialize a new canvas object
        canvas = Canvas(self.API_URL, access_token)
        # type to retrieve from enrollment
        type_list = ["StudentEnrollment", "StudentViewEnrollment"]
        section = canvas.get_section(int(section_canvas_id))
        afr_section = get_object_or_404(Section, canvasId=section_canvas_id)
        studentEnrollment = section.get_enrollments(type=type_list)
        logger.info("saving students to section")
        for enrollment in studentEnrollment:
            student_user = None
            student = None
            canvas_student = enrollment.user
            name = str(canvas_student["name"]).split(" ")
            if not User.objects.filter(username=canvas_student["login_id"]).exists():
                student_user = User(username=canvas_student["login_id"], email=canvas_student["login_id"],
                                    first_name=name[0].strip(), last_name=name[1].strip())
                student_user.save()
                student = Student(canvasId=canvas_student["id"], user=student_user)
                student.save()
            else:
                student_user = get_object_or_404(User, username=canvas_student["login_id"])
                student = get_object_or_404(Student, user=student_user)

            afr_section.students.add(student)

    def getUserCourses(self, user):
        """
        Get all courses the teacher is teaching
        """
        print("Getting the teacher's Canvas courses")
        # canvas API key
        access_token = self.getCanvasToken(user)
        print(access_token)
        # initialize a new canvas object
        canvas = Canvas(self.API_URL, access_token)
        # get current canvas user
        canvas_user = canvas.get_current_user()
        # get current courses the user is partaking in
        courses = canvas_user.get_courses(enrollment_state=["active"])
        return courses

    def updateStudentAssignmentScore(self, user, attendance):
        """
        Update student's assignement score
        """
        student = get_object_or_404(Student, user=user)
        section = attendance.section
        instructor = section.instructor
        # canvas API Key
        access_token = self.getCanvasToken(instructor.user)
        # initialize a new canvas object
        canvas = Canvas(self.API_URL, access_token)
        course = attendance.section.course

        attendanceSetting = get_object_or_404(AttendanceSetting, section=section)
        # get the assignment from canvas
        canvas_course = canvas.get_course(course.canvasId)
        attendance_assigment = canvas_course.get_assignment(int(attendanceSetting.assignmentCanvasId))
        submission = attendance_assigment.get_submission(student.canvasId)
        # get the student's current score
        score = calculateAttendanceScore(attendance.section, student)
        # update the student's score
        submission.edit(submission={'posted_grade':score})

