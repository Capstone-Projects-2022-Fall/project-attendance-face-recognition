from celery import shared_task
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404

from attendance.models import Attendance
from attendance.services.canvasUtils import CanvasUtils


@shared_task
def updateCanvasAttendanceTask(user_id, attendance_id):
    user = get_object_or_404(User, id=user_id)
    attendance = get_object_or_404(Attendance, id=attendance_id)
    canvas = CanvasUtils()
    canvas.updateStudentAssignmentScore(user, attendance)