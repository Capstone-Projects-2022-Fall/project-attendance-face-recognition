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
        self.grader_access_token = env("GRADER_ACCESS_TOKEN")

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
        print("getUserAndCanvasToken: client id is:")
        print(self.client_id)
        print("getUserAndCanvasToken: client secret is:")
        print(self.client_secret)
        print("getUserAndCanvasToken: redirect uri is:")
        print(env("AFR_URL"))
        print("getUserAndCanvasToken: canvas code is:")
        print(canvas_code)
        print(self.API_URL)
        r = requests.post(url=self.API_URL + "/login/oauth2/token", data=data)
        data = r.json()
        print("getUserAndCanvasToken: got a response!")
        print("the response is:")
        print(data)

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

    def createAttendanceAssignments(self, canvas_code):
        """
        create an attendance assignment in each class the instructor is teaching
        """
        # First submit a request to Canvas to get the instructor's access token
        data = {
            "grant_type": "authorization_code",
            "client_id": self.client_id,
            "client_secret": self.client_secret,
            "redirect_uri": env("AFR_URL"),
            "code": canvas_code
        }
        print("createAttendanceAssignments: Submitting a request!")
        print("client_id is:")
        print(self.client_id)
        print("canvas code is:")
        print(canvas_code)
        r = requests.post(url=self.API_URL + "/login/oauth2/token", data=data)
        print("createAttendanceAssignments: Got a response!")
        print(r)
        # See if there's anything in the response
        try:
            # The request should be in JSON format
            data = r.json()
        # Otherwise throw an error
        except json.decoder.JSONDecodeError:
            print("createAttendanceAssignments: Caught a JSON decode error, didn't get data!")
            return

        # Otherwise we have the response, so get the access token
        access_token = data["access_token"]
        # initialize a new canvas object
        canvas = Canvas(self.API_URL, access_token)
        # get the current canvas user
        user = canvas.get_current_user()
        # get all of the courses the user is assigned to
        courses = user.get_courses()
        # The user is a teacher if their type is teacher or TA
        type_list = ['teacher', 'ta']
        # For each course the user is assigned to...
        for course in courses:
            # Get the instructors for the course
            usersInCourse = course.get_users(enrollment_type=type_list)
            # Go through the users in the course and determine if the current user is an instructor there
            for enrollee in usersInCourse:
                # If the user is an instructor for this course...
                if enrollee.id == user.id:
                     # Create an attendance assignment for that course
                     # First, check to make sure an assignment matching the attendance assignment's name does not already exist.
                     # If it does, then there is no need to make any additional assignments.
                     assignments = course.get_assignments()
                     # Initialize the "found assignment" flag to 0
                     found_attendance_assignment = 0
                     for assignment in assignments:
                         # Set the flag to 1 if an assignment is found so we know not to make it again
                         if (assignment.name == "Attendance (attended out of total)"):
                             found_attendance_assignment = 1
                     # No attendance assignment was found, so one must be made.
                     if (found_attendance_assignment == 0):
                         # Create the assignment
                         # The assignment is scored out of the number of classes held
                         # every semester. It is NOT included in the final grade, as
                         # the scores would start out quite low at the beginning and
                         # all teachers use attendance scores differently.
                         course.create_assignment({
                             'name': 'Attendance (attended out of total)',
                             'description': 'Number of classes attended this semester.',
                             'submission_types': 'online_text_entry',
                             'points_possible': 42,
                             'omit_from_final_grade': True,
                             'published': True
                         })

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

    def currentCanvasCourse(self, user):
        """
        View list of current canvas courses not saved on AFr
        :param user:
        :return: list of courses
        """
        # canvas API Key
        access_token = self.getCanvasToken(user)
        print(access_token)
        # initialize a new canvas object
        canvas = Canvas(self.API_URL, access_token)
        # get student
        # teacher = get_object_or_404(Instructor, user=user)
        canvas_user = canvas.get_current_user()
        courses = canvas_user.get_courses(enrollment_state=["active"])
        courseToBeAdded = []
        for course in courses:
            print(course)
            today = datetime.today()
            if datetime.strptime(course.start_at, "%Y-%m-%dT%H:%M:%SZ") <= today <= datetime.strptime(course.end_at, "%Y-%m-%dT%H:%M:%SZ"):
                if not Course.objects.filter(canvasId=course.id).exists():
                    courseObject = {}
                    courseObject["id"] = course.id
                    courseObject["name"] = course.name
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
                    courseObject["id"] = course.id
                    courseObject["name"] = course.name
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

    def updateAttendanceScore(self, submittedCourse, submittedStudent):
        """
        Auto-grade the attendance assignment when the student is marked present
        """
        # First, get the student's Canvas ID. We will need this to update their assignment
        student_canvas_ID = submittedStudent.canvasId
        print("updateAttendanceScore: The student's Canvas ID is:")
        print(student_canvas_ID)
        print("updateAttendanceScore: The submitted course's ID is:")
        print(submittedCourse.canvasId)

        # Log in to Canvas as the grader.
        # The access token is created by the teacher when they set up the course. This allows
        # AFR to automatically update attendance grades when the student is marked present.
        canvas = Canvas(self.API_URL, self.grader_access_token)
        # Get the user associated with the grader's token (i.e., the teacher)
        user = canvas.get_current_user()
        print("updateAttendanceScore: The user corresponding to the hidden access token is:")
        print(user)
        # Get the courses that the teacher is teaching
        courses = user.get_courses()
        print("updateAttendanceScore: Found courses for the user! They are:")
        print(courses)
        # For each course...
        for course in courses:
            print("updateAttendanceScore: The current course ID is:")
            print(course.id)
            print("updateAttendanceScore: and the course ID we're comparing against is:")
            print(int(submittedCourse.canvasId))
            # If the course's canvas ID matches the canvas ID of the course the user submitted attendance for...
            # Note that the course's canvasId comes back as a string, so we need to convert to int before using it
            if (course.id == int(submittedCourse.canvasId)):
                 print("updateAttendanceScore: Found a matching course! Its ID is:")
                 print(course.id)
                 # Get the assignment for the course
                 assignments = course.get_assignments()
                 # Find the attendance assignment
                 for assignment in assignments:
                     if (assignment.name == "Attendance (attended out of total)"):
                         # Pull the student's submission
                         submission = assignment.get_submission(student_canvas_ID)
                         print("updateAttendanceScore: The current submission is:")
                         print(submission)
                         # Get the current submission's grade
                         submission_grade = submission.score
                         print("updateattendanceScore: The submission's score is:")
                         print(submission_grade)
                         # Update the submission's grade. If attendance was never taken, the score will be None; update
                         # to 1 to reflect that this is the first time attendance has been taken.
                         # Otherwise, increment the number of attendances.
                         if (submission.grade == None):
                              submission_grade = 1
                         else:
                              submission_grade = submission_grade + 1
                         # Update the submission's grade
                         submission.edit(submission={'posted_grade':submission_grade})
                         print("updateAttendanceScore: updated the grade!")
