from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIRequestFactory
from rest_framework.test import force_authenticate
from account.models import Student, Instructor
from attendance.models import Issue, Attendance
from course.models import Course, Section, Schedule, AttendanceSetting
from recognition.models import StudentImage
from datetime import date, timedelta, time, datetime
from account import views
import json

class AccountViewAPITest(TestCase):
	@classmethod
	def setUpTestData(cls):
		# Set up a student user
		User.objects.create(username="TestStudent", first_name="Shivani", last_name="Patel",
			                password="TestPassword1", email="TestStudent@gmail.com")

		# Set up another student user
		User.objects.create(username="TestStudent2", first_name="Jerry", last_name="Maurice",
			                password="TestPassword2", email="TestStudent2@gmail.com")

		# Set up a third student user
		User.objects.create(username="TestStudent3", first_name="Anjeza", last_name="Beca",
			               password="TestPassword3", email="TestStudent3@gmail.com")

		# Set up a fourth student user
		User.objects.create(username="TestStudent4", first_name="Hamsa", last_name="Shaik",
			               password="TestPassword4", email="TestStudent4@gmail.com")

		# Set up an instructor user
		User.objects.create(username="TestTeacher", first_name="Ian", last_name="Applebaum",
			                password="TestPassword5", email="TestInstructor@gmail.com")

		# Set up the students and instructor
		Student.objects.create(canvasId=1, user=User.objects.get(id=1))
		Student.objects.create(canvasId=2, user=User.objects.get(id=2))
		Student.objects.create(canvasId=3, user=User.objects.get(id=3))
		Student.objects.create(canvasId=4, user=User.objects.get(id=4))
		Instructor.objects.create(canvasId=5, user=User.objects.get(id=5))

		# Set up a course - this is needed for recognize_image
		# Set the start date to today and the end date to tomorrow - this guarantees
		# that the course is always active when the test is run
		Course.objects.create(canvasId=1, name="Test Course", course_number=4398,
			                  start_date=date.today(), end_date=date.today()+timedelta(days=1))

		# Set up the students in the course
		students = []
		students.append(Student.objects.get(id=1))
		students.append(Student.objects.get(id=2))
		students.append(Student.objects.get(id=3))
		students.append(Student.objects.get(id=4))

		# Set up a section for the course - this is needed for recognize_image
		new_section = Section.objects.get_or_create(name="001", canvasId=1, course=Course.objects.get(id=1),
			                                        instructor=Instructor.objects.get(id=1))[0]
		new_section.students.add(*students)

		# Set up a schedule - this is needed for recognize_image
		# Set the weekday to the day the test is ran, the start time to 00:00:00, and
		# the end time to 23:59:59 - this guarantees that the course will be found.
		curr_time = datetime.now()
		Schedule.objects.create(weekday=date.today().weekday(), start_time=time(curr_time.hour,curr_time.minute,curr_time.second), 
			                    end_time=time(curr_time.hour+1,curr_time.minute,curr_time.second), section=Section.objects.get(id=1))

		# Set up an attendance setting - this is needed to verify that attendance can be taken properly
		AttendanceSetting.objects.create(duration=5, section=Section.objects.get(id=1))

		# Set up attendances for each student for the class that was held today
		Attendance.objects.create(status="Present", section=new_section, student=Student.objects.get(id=1))
		Attendance.objects.create(status="Present", section=new_section, student=Student.objects.get(id=2))
		Attendance.objects.create(status="Late", section=new_section, student=Student.objects.get(id=3))
		Attendance.objects.create(status="Absent", section=new_section, student=Student.objects.get(id=4))

		# Set up some dummy issues 
		for issue_idx in range(10):
			Issue.objects.create(student=Student.objects.get(id=1),section=new_section,subject="dummy",message="dummy")


	# Verify that the correct initial view is returned for a student
	def test_initial_student_view(self):

		# Grab a student user
		currUser = User.objects.get(id=1)

		# Instantiate the view that we want to test
		view = views.InitialInfoAPIView.as_view()

		# Set up the API request factory
		factory = APIRequestFactory()

		# Get the student's initial view
		request = factory.get('', {'user':currUser})
		force_authenticate(request, user=currUser)
		response = view(request)

		# This will always return a 200
		self.assertEqual(response.status_code, 200)

		# Get the data from the response
		response_json = json.loads(response.render().content.decode("utf-8"))

		# Verify that it matches the test classroom setup
		# The user should match the user that made the request
		self.assertEqual(response_json["user"]['id'], currUser.id)
		self.assertEqual(response_json["user"]['first_name'], currUser.first_name)
		self.assertEqual(response_json["user"]['last_name'], currUser.last_name)
		self.assertEqual(response_json["user"]['email'], currUser.email)

		# The user's course should match the course we set up
		expected_course = Course.objects.get(id=1)
		self.assertEqual(response_json["current_course"]['canvasId'], expected_course.canvasId)
		self.assertEqual(response_json["current_course"]['name'], expected_course.name)
		self.assertEqual(response_json["current_course"]['course_number'], expected_course.course_number)
		self.assertEqual(response_json["current_course"]['start_date'], str(expected_course.start_date))
		self.assertEqual(response_json["current_course"]['end_date'], str(expected_course.end_date))

		# The user's section should match the section we set up
		expected_section = Section.objects.get(id=1)
		self.assertEqual(response_json["current_section"]['name'], expected_section.name)
		self.assertEqual(response_json["current_section"]['canvasId'], expected_section.canvasId)

		# The user should not be registered as they have not uploaded pictures
		self.assertEqual(response_json["registration_completed"]['completed'], False)

		# The user is not an instructor
		self.assertEqual(response_json["role_teacher"], False)

		# 10 issues should have been returned (all the issues for the section)
		self.assertEqual(len(response_json["issues"]), 10)

		# 4 attendances should have been returned (all the attendances for the section)
		self.assertEqual(len(response_json["report"]), 4)


	# Verify that the correct initial view is returned for the instructor
	def test_initial_instructor_view(self):

		# Grab an instructor user
		currUser = User.objects.get(id=5)

		# Instantiate the view that we want to test
		view = views.InitialInfoAPIView.as_view()

		# Set up the API request factory
		factory = APIRequestFactory()

		# Get the instructor's initial view
		request = factory.get('', {'user':currUser})
		force_authenticate(request, user=currUser)
		response = view(request)

		# This will always return a 200
		self.assertEqual(response.status_code, 200)

		# Get the data from the response
		response_json = json.loads(response.render().content.decode("utf-8"))

		# Verify that it matches the test classroom setup
		# The user should match the user that made the request
		self.assertEqual(response_json["user"]['id'], currUser.id)
		self.assertEqual(response_json["user"]['first_name'], currUser.first_name)
		self.assertEqual(response_json["user"]['last_name'], currUser.last_name)
		self.assertEqual(response_json["user"]['email'], currUser.email)

		# The user's course should match the course we set up
		expected_course = Course.objects.get(id=1)
		self.assertEqual(response_json["current_course"]['canvasId'], expected_course.canvasId)
		self.assertEqual(response_json["current_course"]['name'], expected_course.name)
		self.assertEqual(response_json["current_course"]['course_number'], expected_course.course_number)
		self.assertEqual(response_json["current_course"]['start_date'], str(expected_course.start_date))
		self.assertEqual(response_json["current_course"]['end_date'], str(expected_course.end_date))

		# The user's section should match the section we set up
		expected_section = Section.objects.get(id=1)
		self.assertEqual(response_json["current_section"]['name'], expected_section.name)
		self.assertEqual(response_json["current_section"]['canvasId'], expected_section.canvasId)

		# The user should be registered as they are an instructor
		self.assertEqual(response_json["registration_completed"]['completed'], True)

		# The user is an instructor
		self.assertEqual(response_json["role_teacher"], True)

		# 10 issues should have been returned (all the issues for the section)
		self.assertEqual(len(response_json["issues"]), 10)
		# Verify that the issues match the ones that we set up
		num_issues_checked = 0
		for num_issues_checked in range(len(response_json["issues"])):
			curr_returned_issue = response_json["issues"][num_issues_checked]
			self.assertEqual(curr_returned_issue["name"], "Shivani Patel")
			self.assertEqual(curr_returned_issue["status"], "Unresolved")
			self.assertEqual(curr_returned_issue["subject"], "dummy")
			self.assertEqual(curr_returned_issue["message"], "dummy")

		# 4 students should have been returned (all the students for the section)
		self.assertEqual(len(response_json["students"]), 4)
		# Verify that the names match those of the students in the class
		expected_names = ["Shivani Patel", "Jerry Maurice", "Anjeza Beca", "Hamsa Shaik"]
		num_students_checked = 0
		for num_students_checked in range(len(response_json["students"])):
			curr_student = response_json["students"][num_students_checked]
			self.assertEqual(curr_student['first_name'] + " " + curr_student['last_name'], expected_names[num_students_checked])

		# 1 schedule should have been returned (all the schedules for the section)
		self.assertEqual(len(response_json["schedule"]), 1)

		# 4 attendances should have been returned (all the attendances for the section)
		self.assertEqual(len(response_json["report"]), 4)
		# Verify that the attendance statuses match the ones we set up
		expected_attendances = ["Present", "Present", "Late", "Absent"]
		num_attendances_checked = 0
		for num_attendances_checked in range(len(response_json["report"])):
			curr_attendance = response_json["report"][num_attendances_checked]
			self.assertEqual(curr_attendance['status'], expected_attendances[num_attendances_checked])