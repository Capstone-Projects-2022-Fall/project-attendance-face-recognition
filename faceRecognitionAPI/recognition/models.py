from django.db import models
from account.models import Student


class StudentImage(models.Model):
    """
    All student images
    """
    image = models.FileField(upload_to="dataset/", null=False)
    encoding = models.TextField(null=True)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)

    def __str__(self):
        return self.image.name
