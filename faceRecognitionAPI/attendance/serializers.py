from rest_framework import serializers
from attendance.models import Issue


class IssueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Issue
        fields = '__all__'
