from rest_framework import serializers
from recognition.models import StudentImage


class StudentImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentImage
        fields = ('id','imageFile','student')
