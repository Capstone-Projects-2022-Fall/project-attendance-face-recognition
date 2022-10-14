from django.db import models
from account.models import UserInfo


# Create your models here.


class Course(models.Model):
    canvasId = models.CharField(max_length=50, unique=True, null=False)
    title = models.CharField(max_length=250, null=False, blank=False)
    subject = models.CharField(max_length=50, null=False, blank=False)
    course_number = models.CharField(max_length=10, null=False, blank=False)

    def _shortName(self):
        return '%s %s' % (self.subject, self.course_number)

    def __str__(self):
        return self.title

'''
class Section(models.Model):
    number = models.CharField(max_length=10, null=False, blank=False)
    capacity = models.IntegerField(default=0)
    seat_taken = models.IntegerField(default=0)
    semester = models.CharField(max_length=50, null=False, blank=False)
    year = models.CharField(max_length=5, null=False, blank=False)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    instructor = models.ForeignKey(UserInfo, on_delete=models.CASCADE, null=True, blank=True)
    students = models.ManyToManyField(UserInfo)

    def __str__(self):
        return self.number


class Schedule(models.Model):
    weekday = models.IntegerField(null=False, blank=False)
    start_time = models.TimeField(null=False, blank=False)
    end_time = models.TimeField(null=False, blank=False)
    section = models.ForeignKey(Section, null=False, on_delete=models.CASCADE)

    def dayOfWeek(self):
        if self.weekday == 0:
            return "Sunday"
        elif self.weekday == 1:
            return "Monday"
        elif self.weekday == 2:
            return "Tuesday"
        elif self.weekday == 3:
            return "Wednesday"
        elif self.weekday == 4:
            return "Thursday"
        elif self.weekday == 5:
            return "Friday"
        else:
            return "Saturday"

    def __str__(self):
        return self.dayOfWeek()
'''