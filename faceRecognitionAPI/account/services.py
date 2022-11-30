from datetime import datetime

from account.models import Student, Instructor
from recognition.models import StudentImage
from course.models import Section

from account.serializers import StudentSerializer

from attendance.models import Issue
from course.models import Schedule


def account_registration_verification(user):
    """
    Verify if user's images has been added to the dataset
    :param user:
    :return: True if found at least 5 images
    """
    if Student.objects.filter(user=user).exists():
        count_images = StudentImage.objects.filter(student__user=user).count()
        if count_images < 5:
            return False
        return True
    elif Instructor.objects.filter(user=user).exists():
        return True
    return False


def retrieve_students_from_sections(instructor):
    sections = Section.objects.filter(instructor=instructor)
    data = []
    for section in sections:
        for student in section.students.all():
            data.append({
                "id": student.id,
                "first_name": student.user.first_name,
                "last_name": student.user.last_name,
                "email": student.user.email,
                "course": section.course.name,
                "section": section.name
            })
    return data


def retrieve_issues_admin(instructor):
    issues = Issue.objects.filter(section__instructor=instructor)
    data = []
    for issue in issues:
        data.append({
            "id": issue.pk,
            "name": issue.student.user.first_name + " " + issue.student.user.last_name,
            "status": "Resolved" if issue.status else "Unresolved",
            "subject": issue.subject,
	    "message": issue.message
        })
    return data


def retrieve_section_schedule(instructor):
    sections = Section.objects.filter(instructor=instructor)
    data =[]
    for section in sections:
        newData = {"id": section.id,"course": section.course.name, "section": section.name, "schedule": ""}
        schedules = Schedule.objects.filter(section=section)
        for schedule in schedules:
            scheduling = "{}:{} to {}; ".format(schedule.dayOfWeek(), schedule.start_time, schedule.end_time)
            newData["schedule"] = "".join([newData["schedule"], scheduling])
        data.append(newData)
    return data

