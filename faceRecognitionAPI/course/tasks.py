from celery import shared_task
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404

from attendance.services.canvasUtils import CanvasUtils
from course.models import Section, AttendanceSetting


@shared_task
def sectionSettingTask(id, duration):
    section = get_object_or_404(Section, id=id)
    attendanceSetting = AttendanceSetting(section=section, duration=duration)
    attendanceSetting.save()
    createAssignmentTask.delay(section.instructor.user.id, section.id)


@shared_task
def createAssignmentTask(user_id, section_id):
    user = get_object_or_404(User, id=user_id)
    canvas = CanvasUtils()
    canvas.createAttendanceAssignment(user, section_id)


@shared_task
def retrievingStudentToSectionTask(user_id, section_canvas_id):
    user = get_object_or_404(User, id=user_id)
    canvas = CanvasUtils()
    canvas.registeringStudentToSection(user, section_canvas_id)