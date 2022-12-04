from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIRequestFactory
from rest_framework.test import force_authenticate
from account.models import Student, Instructor
from attendance.models import Issue, Attendance
from course.models import Course, Section, Schedule, AttendanceSetting
from recognition.models import StudentImage
from datetime import date, timedelta, time, datetime
from course import views
import json

class CourseViewAPITest(TestCase):
	@classmethod
	def setUpTestData(cls):
		# Set up a student user
		User.objects.create(username="TestStudent", first_name="Shivani", last_name="Patel",
			                password="TestPassword1", email="TestStudent@gmail.com")

		# Set up an instructor user
		User.objects.create(username="TestTeacher", first_name="Ian", last_name="Applebaum",
			                password="TestPassword5", email="TestInstructor@gmail.com")

		# Set up the students and instructor
		Student.objects.create(canvasId=1, user=User.objects.get(id=1))
		Instructor.objects.create(canvasId=5, user=User.objects.get(id=2))

		# Set up a course - this is needed for recognize_image
		# Set the start date to today and the end date to tomorrow - this guarantees
		# that the course is always active when the test is run
		Course.objects.create(canvasId=1, name="Test Course", course_number=4398,
			                  start_date=date.today(), end_date=date.today()+timedelta(days=1))

		# Set up the students in the course
		students = []
		students.append(Student.objects.get(id=1))

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


	# Verify that the teacher can view their list of current courses
	def test_that_teacher_can_view_courses(self):

		# Grab an instructor user
		currUser = User.objects.get(id=2)

		# Set up the API request factory
		factory = APIRequestFactory()

		# Instantiate the view that we need to set up courses
		view = views.SetupCourseAPIView.as_view()

		# Get the current Canvas courses for the instructor
		request = factory.get('/courses/', {'user':currUser})
		force_authenticate(request, user=currUser)
		response = view(request)

		# Convert the response to JSON
		response_json = json.loads(response.render().content.decode("utf-8"))

		# The response should contain the course we added in the test setup
		expected_course = Course.objects.get(id=1)
		self.assertEqual(response_json[0]["canvasId"], expected_course.canvasId)
		self.assertEqual(response_json[0]["name"], expected_course.name)
		self.assertEqual(response_json[0]["course_number"], expected_course.course_number)
		self.assertEqual(response_json[0]["start_date"], str(expected_course.start_date))
		self.assertEqual(response_json[0]["end_date"], str(expected_course.end_date))


	# Verify that students cannot view the current course list
	def test_that_student_cannot_view_courses(self):

		# Grab a student user
		currUser = User.objects.get(id=1)

		# Set up the API request factory
		factory = APIRequestFactory()

		# Instantiate the view that we need to set up courses
		view = views.SetupCourseAPIView.as_view()

		# Attempt to get the current Canvas courses as the student
		request = factory.get('/courses/', {'user':currUser})
		force_authenticate(request, user=currUser)
		response = view(request)

		# The response should be a 403 because the student does not have permission
		self.assertEqual(response.status_code, 403)


	# Verify that the instructor is able to add a new course if it does not exist already
	def test_that_teacher_can_add_courses(self):

		# Grab an instructor user
		currUser = User.objects.get(id=2)

		# Set up the API request factory
		factory = APIRequestFactory()

		# Instantiate the view that we need to set up courses
		view = views.SetupCourseAPIView.as_view()

		# Attempt to add a new course to the backend
		request = factory.post('/courses/', {'user':currUser, 'canvasId':2, 'name':'Test Course 2',
			                                 'course_number':4399, 'start_date':str(date.today()),
			                                 'end_date': str(date.today()+timedelta(days=1))}, format='multipart')
		force_authenticate(request, user=currUser)
		response = view(request)

		# The response should be a 201 because this course did not exist before
		self.assertEqual(response.status_code, 201)

		# The course should exist in the backend
		self.assertEqual(Course.objects.filter(canvasId=2).exists(), True)

		# The course should contain the information the user passed in
		newly_added_course = Course.objects.get(canvasId=2)
		self.assertEqual(int(newly_added_course.canvasId), 2)
		self.assertEqual(newly_added_course.name, 'Test Course 2')
		self.assertEqual(int(newly_added_course.course_number), 4399)
		self.assertEqual(str(newly_added_course.start_date), str(date.today()))
		self.assertEqual(str(newly_added_course.end_date), str(date.today()+timedelta(days=1)))


	# Verify that the instructor cannot add a course with invalid information
	def test_that_teacher_cannot_add_invalid_course(self):
		
		# Grab an instructor user
		currUser = User.objects.get(id=2)

		# Set up the API request factory
		factory = APIRequestFactory()

		# Instantiate the view that we need to set up courses
		view = views.SetupCourseAPIView.as_view()

		# Create a new Canvas course that the instructor will attempt to add.
		# This is invalid because there is no name associated with the course
		request = factory.post('/courses/', {'user':currUser, 'canvasId':3,
			                                 'course_number':4399, 'start_date':str(date.today()),
			                                 'end_date': str(date.today()+timedelta(days=1))}, format='multipart')
		force_authenticate(request, user=currUser)
		response = view(request)

		# The response should be a 400 because the course is invalid
		self.assertEqual(response.status_code, 400)

		# The course should not exist in the backend
		self.assertEqual(Course.objects.filter(canvasId=3).exists(), False)


	# Verify that the instructor cannot add a course that already exists
	def test_that_teacher_cannot_add_the_same_course_twice(self):
		
		# Grab an instructor user
		currUser = User.objects.get(id=2)

		# Set up the API request factory
		factory = APIRequestFactory()

		# Instantiate the view that we need to set up courses
		view = views.SetupCourseAPIView.as_view()

		# Create a new Canvas course that the instructor will attempt to add.
		# This will not be added because a course with this canvas ID already exists
		request = factory.post('/courses/', {'user':currUser, 'canvasId':1, 'name':'Testing Project',
			                                 'course_number':4399, 'start_date':str(date.today()),
			                                 'end_date': str(date.today()+timedelta(days=1))}, format='multipart')
		force_authenticate(request, user=currUser)
		response = view(request)

		# The response should contain the course that already exists in the backend with this canvas ID
		response_json = json.loads(response.render().content.decode("utf-8"))

		# Verify that the course returned matches the course that already existed in the backend
		expected_course = Course.objects.get(canvasId=1)
		self.assertEqual(response_json['canvasId'], expected_course.canvasId)
		self.assertEqual(response_json['name'], expected_course.name)
		self.assertEqual(response_json['course_number'], expected_course.course_number)
		self.assertEqual(response_json['start_date'], str(date.today()))
		self.assertEqual(response_json['end_date'], str(date.today()+timedelta(days=1)))


	# Verify that the student cannot add courses
	def test_that_student_cannot_add_courses(self):

		# Grab a student user
		currUser = User.objects.get(id=1)

		# Set up the API request factory
		factory = APIRequestFactory()

		# Instantiate the view that we need to set up courses
		view = views.SetupCourseAPIView.as_view()

		# Attempt to get the current Canvas courses as the student
		request = factory.post('/courses/', {'user':currUser})
		force_authenticate(request, user=currUser)
		response = view(request)

		# The response should be a 403 because the student does not have permission
		self.assertEqual(response.status_code, 403)


	# Verify that students cannot view active Canvas courses
	def test_that_student_cannot_view_active_canvas_courses(self):
		
		# Grab a student user
		currUser = User.objects.get(id=1)

		# Set up the API request factory
		factory = APIRequestFactory()

		# Instantiate the view that we need to set up courses
		view = views.CanvasActiveCoursesAPIView.as_view()

		# Attempt to get the current Canvas courses as the student
		request = factory.get('/canvas/courses/', {'user':currUser})
		force_authenticate(request, user=currUser)
		response = view(request)

		# The response should be a 403 because the student does not have permission
		self.assertEqual(response.status_code, 403)


	# Verify that the student cannot add courses or sections
	def test_that_student_cannot_get_or_modify_sections(self):
		
		# Grab a student user
		currUser = User.objects.get(id=1)

		# Set up the API request factory
		factory = APIRequestFactory()

		# Instantiate the view that we need to set up courses
		view = views.CanvasActiveSectionsAPIView.as_view()

		# Attempt to get the current Canvas courses as the student
		request = factory.get('/canvas/1/sections/', {'user':currUser})
		force_authenticate(request, user=currUser)
		response = view(request)

		# The response should be a 403 because the student does not have permission
		self.assertEqual(response.status_code, 403)


	# Verify that the instructor can add a valid schedule
	def test_that_teacher_can_add_valid_schedule(self):
		
		# Grab an instructor user
		currUser = User.objects.get(id=2)

		# Set up the API request factory
		factory = APIRequestFactory()

		# Instantiate the view that we need to set up courses
		view = views.SectionSettingAndScheduleAPIView.as_view()

		# Attempt to make a schedule with valid information
		curr_time = datetime.now()
		request = factory.post('/section/schedule/', {'user':currUser, 'weekday':date.today().weekday(), 'start_time':str(curr_time.hour) + ":" + str(curr_time.minute),
			                                          'end_time':str(curr_time.hour+1) + ":" + str(curr_time.minute), 'section':Section.objects.get(id=1), 'duration':5})
		force_authenticate(request, user=currUser)
		response = view(request)

		# The response should be a 201 because the schedule was valid and should have been created
		self.assertEqual(response.status_code, 201)

		# The schedule should be saved in the backend
		self.assertEqual(Schedule.objects.filter(id=1).exists(), True)

		# Verify that the saved schedule matches what the instructor set
		saved_schedule = Schedule.objects.get(id=1)
		self.assertEqual(saved_schedule.section, Section.objects.get(id=1))
		self.assertEqual(saved_schedule.weekday, date.today().weekday())
		self.assertEqual(saved_schedule.start_time, time(curr_time.hour, curr_time.minute, curr_time.second))
		self.assertEqual(saved_schedule.end_time, time(curr_time.hour+1, curr_time.minute, curr_time.second))

		# Since an attendance setting didn't exist, that should also be saved into the backend
		self.assertEqual(AttendanceSetting.objects.filter(id=1).exists(), True)

		# Verify that the saved attendance setting matches what's specified
		saved_attendance_setting = AttendanceSetting.objects.get(id=1)
		self.assertEqual(saved_attendance_setting.section, Section.objects.get(id=1))
		self.assertEqual(saved_attendance_setting.duration, 5)


	# Verify that the instructor cannot add a schedule that already exists
	def test_that_teacher_cannot_add_duplicate_schedule(self):

		# Grab an instructor user
		currUser = User.objects.get(id=2)

		# Set up the API request factory
		factory = APIRequestFactory()

		# Instantiate the view that we need to set up courses
		view = views.SectionSettingAndScheduleAPIView.as_view()

		# Attempt to make a schedule with valid information
		curr_time = datetime.now()
		request = factory.post('/section/schedule/', {'user':currUser, 'weekday':date.today().weekday(), 'start_time':str(curr_time.hour) + ":" + str(curr_time.minute),
			                                          'end_time':str(curr_time.hour+1) + ":" + str(curr_time.minute), 'section':Section.objects.get(id=1), 'duration':5})
		force_authenticate(request, user=currUser)
		response = view(request)

		# The response should be a 201 because the schedule was valid and should have been created
		self.assertEqual(response.status_code, 201)

		# Attempt to make another schedule with the same start time
		response = view(request)

		# This should return a 422
		self.assertEqual(response.status_code, 422)

		# Get the response content
		response_json = json.loads(response.render().content.decode("utf-8"))

		# Verify that the content shows that the schedule already exists
		self.assertEqual(response_json['detail'], 'this schedule already exists')


	# Verify that the instructor cannot add a schedule with start time > end time
	def test_that_teacher_cannot_add_mistimed_schedule(self):

		# Grab an instructor user
		currUser = User.objects.get(id=2)

		# Set up the API request factory
		factory = APIRequestFactory()

		# Instantiate the view that we need to set up courses
		view = views.SectionSettingAndScheduleAPIView.as_view()

		# Attempt to make a schedule with invalid information (the end time is before the start time)
		curr_time = datetime.now()
		request = factory.post('/section/schedule/', {'user':currUser, 'weekday':date.today().weekday(), 'start_time':str(curr_time.hour) + ":" + str(curr_time.minute),
			                                          'end_time':str(curr_time.hour) + ":" + str(curr_time.minute-1), 'section':Section.objects.get(id=1), 'duration':5})
		force_authenticate(request, user=currUser)
		response = view(request)

		# Get the response content
		response_json = json.loads(response.render().content.decode("utf-8"))

		# This should return a 422
		self.assertEqual(response.status_code, 422)

		# Verify that the response indicates that the schedule already existed
		self.assertEqual(response_json['detail'], 'Start time should be less than End time')


	# Verify that the student cannot add schedules
	def test_that_student_cannot_add_schedule(self):
		
		# Grab a student user
		currUser = User.objects.get(id=1)

		# Set up the API request factory
		factory = APIRequestFactory()

		# Instantiate the view that we need to set up courses
		view = views.SectionSettingAndScheduleAPIView.as_view()

		# Attempt to get the current Canvas courses as the student
		request = factory.get('/section/schedule/', {'user':currUser})
		force_authenticate(request, user=currUser)
		response = view(request)

		# The response should be a 403 because the student does not have permission
		self.assertEqual(response.status_code, 403)


	# Verify that the instructor can delete a schedule
	def test_that_teacher_can_delete_schedule(self):
		
		# Verify that a schedule to delete exists in the backend
		self.assertEqual(Schedule.objects.filter(id=1).exists(), True)

		# Grab an instructor user
		currUser = User.objects.get(id=2)

		# Set up the API request factory
		factory = APIRequestFactory()

		# Instantiate the view that we need to delete schedules
		view = views.ScheduleDetailAPIView.as_view()

		# Attempt to delete the existing schedule as an instructor
		request = factory.delete('/schedule/1/', {'user':currUser}, format='multipart')
		force_authenticate(request, user=currUser)
		response = view(request, id=1)

		# The response should be a 204 because the schedule no longer exists
		self.assertEqual(response.status_code, 204)

		# The object should no longer exist in the backend
		self.assertEqual(Schedule.objects.filter(id=1).exists(), False)


	# Verify that the student cannot delete a schedule
	def test_that_student_cannot_delete_schedule(self):
		
		# Grab a student user
		currUser = User.objects.get(id=1)

		# Set up the API request factory
		factory = APIRequestFactory()

		# Instantiate the view that we need to set up courses
		view = views.ScheduleDetailAPIView.as_view()

		# Attempt to get the current Canvas courses as the student
		request = factory.delete('/schedule/1/', {'user':currUser})
		force_authenticate(request, user=currUser)
		response = view(request)

		# The response should be a 403 because the student does not have permission
		self.assertEqual(response.status_code, 403)


	# Verify that the instructor can delete a section
	def test_that_teacher_can_delete_section(self):
		
		# Verify that a section to delete exists in the backend
		self.assertEqual(Section.objects.filter(id=1).exists(), True)

		# Grab an instructor user
		currUser = User.objects.get(id=2)

		# Set up the API request factory
		factory = APIRequestFactory()

		# Instantiate the view that we need to delete schedules
		view = views.SectionDetailAPIView.as_view()

		# Attempt to delete the existing schedule as an instructor
		request = factory.delete('/section/1/', {'user':currUser}, format='multipart')
		force_authenticate(request, user=currUser)
		response = view(request, id=1)

		# The response should be a 204 because the schedule no longer exists
		self.assertEqual(response.status_code, 204)

		# The object should no longer exist in the backend
		self.assertEqual(Section.objects.filter(id=1).exists(), False)


	# Verify that the student cannot delete a section
	def test_that_student_cannot_delete_section(self):
		
		# Grab a student user
		currUser = User.objects.get(id=1)

		# Set up the API request factory
		factory = APIRequestFactory()

		# Instantiate the view that we need to set up courses
		view = views.SectionDetailAPIView.as_view()

		# Attempt to get the current Canvas courses as the student
		request = factory.get('/sections/1/', {'user':currUser})
		force_authenticate(request, user=currUser)
		response = view(request)

		# The response should be a 403 because the student does not have permission
		self.assertEqual(response.status_code, 403)