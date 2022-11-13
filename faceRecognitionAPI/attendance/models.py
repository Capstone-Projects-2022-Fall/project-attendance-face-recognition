from django.db import models
from django.contrib.auth.models import User
from datetime import datetime, timedelta
from course.models import Section
from account.models import Student


class Issue(models.Model):
    """
    student issues
    """
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    section = models.ForeignKey(Section, on_delete=models.CASCADE)
    status = models.BooleanField(default=False, null=False)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
    subject = models.CharField(max_length=500, null=True)
    message = models.TextField(null=True)

    def __str__(self):
        return self.subject


class Attendance(models.Model):
    """
    Attendance object
    """
    recordedDate = models.DateField(auto_now=True)
    recordedTime = models.TimeField(auto_now=True)
    status = models.CharField(max_length=250, default="Absent")
    section = models.ForeignKey(Section, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE, null=True)

    @property
    def studentName(self):
        return "{}, {}".format(self.student.user.last_name, self.student.user.first_name)

    @property
    def displayCourse(self):
        return self.section.course.name

    @property
    def displaySection(self):
        return self.section.name

    def __str__(self):
        return self.status