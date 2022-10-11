from django.db import models
from django.contrib.auth.models import User


class StudentImage(models.Model):
    """
    All student images
    """
    image = models.FileField(upload_to="dataset/", null=False)
    encoding = models.TextField(null=True)
    student = models.ForeignKey(User, on_delete=models.CASCADE)
