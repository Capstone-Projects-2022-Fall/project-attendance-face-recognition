from datetime import datetime
import environ
import requests
from canvasapi import Canvas
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from account.models import CanvasToken
from account.models import Instructor, Student
from course.models import Course, Section


env = environ.Env(
    DEBUG=(bool, False)
)
environ.Env.read_env()


class CanvasUtils:
    """
    Working with canvas api
    """

    def __init__(self):
        self.API_URL = env("CANVAS_URL")
        self.client_id = env("CANVAS_CLIENTID")
        self.client_secret = env("CANVAS_CLIENT_SECRET")

    def getUserAndCanvasToken(self, canvas_code):
        """
        get new canvas token to access token
        :param canvas_code:
        :return:
        """
        data = {
            "grant_type": "authorization_code",
            "client_id": self.client_id,
            "client_secret": self.client_secret,
            "redirect_uri": env("AFR_URL"),
            "code": canvas_code
        }
        r = requests.post(url=self.API_URL + "/login/oauth2/token", data=data)
        data = r.json()

        # canvas API Key
        access_token = data["access_token"]
        # initialize a new canvas object
        canvas = Canvas(self.API_URL, access_token)
        # get current canvas user
        canvas_user = canvas.get_current_user().get_profile()

        if User.objects.filter(email=canvas_user["primary_email"]).exists():
            user = get_object_or_404(User, email=canvas_user["primary_email"], username=canvas_user["primary_email"])
        else:
            name = str(canvas_user["sortable_name"]).split(",")
            user = User(username=canvas_user["primary_email"], email=canvas_user["primary_email"],
                        first_name=name[1].strip(),
                        last_name=name[0].strip())
            user.save()

        if not CanvasToken.objects.filter(user=user).exists():
            canvas_token = CanvasToken(
                accessToken=data["access_token"],
                refreshToken=data["refresh_token"],
                expires=data["expires_in"],
                user=user
            )
            canvas_token.save()
            # verify if student or teacher
            if self.isTeacher(user):
                instructor = Instructor(canvasId=canvas_user["id"], user=user)
                instructor.save()
            else:
                student = Student(canvasId=canvas_user["id"], user=user)
                student.save()
                self.addingStudentToCourse(user)
        else:
            self.getCanvasToken(user)
        print(user)
        return user

    def getCanvasToken(self, user):
        """
        get previous token or refresh token
        :return:
        """
        canvasToken = get_object_or_404(CanvasToken, user=user)
        if not canvasToken.is_valid():
            data = {
                "grant_type": "refresh_token",
                "client_id": self.client_id,
                "client_secret": self.client_secret,
                "redirect_token": canvasToken.refreshToken
            }
            try:
                r = requests.post(url=self.API_URL + "/login/oauth2/token", data=data)
                data = r.json()
                canvasToken.accessToken = data["access_token"]
                canvasToken.refreshToken = data["refresh_token"]
                canvasToken.expires = data["expires_in"]
                canvasToken.save()
            except:
                print("error getting token")
                return None
        return canvasToken.accessToken

    def deleteCanvasToken(self):
        """
        delete canvas token
        :return:
        """
        pass

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
        print(course)
        return course
        # if Course.objects.filter(canvasId=canvas_course_id):

    def isTeacher(self, user):
        """
        Verify is user is instructor or student
        :return:True or False
        """
        # canvas API Key
        access_token = self.getCanvasToken(user)
        # initialize a new canvas object
        canvas = Canvas(self.API_URL, access_token)

        type_list = ['teacher','ta']
        user = canvas.get_current_user()
        courses = user.get_courses()
        for course in courses:
            usersInCourse = course.get_users(enrollment_type=type_list)
            for u in usersInCourse:
                if u.id == user.id:
                    return True
        return False

    def addingStudentToCourse(self, user):
        """
        Adding user to course
        :return:
        """
        # canvas API Key
        access_token = self.getCanvasToken(user)
        # initialize a new canvas object
        canvas = Canvas(self.API_URL, access_token)
        # get student
        student = get_object_or_404(Student, user=user)
        canvas_user = canvas.get_current_user()
        # get user's course that match the list of course
        courses_taken = canvas_user.get_courses()
        for course in courses_taken:
            today = datetime.today()
            if datetime.strptime(course.start_at, "%Y-%m-%dT%H:%M:%SZ") <= today <= datetime.strptime(course.end_at, "%Y-%m-%dT%H:%M:%SZ"):
                '''go through all sections'''
                for section in course.get_sections():
                    for enrollment in section.get_enrollments():
                        if enrollment.user["id"] == canvas_user.id:
                            if not Section.objects.filter(name=section.name, students=student).exists():
                                s = get_object_or_404(Section, name=section.name)
                                s.students.add(student)
                                print("adding to course")

    def CurrentCanvasCourse(self, user):
        """
        View list of current canvas courses not saved on AFr
        :param user:
        :return: list of courses
        """
        # canvas API Key
        access_token = self.getCanvasToken(user)
        # initialize a new canvas object
        canvas = Canvas(self.API_URL, access_token)
        # get student
        # teacher = get_object_or_404(Instructor, user=user)
        canvas_user = canvas.get_current_user()
        courses = canvas_user.get_courses(enrollment_state=["active"])
        courseToBeAdded = []
        for course in courses:
            today = datetime.today()
            if datetime.strptime(course.start_at, "%Y-%m-%dT%H:%M:%SZ") <= today <= datetime.strptime(course.end_at, "%Y-%m-%dT%H:%M:%SZ"):
                if not Course.objects.filter(canvasId=course["id"]).exists():
                    courseObject = {}
                    courseObject["id"] = course["id"]
                    courseObject["name"] = course["name"]
                    courseObject["course_number"] = course.course_code
                    courseObject["start_date"] = datetime.strptime(course.start_at, "%Y-%m-%dT%H:%M:%SZ").date()
                    courseObject["end_date"] = datetime.strptime(course.end_at, "%Y-%m-%dT%H:%M:%SZ").date()
                    courseObject["section"] = []
                    for section in course.get_sections():
                        courseObject["section"].append({
                            "name": section.name,
                            "canvasId": section.id,
                        })
                else:
                    courseObject = {}
                    courseObject["id"] = course["id"]
                    courseObject["name"] = course["name"]
                    courseObject["course_number"] = course.course_code
                    courseObject["start_date"] = datetime.strptime(course.start_at, "%Y-%m-%dT%H:%M:%SZ").date()
                    courseObject["end_date"] = datetime.strptime(course.end_at, "%Y-%m-%dT%H:%M:%SZ").date()
                    courseObject["section"] = []
                    for section in course.get_sections():
                        if not Section.objects.filter(canvasId=section.id):
                            courseObject["section"].append({
                                "name": section.name,
                                "canvasId": section.id,
                            })
                courseToBeAdded.append(courseObject)
        return courseToBeAdded




