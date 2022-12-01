from datetime import datetime, timedelta, date

from django.shortcuts import get_object_or_404

from attendance.models import Attendance
from course.models import Schedule, AttendanceSetting


def calculateAttendanceScore(section, student):
    """
    Calculate student's attendance score
    """
    present = 0
    late = 0
    attendances = Attendance.objects.filter(student=student, section=section)
    count = attendances.count()
    for attendance in attendances:
        if attendance.status == "Present":
            present = present + 5
        elif attendance.status == "Late":
            late = late + 4
    total = present + late
    avg = total / count
    return avg * 20


def getStatusAttendance(section):
    status = ""
    today = datetime.today()
    now = datetime.now().time()
    attendanceSetting = get_object_or_404(AttendanceSetting, section=section)
    schedules = Schedule.objects.filter(section=section)
    for schedule in schedules:
        if schedule.weekday == today.weekday():
            start_time = schedule.start_time
            end_time = schedule.end_time
            limit_time = datetime.combine(date.today(), start_time) + timedelta(minutes=attendanceSetting.duration)
            if start_time <=now<=limit_time.time():
                status = "Present"
            elif limit_time.time() < now <end_time:
                status = "Late"
            else:
                status = "Absent"

    return status
