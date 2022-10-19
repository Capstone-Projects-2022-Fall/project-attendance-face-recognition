from course.models import Section
from account.models import Student
from course.models import Schedule

from django.shortcuts import get_object_or_404
from django.db.models import Q

from datetime import datetime


def currentCourse(user):
    """
    Find user's current course based on time
    :param user:
    :return: single course object
    """
    # student = get_object_or_404(Student, user=user)
    current_course = None
    current_section = None
    if Section.objects.filter(Q(students__user=user) | Q(instructor__user=user)).exists():
        sections = Section.objects.filter(Q(students__user=user) | Q(instructor__user=user))
        for section in sections:
            today = datetime.today()
            print(today)
            if section.course.start_date <= today.date() <= section.course.end_date:
                schedules = Schedule.objects.filter(section=section)
                for schedule in schedules:
                    now = datetime.now().time()
                    if schedule.weekday == datetime.today().weekday() and schedule.start_time <= now < schedule.end_time:
                        current_course = section.course
                        current_section = section
    # elif verify if user is taking that class
    return current_course, current_section
