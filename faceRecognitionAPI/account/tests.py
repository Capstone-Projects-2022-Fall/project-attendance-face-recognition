from django.test import TestCase

from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from account.models import Student, Instructor, CanvasToken

import time

class StudentModelTest(TestCase):
  @classmethod
  def setUpTestData(cls):
    # Set up a student user
    User.objects.create(username="TestStudent", first_name="Timmy", last_name="Turner", password="TestPassword1", email="TestStudent@gmail.com")

    # Set up a teacher user
    User.objects.create(username="TestTeacher", first_name="Cosmo", last_name="Wanda", password="TestPassword2", email="TestTeacher@gmail.com")

    # set up non-modified objects used by all test methods
    Student.objects.create(canvasId=13, user=User.objects.get(id=1))
    Instructor.objects.create(canvasId=42, user=User.objects.get(id=2))
    CanvasToken.objects.create(accessToken=12345678, refreshToken=10101010,expires=10,user=User.objects.get(id=1))

  # Ensure that the student's canvas ID was initialized properly
  def test_student_canvas_id_label(self):
    student = Student.objects.get(id=1)
    student_max_length = student._meta.get_field('canvasId').max_length
    self.assertEqual(student_max_length, 50)

  # Ensure that the instructor's canvas ID was initialized properly
  def test_instructor_canvas_id_label(self):
    instructor = Instructor.objects.get(id=1)
    instructor_max_length = instructor._meta.get_field('canvasId').max_length
    self.assertEqual(instructor_max_length, 50)

  # Ensure that the student inherited the User class properly
  def test_student_class_inheritance(self):
    student = Student.objects.get(id=1)
    self.assertEqual(student.user.username, "TestStudent")
    self.assertEqual(student.user.first_name, "Timmy")
    self.assertEqual(student.user.last_name, "Turner")
    self.assertEqual(student.user.password, "TestPassword1")
    self.assertEqual(student.user.email, "TestStudent@gmail.com")

  # Ensure that the instructor inherited the User class properly
  def test_instructor_class_inheritance(self):
    instructor = Instructor.objects.get(id=1)
    self.assertEqual(instructor.user.username, "TestTeacher")
    self.assertEqual(instructor.user.first_name, "Cosmo")
    self.assertEqual(instructor.user.last_name, "Wanda")
    self.assertEqual(instructor.user.password, "TestPassword2")
    self.assertEqual(instructor.user.email, "TestTeacher@gmail.com")

  # Verify the string representation of the student
  def test_student_str_representation(self):
    student = Student.objects.get(id=1)
    self.assertEqual(str(student), "TestStudent@gmail.com")

  # Verify the string representation of the instructor
  def test_instructor_str_representation(self):
    instructor = Instructor.objects.get(id=1)
    self.assertEqual(str(instructor), "TestTeacher@gmail.com")

  # Ensure that the token's accessToken field was initialized properly
  def test_canvas_token_access_token_label(self):
    canvas_token = CanvasToken.objects.get(id=1)
    access_token_max_length = canvas_token._meta.get_field('accessToken').max_length
    self.assertEqual(access_token_max_length, 250)

  # Ensure that the token's refreshToken field was initialized properly
  def test_canvas_token_refresh_token_label(self):
    canvas_token = CanvasToken.objects.get(id=1)
    refresh_token_max_length = canvas_token._meta.get_field('refreshToken').max_length

  # Ensure that the token inherited the User class properly
  def test_canvas_token_class_inheritance(self):
    canvas_token = CanvasToken.objects.get(id=1)
    self.assertEqual(canvas_token.user.username, "TestStudent")
    self.assertEqual(canvas_token.user.first_name, "Timmy")
    self.assertEqual(canvas_token.user.last_name, "Turner")
    self.assertEqual(canvas_token.user.password, "TestPassword1")
    self.assertEqual(canvas_token.user.email, "TestStudent@gmail.com")

  # Ensure that the token remains valid for the specified amount of time
  def test_token_validity(self):
    canvas_token = CanvasToken.objects.get(id=1)
    # The token has just been created and it is configured to be valid for 10 seconds. So
    # it should be valid now
    self.assertEqual(canvas_token.is_valid(), True)
    # The token should still be valid after 5 seconds have passed
    time.sleep(5)
    self.assertEqual(canvas_token.is_valid(), True)
    # However, it should be invalid after 15 seconds have passed
    time.sleep(10)
    self.assertEqual(canvas_token.is_valid(), False)
