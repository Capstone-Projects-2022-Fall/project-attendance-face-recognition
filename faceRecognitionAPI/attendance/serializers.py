from rest_framework import serializers
from attendance.models import Issue, Attendance


class IssueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Issue
        fields = '__all__'


class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = ('id', 'studentName', 'recordedDate', 'recordedTime', 'status', 'displaySection','displayCourse')
