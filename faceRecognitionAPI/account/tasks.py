from canvasapi import Canvas
from celery import shared_task
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404

from account.models import CanvasToken, Instructor


@shared_task
def newCanvasToken(data, id, API_URL, canvas_user):
    user = get_object_or_404(User, id=id)
    if not CanvasToken.objects.filter(user=user).exists():
        canvas_token = CanvasToken(
            accessToken=data["access_token"],
            refreshToken=data["refresh_token"],
            expires=data["expires_in"],
            user=user
        )
        canvas_token.save()
        if isTeacher(API_URL, canvas_token.accessToken):
            instructor = Instructor(canvasId=canvas_user, user=user)
            instructor.save()
    else:
        canvas_token = get_object_or_404(CanvasToken, user=user)
        canvas_token.accessToken = data["access_token"]
        canvas_token.refreshToken = data["refresh_token"]
        canvas_token.expires = data["expires_in"]
        canvas_token.save()


@shared_task
def isTeacher(API_URL, access_token):
    """
    Verify is user is instructor or student
    :return:True or False
    """
    canvas = Canvas(API_URL, access_token)
    type_list = ['teacher', 'ta']
    user = canvas.get_current_user()
    courses = user.get_courses()
    for course in courses:
        usersInCourse = course.get_users(enrollment_type=type_list)
        for u in usersInCourse:
            if u.id == user.id:
                return True
    return False
