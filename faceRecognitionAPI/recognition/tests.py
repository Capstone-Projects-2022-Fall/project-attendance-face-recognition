from django.test import TestCase
from django.contrib.auth.models import User
from account.models import Student, Instructor
from rest_framework.test import APIRequestFactory
from rest_framework.test import force_authenticate
from recognition import views
from recognition.models import StudentImage
from course.models import Course, Section, Schedule
from datetime import date, timedelta, time, datetime
import json
import os

class RegistrationViewAPITest(TestCase):
	@classmethod
	def setUpTestData(cls):
		# Set up a student user
		User.objects.create(username="TestStudent", first_name="Shivani", last_name="Patel",
			                password="TestPassword1", email="TestStudent@gmail.com")

		# Set up an instructor user
		User.objects.create(username="TestTeacher", first_name="Ian", last_name="Applebaum",
			                password="TestPassword2", email="TestInstructor@gmail.com")

		# Set up the student and instructor
		Student.objects.create(canvasId=1, user=User.objects.get(id=1))
		Instructor.objects.create(canvasId=2, user=User.objects.get(id=2))

		# Set up a course - this is needed for recognize_image
		# Set the start date to today and the end date to tomorrow - this guarantees
		# that the course is always active when the test is run
		Course.objects.create(canvasId=1, name="Test Course", course_number=4398,
			                  start_date=date.today(), end_date=date.today()+timedelta(days=1))

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

		# Upload the student's registration images
		# Grab the user we created for the student
		currUser = User.objects.get(id=1)

		# Instantiate the view that we need to upload images
		view = views.ImageTrainingAPIView.as_view()

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


	# Verify that images are encoded when they are uploaded
	def test_that_student_image_is_encoded(self):
		# Grab the user we created for the student
		currUser = User.objects.get(id=1)

		# Verify that four student images were uploaded in the backend and are associated with the proper user
		self.assertEqual(StudentImage.objects.filter(student__user=currUser).exists(), True)
		# Verify that 4 images were uploaded
		self.assertEqual(len(StudentImage.objects.filter(student__user=currUser)), 4)

		# Verify that each image has an associated encoding
		images = StudentImage.objects.filter(student__user=currUser)
		for image in images:
			self.assertEqual(image.encoding != None, True)


	# Verify that a student is recognized when they upload an image that matches a student in the database.
	def test_that_correct_student_is_recognized(self):
		# Grab the user we created for the student
		currUser = User.objects.get(id=1)

		# Set up the API request factory
		factory = APIRequestFactory()

		# Instantiate the view that we need to recognize images
		view = views.RecognizeImageAPIView.as_view()

		# Attempt to recognize the student with the last image of them
		with open(os.path.join(os.path.dirname(__file__), '../test_images/image_to_recognize.jpeg'), "rb") as image_data:
			request = factory.post('/recognition/', {'user':currUser, 'image': image_data}, format='multipart')
			force_authenticate(request, user=currUser)
			response = view(request)

			# If the user was found the response code should be 200
			self.assertEqual(response.status_code, 200)

			# Convert the response to JSON
			response_json = json.loads(response.render().content.decode("utf-8"))

			# Get the user that was returned
			response_user = response_json['user']

			# If the user was found the response should give the user that uploaded the image
			self.assertEqual(response_user['first_name'], currUser.first_name)
			self.assertEqual(response_user['last_name'], currUser.last_name)
			self.assertEqual(response_user['username'], currUser.username)
			self.assertEqual(response_user['email'], currUser.email)


	# Verify that a student is not recognized when they upload an image that does not match a student in the database.
	def test_that_student_not_in_class_is_not_recognized(self):

		# Grab the user we created for the student
		currUser = User.objects.get(id=1)

		# Set up the API request factory
		factory = APIRequestFactory()

		# Instantiate the view that we need to recognize images
		view = views.RecognizeImageAPIView.as_view()

		# Attempt to recognize the student with an image that is not a student in the class
		with open(os.path.join(os.path.dirname(__file__), '../test_images/image_to_not_recognize.JPG'), "rb") as image_data:
			request = factory.post('/recognition/', {'user':currUser, 'image': image_data}, format='multipart')
			force_authenticate(request, user=currUser)
			response = view(request)

			# The user should not be found, so the response code should be 404
			self.assertEqual(response.status_code, 404)


	# Verify that a student is not recognized when they upload an image that does match a student in the database,
	# but is not ofo the student that uploaded the image
	def test_that_mismatched_student_is_not_recognized(self):

		# Grab the user we created for the instructor
		currUser = User.objects.get(id=2)

		# Set up the API request factory
		factory = APIRequestFactory()

		# Instantiate the view that we need to recognize images
		view = views.RecognizeImageAPIView.as_view()

		# Attempt to recognize the student with an image that is a different student
		with open(os.path.join(os.path.dirname(__file__), '../test_images/image_to_recognize.jpeg'), "rb") as image_data:
			request = factory.post('/recognition/', {'user':currUser, 'image': image_data}, format='multipart')
			force_authenticate(request, user=currUser)
			response = view(request)

			# A user should have been found, but it should not be the correct user. The response should be 400
			
			# The response's user field should be None
			response_json = json.loads(response.render().content.decode("utf-8"))
			print(response_json)			

			self.assertEqual(response.status_code, 400)

			# The response's user field should be None
			response_json = json.loads(response.render().content.decode("utf-8"))
			self.assertEqual(response_json['user'], None)


	# Verify that the student's images are returned when the get method is called,
	# and that if no images exist for a user nothing is returned
	def test_ability_to_get_student_images(self):

		# Grab the user we created for the student
		currUser = User.objects.get(id=1)

		# Instantiate the view that we need to upload images
		view = views.ImageTrainingAPIView.as_view()

		# Set up the API request factory
		factory = APIRequestFactory()

		# Request the uploaded images for the user
		request = factory.get('/registration/', {'user':currUser}, format='multipart')
		force_authenticate(request, user=currUser)
		response = view(request)

		# The pictures should be found, so the response code should be 200
		self.assertEqual(response.status_code, 200)

		# Convert the response to JSON
		response_json = json.loads(response.render().content.decode("utf-8"))

		# There should be four pictures found for the student
		self.assertEqual(len(response_json), 4)

		# Each picture should return an ID that matches the current user's ID
		for image in response_json:
			self.assertEqual(image['student'], currUser.id)


	# Verify that the get method does not return any images for a user that does
	# not have any uploaded
	def test_ability_to_get_student_images_if_empty_set(self):

		# Request the uploaded images for a user that didn't upload any
		# Grab the user we created for the instructor
		currUser = User.objects.get(id=2)

		# Instantiate the view that we need to upload images
		view = views.ImageTrainingAPIView.as_view()

		# Set up the API request factory
		factory = APIRequestFactory()

		# Request the uploaded images for the user
		request = factory.get('/registration/', {'user':currUser}, format='multipart')
		force_authenticate(request, user=currUser)
		response = view(request)

		# No pictures should be found, but the response code should still be 200
		self.assertEqual(response.status_code, 200)

		# Convert the response to JSON
		response_json = json.loads(response.render().content.decode("utf-8"))

		# Verify that no images were returned
		self.assertEqual(response_json, [])
