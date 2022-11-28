from celery import shared_task
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404

from account.models import CanvasToken


@shared_task
def testPrint():
    print("hello")


@shared_task
def newCanvasToken(data, id):
    user = get_object_or_404(User, id=id)
    if not CanvasToken.objects.filter(user=user).exists():
        canvas_token = CanvasToken(
            accessToken=data["access_token"],
            refreshToken=data["refresh_token"],
            expires=data["expires_in"],
            user=user.id
        )
        canvas_token.save()
    else:
        canvasToken = get_object_or_404(CanvasToken, user=user)
        canvasToken.accessToken = data["access_token"]
        canvasToken.refreshToken = data["refresh_token"]
        canvasToken.expires = data["expires_in"]
        canvasToken.save()

