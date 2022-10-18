from datetime import datetime, timedelta
from django.utils import timezone
from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token


class Student(models.Model):
    """
    Student object
    """
    canvasId = models.CharField(max_length=50, unique=True, null=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.email


class Instructor(models.Model):
    """
    Instructor object
    """
    canvasId = models.CharField(max_length=50, unique=True, null=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.email


class CanvasToken(models.Model):
    """
    user canvas access token
    """
    accessToken = models.CharField(max_length=250, null=False, blank=True)
    refreshToken = models.CharField(max_length=250, null=False, blank=True)
    expires = models.IntegerField(null=False)
    created = models.DateTimeField(auto_now=True, null=True)
    user = models.OneToOneField(User,null=True, on_delete=models.CASCADE)

    def is_valid(self):
        """
        Verify if token is valid
        :return: True if valid, False otherwise
        """
        now = timezone.now()
        expired_time = self.created + timedelta(seconds=self.expires)
        if now < expired_time:
            return True
        return False