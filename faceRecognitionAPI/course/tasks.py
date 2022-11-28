from celery import shared_task
from django.shortcuts import get_object_or_404

from course.models import Section, AttendanceSetting


@shared_task
def sectionSettingTask(id, duration):
    section = get_object_or_404(Section, id=id)
    attendanceSetting = AttendanceSetting(section=section, duration=duration)
    attendanceSetting.save()


@shared_task
def createAssignmentTask():
    pass