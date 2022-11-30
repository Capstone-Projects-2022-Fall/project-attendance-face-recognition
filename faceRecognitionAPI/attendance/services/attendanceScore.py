from attendance.models import Attendance


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
        elif attendances.status == "Late":
            late = late + 4
    total = present + late
    avg = total/count
    return avg * 20
