from django.db import models
from account.models import Instructor, Student


class Course(models.Model):
    """
    Course object
    """
    canvasId = models.CharField(max_length=50, unique=True, null=False)
    name = models.CharField(max_length=250, null=False, blank=False)
    course_number = models.CharField(max_length=10, null=False, blank=False)
    start_date = models.DateField(null=True)
    end_date = models.DateField(null=True)

    def __str__(self):
        return self.name


class Section(models.Model):
    """
    Section for each course
    """
    name = models.CharField(max_length=10, null=False, blank=False)
    canvasId = models.CharField(max_length=50, null=True)
    # capacity = models.IntegerField(default=0)
    # seat_taken = models.IntegerField(default=0)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    instructor = models.ForeignKey(Instructor, on_delete=models.CASCADE, null=True, blank=True)
    students = models.ManyToManyField(Student, blank=True)

    def __str__(self):
        return self.name


class Schedule(models.Model):
    """
    Section schedule
    """
    weekday = models.IntegerField(null=False, blank=False)
    start_time = models.TimeField(null=False, blank=False)
    end_time = models.TimeField(null=False, blank=False)
    section = models.ForeignKey(Section, null=False, on_delete=models.CASCADE)

    def dayOfWeek(self):
        if self.weekday == 0:
            return "Monday"
        elif self.weekday == 1:
            return "Tuesday"
        elif self.weekday == 2:
            return "Wednesday"
        elif self.weekday == 3:
            return "Thursday"
        elif self.weekday == 4:
            return "Friday"
        elif self.weekday == 5:
            return "Saturday"
        else:
            return "Sunday"

    def __str__(self):
        return self.dayOfWeek()


class AttendanceSetting(models.Model):
    duration = models.IntegerField(default=5)
    assignment = models.BooleanField(default=False)
    section = models.OneToOneField(Section, on_delete=models.CASCADE)

    def __str__(self):
        return "attendance duration for {} is {}".format(self.section.name, self.duration)