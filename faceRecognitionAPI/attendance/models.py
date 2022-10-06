from django.db import models
from django.contrib.auth.models import User
from datetime import datetime, timedelta
from django.utils import timezone


# Create your models here.
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
        if now > expired_time:
            return True
        return False