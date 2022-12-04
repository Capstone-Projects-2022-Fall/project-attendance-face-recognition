from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIRequestFactory
from rest_framework.test import force_authenticate
from account.models import Student, Instructor
from attendance.models import Issue, Attendance
from course.models import Course, Section, Schedule, AttendanceSetting
from recognition.models import StudentImage
from datetime import date, timedelta, time, datetime
from attendance import views
from recognition.views import ImageTrainingAPIView
import json
import os

class AttendanceViewAPITest(TestCase):
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

		# Set up an issue for each student that was not marked present
		Issue.objects.create(student=Student.objects.get(id=3),section=new_section,subject="I wasn't late",message="Please mark me present")
		Issue.objects.create(student=Student.objects.get(id=4),section=new_section,subject="I couldn't make emotions",message="Please mark me present")

		# Set up some dummy issues so the range feature can be tested
		# At this point there should be 12 issues; these have IDs 0-11
		for issue_idx in range(10):
			Issue.objects.create(student=Student.objects.get(id=2),section=new_section,subject="dummy",message="dummy")

		# Actual student images to test recognition and attendance
		# Upload 4 images of the student to mimic their registration
		currUser = User.objects.get(id=1)

		# Instantiate the view that we need to upload images
		view = ImageTrainingAPIView.as_view()

		# Set up the API request factory
		factory = APIRequestFactory()

		# Encode four images of a user. Force authentication since there's no reason not to 
		# authenticate for this test
		# Responses are generated here, but not used. This is designed to modularize later tests in this suite.
		with open(os.path.join(os.path.dirname(__file__), '../test_images/image_to_encode_1.jpeg'), "rb") as image_data:
			request = factory.post('/registration/', {'user':currUser, 'imageFile': image_data}, format='multipart')
			force_authenticate(request, user=currUser)
			response = view(request)

		with open(os.path.join(os.path.dirname(__file__), '../test_images/image_to_encode_2.jpeg'), "rb") as image_data:
			request = factory.post('/registration/', {'user':currUser, 'imageFile': image_data}, format='multipart')
			force_authenticate(request, user=currUser)
			response = view(request)

		with open(os.path.join(os.path.dirname(__file__), '../test_images/image_to_encode_3.jpeg'), "rb") as image_data:
			request = factory.post('/registration/', {'user':currUser, 'imageFile': image_data}, format='multipart')
			force_authenticate(request, user=currUser)
			response = view(request)

		with open(os.path.join(os.path.dirname(__file__), '../test_images/image_to_encode_4.jpeg'), "rb") as image_data:
			request = factory.post('/registration/', {'user':currUser, 'imageFile': image_data}, format='multipart')
			force_authenticate(request, user=currUser)
			response = view(request)

		# Mock student images to verify attendance paths
		# 1 student will have 5 uploaded images
		StudentImage.objects.create(imageFile="dummy1.jpeg", student=Student.objects.get(id=2))
		StudentImage.objects.create(imageFile="dummy2.jpeg", student=Student.objects.get(id=2))
		StudentImage.objects.create(imageFile="dummy3.jpeg", student=Student.objects.get(id=2))
		StudentImage.objects.create(imageFile="dummy4.jpeg", student=Student.objects.get(id=2))
		StudentImage.objects.create(imageFile="dummy5.jpeg", student=Student.objects.get(id=2))


	# Verify that students cannot access the teacher's daily report
	def test_that_student_cannot_access_teacher_daily_report(self):

		# Grab a student user
		currUser = User.objects.get(id=1)

		# Instantiate the view that we want to test
		view = views.TeacherDailyReportAPIView.as_view()

		# Set up the API request factory
		factory = APIRequestFactory()

		# Attempt to get the teacher's daily report as the student
		request = factory.get('/report/today/', {'user':currUser})
		force_authenticate(request, user=currUser)
		response = view(request)

		# This should return a 403 since the user does not have permission to access this
		self.assertEqual(response.status_code, 403)


	# Verify that the teacher can access the daily report and that its contents are correct
	def test_teacher_daily_report(self):

		# Grab the instructor user
		currUser = User.objects.get(id=5)

		# Instantiate the view that we want totest
		view = views.TeacherDailyReportAPIView.as_view()

		# Set up the API request factory
		factory = APIRequestFactory()

		# Attempt to get the teacher's daily report as the instructor
		request = factory.get('/report/today/', {'user':currUser})
		force_authenticate(request, user=currUser)
		response = view(request)

		# This should return a 200 since the user has permission to access this
		self.assertEqual(response.status_code, 200)

		# Get the data in the daily report
		response_json = json.loads(response.render().content.decode("utf-8"))
		daily_report = response_json['today_report']

		# Get the attendances in the daily report
		# Make an array of the expected attendances
		# They should be in order of the attendance objects that were created when the test was initialized
		expected_names = ["Patel, Shivani", "Maurice, Jerry", "Beca, Anjeza", "Shaik, Hamsa"]
		expected_attendances = ["Present", "Present", "Late", "Absent"]

		# Verify that the attendances returned in the student report match the expected attendances
		num_attendances_processed = 0
		for attendance in daily_report:
			self.assertEqual(attendance['studentName'], expected_names[num_attendances_processed])
			self.assertEqual(attendance['status'], expected_attendances[num_attendances_processed])
			num_attendances_processed = num_attendances_processed + 1


	# Verify that students cannot access attendance statistics
	def test_that_student_cannot_access_attendance_statistics(self):

		# Grab a student user
		currUser = User.objects.get(id=1)

		# Instantiate the view that we want to test
		view = views.TeacherDailyReportAPIView.as_view()

		# Set up the API request factory
		factory = APIRequestFactory()

		# Attempt to get the attendance statistics as a student
		request = factory.get('/statistics/attendance/', {'user':currUser})
		force_authenticate(request, user=currUser)
		response = view(request)

		# This should return a 403 since the user does not have permission to access this
		self.assertEqual(response.status_code, 403)


	# Verify that the instructor can access attendance statistics, and that those statistics are correct
	def test_teacher_attendance_statistics(self):

		# Grab an instructor user
		currUser = User.objects.get(id=5)

		# Instantiate the view that we want to test
		view = views.AttendanceStatisticsAPIView.as_view()

		# Set up the API request factory
		factory = APIRequestFactory()

		# Get the attendance statistics
		request = factory.get('/statistics/attendance/', {'user':currUser})
		force_authenticate(request, user=currUser)
		response = view(request)

		# This should return a 200 because the user has permission to access this
		self.assertEqual(response.status_code, 200)

		# Get the data in the attendance statistics
		response_json = json.loads(response.render().content.decode("utf-8"))

		# Verify that the number of presents, absents, and lates is returned properly
		self.assertEqual(sum(response_json['present']), 2)
		self.assertEqual(sum(response_json['late']), 1)
		self.assertEqual(sum(response_json['absent']), 1)

		# Verify that the presents, absents, and lates are reported for the correct month
		curr_date = datetime.now()
		self.assertEqual(response_json['present'][curr_date.month-1], 2)
		self.assertEqual(response_json['late'][curr_date.month-1], 1)
		self.assertEqual(response_json['absent'][curr_date.month-1], 1)


	# Verify that students cannot access section statistics
	def test_that_student_cannot_access_section_statistics(self):

		# Grab a student user
		currUser = User.objects.get(id=1)

		# Instantiate the view that we want to test
		view = views.SectionStatisticsAPIView.as_view()

		# Set up the API request factory
		factory = APIRequestFactory()

		# Attempt to get the section statistics as a student
		request = factory.get('/statistics/sections/', {'user':currUser})
		force_authenticate(request, user=currUser)
		response = view(request)

		# This should return a 403 since the user does not have permission to access this
		self.assertEqual(response.status_code, 403)


	# Verify that the instructor can access section statistics, and that those statistics are correct
	def test_teacher_section_statistics(self):

		# Grab an instructor user
		currUser = User.objects.get(id=5)

		# Instantiate the view that we want to test
		view = views.SectionStatisticsAPIView.as_view()

		# Set up the API request factory
		factory = APIRequestFactory()

		# Get the section statistics as an instructor
		request = factory.get('/statistics/sections', {'user':currUser})
		force_authenticate(request, user=currUser)
		response = view(request)

		# This should return a 200 since the user has permission to access this
		self.assertEqual(response.status_code, 200)

		# Get the data in the attendance statistics
		response_json = json.loads(response.render().content.decode("utf-8"))

		# Get the section created for the test
		curr_section = Section.objects.get(id=1)

		# Verify that the statistics report indicates that 4 students are enrolled in the section
		self.assertEqual(response_json[curr_section.name], 4)


	# Verify that students can not access the attendance monitoring page
	def test_that_student_cannot_access_attendance_monitoring(self):

		# Grab a student user
		currUser = User.objects.get(id=1)

		# Instantiate the view that we want to test
		view = views.AttendanceSectionAPIView.as_view()

		# Set up the API request factory
		factory = APIRequestFactory()

		# Attempt to get the section statistics as a student
		request = factory.get('/attendance/monitoring/', {'user':currUser})
		force_authenticate(request, user=currUser)
		response = view(request)

		# This should return a 403 since the user does not have permission to access this
		self.assertEqual(response.status_code, 403)


	# Verify that the instructor can access the attendance monitoring page, and verify
	# that it returns correct data
	def test_teacher_attendance_monitoring(self):

		# Grab an instructor user
		currUser = User.objects.get(id=5)

		# Instantiate the view that we want to test
		view = views.AttendanceSectionAPIView.as_view()

		# Set up the API request factory
		factory = APIRequestFactory()

		# Get attendance monitoring as the instructor
		request = factory.get('/attendance/monitoring/', {'user':currUser})
		force_authenticate(request, user=currUser)
		response = view(request)

		# This should return a 200 because the instructor has access to this page
		self.assertEqual(response.status_code, 200)

		# Get the data from the response
		response_json = json.loads(response.render().content.decode("utf-8"))

		# Verify that the attendance status is set to 1
		self.assertEqual(response_json["attendance_status"], 1)

		# Verify that the attendances were returned properly
		# Make an array of the expected attendances
		# They should be in order of the attendance objects that were created when the test was initialized
		expected_names = ["Patel, Shivani", "Maurice, Jerry", "Beca, Anjeza", "Shaik, Hamsa"]
		expected_attendances = ["Present", "Present", "Late", "Absent"]

		# Verify that the attendances returned in the student report match the expected attendances
		num_attendances_processed = 0
		for attendance in response_json["attendance"]:
			self.assertEqual(attendance['studentName'], expected_names[num_attendances_processed])
			self.assertEqual(attendance['status'], expected_attendances[num_attendances_processed])
			num_attendances_processed = num_attendances_processed + 1


	# Verify that the attendance monitoring page returns None if there are no courses
	# currently active on AFR
	def test_attendance_monitoring_with_no_class(self):

		# Grab an instructor user
		currUser = User.objects.get(id=5)

		# Instantiate the view that we want to test
		view = views.AttendanceSectionAPIView.as_view()

		# Set up the API request factory
		factory = APIRequestFactory()

		# Change the current section's start date forward by 1 day - this means that there are
		# no classes are currently active
		curr_schedule = Schedule.objects.get(id=1)
		curr_schedule.weekday = date.today().weekday()+1
		curr_schedule.save()

		# Get attendance monitoring as the instructor
		request = factory.get('/attendance/monitoring/', {'user':currUser})
		force_authenticate(request, user=currUser)
		response = view(request)

		# This should return a 200 because the instructor has access to this page
		self.assertEqual(response.status_code, 200)

		# Get the data from the response
		response_json = json.loads(response.render().content.decode("utf-8"))

		# Verify that the attendance status is set to 0
		self.assertEqual(response_json["attendance_status"], 0)

		# Verify that the attendance returns None
		self.assertEqual(response_json["attendance"], None)

		# Change the section back so future tests can use it as intended
		curr_schedule.weekday = date.today().weekday()
		curr_schedule.save()


	# Verify that the student cannot take attendance if they have not uploaded any pictures
	# of themselves
	def test_that_student_cannot_take_attendance_with_no_pictures(self):

		# Grab a student user that does not have images uploaded
		currUser = User.objects.get(id=3)

		# Instantiate the view that we want to test
		view = views.AttendanceStudentAPIView.as_view()

		# Set up the API request factory
		factory = APIRequestFactory()

		# Attempt to take attendance with no images uploaded
		# There is an attendance already, but not having images uploaded takes higher priority.
		request = factory.get('/attendance/', {'user':currUser})
		force_authenticate(request, user=currUser)
		response = view(request)

		# This should return a 200
		self.assertEqual(response.status_code, 200)

		# Get the data from the response
		response_json = json.loads(response.render().content.decode("utf-8"))

		# Verify that the authorization is set to 0
		self.assertEqual(response_json["authorization"], 0)

		# Verify that the message prompts the user to upload images
		self.assertEqual(response_json["message"], "Attendance cannot be recorded. Please upload images")


	# Verify that the student cannot take attendance if they have images uploaded, but already
	# have attendance taken for that class
	def test_that_student_cannot_take_attendance_twice(self):

		# Grab a student user
		currUser = User.objects.get(id=1)

		# Instantiate the view that we want to test
		view = views.AttendanceStudentAPIView.as_view()

		# Set up the API request factory
		factory = APIRequestFactory()

		# Attempt to take attendance with an image uploaded, but with an attendance object that already exists
		request = factory.get('/attendance/', {'user':currUser})
		force_authenticate(request, user=currUser)
		response = view(request)

		# This should return a 200
		self.assertEqual(response.status_code, 200)

		# Get the data from the response
		response_json = json.loads(response.render().content.decode("utf-8"))

		# Verify that the authorization is set to 0
		self.assertEqual(response_json["authorization"], 0)

		# Verify that the message tells the user that they have already taken attendance
		self.assertEqual(response_json["message"], "Attendance already recorded")


	# Verify that the student can take attendance with 4 images uploaded and no attendance
	# already present
	def test_that_student_can_take_attendance_with_four_pictures(self):

		# Grab a student user with 4 uploaded pictures
		currUser = User.objects.get(id=1)

		# Instantiate the view that we want to test
		view = views.AttendanceStudentAPIView.as_view()

		# Set up the API request factory
		factory = APIRequestFactory()

		# Delete the current attendance object associated with that user so that they
		# can take attendance
		Attendance.objects.get(student=Student.objects.get(id=1)).delete()

		# Attempt to take attendance
		request = factory.get('/attendance/', {'user':currUser})
		force_authenticate(request, user=currUser)
		response = view(request)

		# This should return a 200
		self.assertEqual(response.status_code, 200)

		# Get the data from the response
		response_json = json.loads(response.render().content.decode("utf-8"))

		# Verify that the authorization is set to 1
		self.assertEqual(response_json["authorization"], 1)

		# Verify that the message tells the user that they are ready to take attendance,
		# but that they should upload more images
		self.assertEqual(response_json["message"], "You are ready to take attendance but you are recommended to upload more picture in the future")


	# Verify that the student can take attendance with 5 images uploaded and no attendance
	# already present
	def test_that_student_can_take_attendance_with_five_pictures(self):

		# Grab a student user with 5 uploaded pictures
		currUser = User.objects.get(id=2)

		# Instantiate the view that we want to test
		view = views.AttendanceStudentAPIView.as_view()

		# Set up the API request factory
		factory = APIRequestFactory()

		# Delete the current attendance object associated with that user so that they
		# can take attendance
		Attendance.objects.get(student=Student.objects.get(id=2)).delete()

		# Attempt to take attendance
		request = factory.get('/attendance/', {'user':currUser})
		force_authenticate(request, user=currUser)
		response = view(request)

		# This should return a 200
		self.assertEqual(response.status_code, 200)

		# Get the data from the response
		response_json = json.loads(response.render().content.decode("utf-8"))

		# Veriy that the authorization is set to 1
		self.assertEqual(response_json["authorization"], 1)

		# Verify that the message tells the user that they are ready to take attendance
		self.assertEqual(response_json["message"], "Ready to take attendance")


	# Verify that the student can take attendance if the emotion matches, and that
	# the student is prompted to try again if the emotion does not match
	def test_student_is_marked_present(self):

		# Delete the five dummy pictures - these will break actual attendance afterwards
		StudentImage.objects.get(imageFile="dummy1.jpeg").delete()
		StudentImage.objects.get(imageFile="dummy2.jpeg").delete()
		StudentImage.objects.get(imageFile="dummy3.jpeg").delete()
		StudentImage.objects.get(imageFile="dummy4.jpeg").delete()
		StudentImage.objects.get(imageFile="dummy5.jpeg").delete()

		# Delete any attendance objects that may already exist for the student
		Attendance.objects.filter(student=Student.objects.get(id=1)).delete()

		# Grab the student user with properly uploaded pictures
		currUser = User.objects.get(id=1)

		# Instantiate the view that we want to test
		view = views.AttendanceStudentAPIView.as_view()

		# Set up the API request factory
		factory = APIRequestFactory()

		# Attempt to take attendance with a "happy" screen capture and a "happy" requested
		# emotion. This should result in attendance being taken.
		with open(os.path.join(os.path.dirname(__file__), '../test_images/attendance_image.jpeg'), "rb") as emotion_image, open(os.path.join(os.path.dirname(__file__), '../test_images/image_to_recognize.jpeg'), "rb") as regular_image:
			request = factory.post('/attendance/', {'user': currUser, 'emotionImage': emotion_image, 'regularImage': regular_image, 'emotion': "happy"}, format='multipart')
			force_authenticate(request, user=currUser)
			response = view(request)

			# The response should be status code 200 regardless of attendance result
			self.assertEqual(response.status_code, 200)

			# Get the data from the response
			response_json = json.loads(response.render().content.decode("utf-8"))

			# The response should indicate that the student was marked present
			self.assertEqual(response_json["message"], "You have been marked Present")

			# The response should indicate that attendance is complete
			self.assertEqual(response_json["completed"], True)

			# There should be an attendance object created for the student
			self.assertEqual(Attendance.objects.filter(student=Student.objects.get(id=1)).exists(), True)

			attendance = Attendance.objects.get(student=Student.objects.get(id=1))

			# The student should be marked present in this attendance object
			self.assertEqual(attendance.status, "Present")


	# Verify that attendance is not taken when the student submits the wrong emotion.
	def test_student_submitting_the_wrong_emotion(self):

		# Delete the five dummy pictures - these will break actual attendance afterwards
		StudentImage.objects.get(imageFile="dummy1.jpeg").delete()
		StudentImage.objects.get(imageFile="dummy2.jpeg").delete()
		StudentImage.objects.get(imageFile="dummy3.jpeg").delete()
		StudentImage.objects.get(imageFile="dummy4.jpeg").delete()
		StudentImage.objects.get(imageFile="dummy5.jpeg").delete()

		# Delete any attendance objects that may already exist for the student
		Attendance.objects.filter(student=Student.objects.get(id=1)).delete()

		# Grab the student user with properly uploaded pictures
		currUser = User.objects.get(id=1)

		# Instantiate the view that we want to test
		view = views.AttendanceStudentAPIView.as_view()

		# Set up the API request factory
		factory = APIRequestFactory()

		# Attempt to take attendance with a "happy" screen capture but "sad" requested
		# emotion. This should not result in attendance being taken.
		with open(os.path.join(os.path.dirname(__file__), '../test_images/attendance_image.jpeg'), "rb") as emotion_image, open(os.path.join(os.path.dirname(__file__), '../test_images/image_to_recognize.jpeg'), "rb") as regular_image:
			request = factory.post('/attendance/', {'user': currUser, 'emotionImage': emotion_image, 'regularImage': regular_image, 'emotion': "sad"}, format='multipart')
			force_authenticate(request, user=currUser)
			response = view(request)

			# The response should be status code 200 regardless of attendance result
			self.assertEqual(response.status_code, 200)

			# Get the data from the response
			response_json = json.loads(response.render().content.decode("utf-8"))

			# The response should indicate that the student could not be identified
			self.assertEqual(response_json["message"], "Please try again. You could not be identified")

			# The response should contain a new random emotion, but we cannot test this deterministically

			# The response should show that attendance is not complete
			self.assertEqual(response_json["completed"], False)

			# There should be no attendance objects for the student
			self.assertEqual(Attendance.objects.filter(student=Student.objects.get(id=1)).exists(), False)


	# Verify that the student is marked late if they take attendance after the specified
	# present duration
	def test_student_is_marked_late(self):

		# Delete the five dummy pictures - these will break actual attendance afterwards
		StudentImage.objects.get(imageFile="dummy1.jpeg").delete()
		StudentImage.objects.get(imageFile="dummy2.jpeg").delete()
		StudentImage.objects.get(imageFile="dummy3.jpeg").delete()
		StudentImage.objects.get(imageFile="dummy4.jpeg").delete()
		StudentImage.objects.get(imageFile="dummy5.jpeg").delete()

		# Delete any attendance objects that may already exist for the student
		Attendance.objects.filter(student=Student.objects.get(id=1)).delete()

		# Grab the student user with properly uploaded pictures
		currUser = User.objects.get(id=1)

		# Instantiate the view that we want to test
		view = views.AttendanceStudentAPIView.as_view()

		# Set up the API request factory
		factory = APIRequestFactory()

		# Change the scheduled class time to start 10 minutes before attendance is taken. This will
		# mark the student late as the AttendanceSetting duration is set to 5 minutes
		curr_schedule = Schedule.objects.get(id=1)
		curr_time = datetime.now()
		# Account for hour rollover so the test works between xx:00 and xx:09
		# This breaks between 12:00 and 12:09 AM but that's ok for the purposes of this test
		if (curr_time.minute >= 10):
			curr_schedule.start_time = time(curr_time.hour, curr_time.minute-10, curr_time.second)
		else:
			curr_schedule.start_time = time(curr_time.hour-1, curr_time.minute+50, curr_time.second)
		curr_schedule.save()

		# Attempt to take attendance with a "happy" screen capture and a "happy" requested
		# emotion. This should result in attendance being taken, albeit late.
		with open(os.path.join(os.path.dirname(__file__), '../test_images/attendance_image.jpeg'), "rb") as emotion_image, open(os.path.join(os.path.dirname(__file__), '../test_images/image_to_recognize.jpeg'), "rb") as regular_image:
			request = factory.post('/attendance/', {'user': currUser, 'emotionImage': emotion_image, 'regularImage': regular_image, 'emotion': "happy"}, format='multipart')
			force_authenticate(request, user=currUser)
			response = view(request)

			# The response should be status code 200 regardless of attendance result
			self.assertEqual(response.status_code, 200)

			# Get the data from the response
			response_json = json.loads(response.render().content.decode("utf-8"))

			# The response should indicate that the student was marked late
			self.assertEqual(response_json["message"], "You have been marked Late")

			# The response should indicate that attendance is complete
			self.assertEqual(response_json["completed"], True)

			# There should be an attendance object created for the student
			self.assertEqual(Attendance.objects.filter(student=Student.objects.get(id=1)).exists(), True)

			attendance = Attendance.objects.get(student=Student.objects.get(id=1))

			# The student should be marked present in this attendance object
			self.assertEqual(attendance.status, "Late")


	# Verify that instructors cannot take attendance
	def test_that_instructors_cannot_take_attendance(self):

		# Delete the five dummy pictures - these will break actual attendance afterwards
		StudentImage.objects.get(imageFile="dummy1.jpeg").delete()
		StudentImage.objects.get(imageFile="dummy2.jpeg").delete()
		StudentImage.objects.get(imageFile="dummy3.jpeg").delete()
		StudentImage.objects.get(imageFile="dummy4.jpeg").delete()
		StudentImage.objects.get(imageFile="dummy5.jpeg").delete()

		# Grab an instructor user
		currUser = User.objects.get(id=5)

		# Instantiate the view that we want to test
		view = views.AttendanceStudentAPIView.as_view()

		# Set up the API request factory
		factory = APIRequestFactory()

		# Attempt to perform a GET to /attendance as an instructor
		request = factory.get('/attendance/', {'user':currUser})
		force_authenticate(request, user=currUser)
		response = view(request)

		# This should return a 404 since get_object_or_404 will return a 404
		self.assertEqual(response.status_code, 404)

		# Attempt to perform a POST to /attendance as an instructor
		with open(os.path.join(os.path.dirname(__file__), '../test_images/attendance_image.jpeg'), "rb") as emotion_image, open(os.path.join(os.path.dirname(__file__), '../test_images/image_to_recognize.jpeg'), "rb") as regular_image:
			request = factory.post('/attendance/', {'user': currUser, 'emotionImage': emotion_image, 'regularImage': regular_image, 'emotion': "happy"}, format='multipart')
			force_authenticate(request, user=currUser)
			response = view(request)

			# This should return a 404 since get_object_or_404 will return a 404
			self.assertEqual(response.status_code, 404)


	# Verify that a student cannot submit a blank issue
	def test_that_student_cannot_submit_blank_issue(self):

		# Grab a student user
		currUser = User.objects.get(id=1)

		# Instantiate the view that we want to test
		view = views.IssueSubmissionAPIView.as_view()

		# Set up the API request factory
		factory = APIRequestFactory()

		# Attempt to submit an issue without a subject field
		request = factory.post('/issue_submission/', {'user':currUser,'subject':'','message':'test'}, format='multipart')
		force_authenticate(request, user=currUser)
		response = view(request)

		# This should return a 400 since the subject field is empty
		self.assertEqual(response.status_code, 400)
		# Verify the response's message and completed fields
		response_json = json.loads(response.render().content.decode("utf-8"))
		self.assertEqual(response_json['message'], "Cannot submit a blank issue!")
		self.assertEqual(response_json['completed'], False)

		# Attempt to submit an issue without a message field
		request = factory.post('/issue_submission/', {'user':currUser,'subject':'Missing Attendance','message':''}, format='multipart')
		force_authenticate(request, user=currUser)
		response = view(request)

		# This should also return a 400 since the message field is empty
		self.assertEqual(response.status_code, 400)
		# Verify the response's message and completed fields
		response_json = json.loads(response.render().content.decode("utf-8"))
		self.assertEqual(response_json['message'], "Cannot submit a blank issue!")
		self.assertEqual(response_json['completed'], False)


	# Verify that instructors cannot create issues
	def test_that_instructors_cannot_submit_issues(self):

		# Grab an instructor user
		currUser = User.objects.get(id=5)

		# Instantiate the view that we want to test
		view = views.IssueSubmissionAPIView.as_view()

		# Set up the API request factory
		factory = APIRequestFactory()

		# Attempt to submit an issue
		request = factory.post('/issue_submission/', {'user':currUser,'subject':'test','message':'test2'}, format='multipart')
		force_authenticate(request, user=currUser)
		response = view(request)

		# This should return a 404 because the instructor doesn't hae the ability to create issues
		self.assertEqual(response.status_code, 404)


	# Verify that students can submit issues
	def test_that_student_can_submit_issues(self):

		# Grab a student user
		currUser = User.objects.get(id=1)

		# Instantiate the view that we want to test
		view = views.IssueSubmissionAPIView.as_view()

		# Set up the API request factory
		factory = APIRequestFactory()

		# Attempt to submit an issue
		request = factory.post('/issue_submission/', {'user':currUser,'subject':'test','message':'test2'}, format='multipart')
		force_authenticate(request, user=currUser)
		response = view(request)

		# This should return a 200 because the student is able to create issues
		self.assertEqual(response.status_code, 200)
		# Verify the response's message and completed fields
		response_json = json.loads(response.render().content.decode("utf-8"))
		self.assertEqual(response_json['message'], "Issue has been submitted!")
		self.assertEqual(response_json['completed'], True)

		# Verify that the issue was created in the backend
		self.assertEqual(Issue.objects.filter(student=Student.objects.get(id=1)).exists(), True)

		# Get the issue assuming it exists
		submitted_issue = Issue.objects.get(student=Student.objects.get(id=1))

		# Verify that the other fields in the issue are correct
		self.assertEqual(submitted_issue.subject, "test")
		self.assertEqual(submitted_issue.message, "test2")
		self.assertEqual(submitted_issue.section, Section.objects.get(id=1))


	# Verify that instructors can approve issues
	def test_that_instructor_can_approve_issues(self):

		# Grab an instructor user
		currUser = User.objects.get(id=5)

		# Instantiate the view that we want to test
		view = views.IssueApprovalAPIView.as_view()

		# Set up the API request factory
		factory = APIRequestFactory()

		# Attempt to approve a single issue
		# At this point, the issues should have IDs of 1-12
		# Verify that they all exist
		for issue_idx in range(1,13):
			print(issue_idx)
			self.assertEqual(Issue.objects.filter(id=issue_idx).exists(), True)

		# Make the POST
		request = factory.post('/issue_approval/', {'user':currUser,'issues_to_modify':'1'})
		force_authenticate(request, user=currUser)
		response = view(request)

		# This should return a 200 because the instructor is able to resolve issues
		self.assertEqual(response.status_code, 200)
		# Verify the response's msaage and completed fields
		response_json = json.loads(response.render().content.decode("utf-8"))
		self.assertEqual(response_json['message'], "Issues have been approved!")
		self.assertEqual(response_json['completed'], True)

		# Verify that the issue with ID 1 no longer exists in the backend
		self.assertEqual(Issue.objects.filter(id=1).exists(), False)

		# Attempt to approve multiple issues
		# At this point, the issues should have IDs of 2-13
		request = factory.post('/issue_approval/', {'user':currUser,'issues_to_modify':'2-4,6'})
		force_authenticate(request, user=currUser)
		response = view(request)

		# Verify that issues 2-4 and 6 do not exist in the backend anymore
		self.assertEqual(Issue.objects.filter(id=2).exists(), False)
		self.assertEqual(Issue.objects.filter(id=3).exists(), False)
		self.assertEqual(Issue.objects.filter(id=4).exists(), False)
		self.assertEqual(Issue.objects.filter(id=6).exists(), False)


	# Verify that students cannot approve issues
	def test_that_student_cannot_approve_issues(self):

		# Grab a student user
		currUser = User.objects.get(id=1)

		# Instantiate the view that we want to test
		view = views.IssueApprovalAPIView.as_view()

		# Set up the API request factory
		factory = APIRequestFactory()

		# Attempt to approve issues as the student
		request = factory.post('/issue_approval/', {'user':currUser,'issues_to_modify':'5'})
		force_authenticate(request, user=currUser)
		response = view(request)

		# This should return a 404
		self.assertEqual(response.status_code, 404)

		# The issue with ID 5 should still exist
		self.assertEqual(Issue.objects.filter(id=5).exists(), True)


	# Verify that instructors can reject issues
	def test_that_instructor_can_reject_issues(self):

		# Grab an instructor user
		currUser = User.objects.get(id=5)

		# Instantiate the view that we want to test
		view = views.IssueRejectionAPIView.as_view()

		# Set up the API request factory
		factory = APIRequestFactory()

		# Attempt to remove a single issue
		# At this point, the issues should have IDs of 7-12
		request = factory.post('/issue_rejection/', {'user':currUser,'issues_to_modify':'5'})
		force_authenticate(request, user=currUser)
		response = view(request)

		# This should return a 200 because the instructor is able to resolve issues
		self.assertEqual(response.status_code, 200)
		# Verify the response's msaage and completed fields
		response_json = json.loads(response.render().content.decode("utf-8"))
		self.assertEqual(response_json['message'], "Issues have been rejected!")
		self.assertEqual(response_json['completed'], True)

		# Verify that the issue with ID 5 no longer exists in the backend
		self.assertEqual(Issue.objects.filter(id=5).exists(), False)

		# Attempt to reject multiple issues
		# At this point, the only issue remaining should have ID 11
		request = factory.post('/issue_rejection/', {'user':currUser,'issues_to_modify':'7-10,12'})
		force_authenticate(request, user=currUser)
		response = view(request)

		# Verify that issues 7-10 and 12 do not exist in the backend anymore
		self.assertEqual(Issue.objects.filter(id=7).exists(), False)
		self.assertEqual(Issue.objects.filter(id=8).exists(), False)
		self.assertEqual(Issue.objects.filter(id=9).exists(), False)
		self.assertEqual(Issue.objects.filter(id=10).exists(), False)		
		self.assertEqual(Issue.objects.filter(id=12).exists(), False)


	# Verify that students cannot reject issues
	def test_that_student_cannot_reject_issues(self):

		# Grab a student user
		currUser = User.objects.get(id=1)

		# Instantiate the view that we want to test
		view = views.IssueRejectionAPIView.as_view()

		# Set up the API request factory
		factory = APIRequestFactory()

		# Attempt to approve issues as the student
		request = factory.post('/issue_rejection/', {'user':currUser,'issues_to_modify':'11'})
		force_authenticate(request, user=currUser)
		response = view(request)

		# This should return a 404
		self.assertEqual(response.status_code, 404)

		# The issue with ID 11 should still exist
		self.assertEqual(Issue.objects.filter(id=11).exists(), True)