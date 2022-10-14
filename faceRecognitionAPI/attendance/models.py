from django.db import models
from django.contrib.auth.models import User
from datetime import datetime, timedelta
from course.models import Section


class Attendance(models.Model):
    """
    Attendance object
    """
    recorded = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=250, default="Absent")
    section = models.ForeignKey(Section, on_delete=models.CASCADE)

    def __str__(self):
        return self.status