from datetime import date

from attendance.models import Attendance
from course.models import Section


def attendanceSummary(instructor):
    """
    Generate report for each month
    """
    present = numberAttendanceStatusSummary(instructor, "Present")
    absent = numberAttendanceStatusSummary(instructor, "Absent")
    late = numberAttendanceStatusSummary(instructor, "Late")
    return ({
        "present": present,
        "late": late,
        "absent": absent
    })


def numberAttendanceStatusSummary(instructor, status):
    statusValue = []
    months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October",
              "November", "December"]
    for m in months:
        num = {}
        attendancePresent = Attendance.objects.filter(section__instructor=instructor,
                                                      section__course__end_date__gte=date.today(), status=status,
                                                      recordedDate__month=(months.index(m) + 1)).count()

        num[m] = attendancePresent
        statusValue.append(attendancePresent)
    return statusValue


def studentPerSection(instructor):
    """
    number of students per section
    """
    sections = Section.objects.filter(instructor=instructor)
    sectionValue = {}
    for section in sections:
        sectionValue[section.name] = section.students.count()

    return sectionValue
