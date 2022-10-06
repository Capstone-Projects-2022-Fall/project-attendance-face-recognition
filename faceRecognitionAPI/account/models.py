from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token


# Create your models here.
class UserInfo(models.Model):
    canvasId = models.CharField(max_length=50, unique=True, null=False)
    avatar = models.CharField(max_length=250, null=True, blank=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.email

"""
class Student(models.Model):
    canvasId = models.CharField(max_length=50, unique=True, null=False)
    avatar = models.CharField(max_length=250, null=True, blank=True)
    name = models.CharField(max_length=250, null=False, blank=False)
    # email = models.CharField(max_length=250, null=True, blank=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Instructor(models.Model):
    canvasId = models.CharField(max_length=50, unique=True, null=False)
    avatar = models.CharField(max_length=250, null=True, blank=True)
    name = models.CharField(max_length=250, null=False, blank=False)
    # email = models.CharField(max_length=250, null=True, blank=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
"""

"""
@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)"""