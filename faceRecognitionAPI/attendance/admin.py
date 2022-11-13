from django.contrib import admin
from attendance.models import Issue, Attendance

# Register your models here.
@admin.register(Issue)
class IssueAdmin(admin.ModelAdmin):
    list_display = ('id', 'student', 'section', 'status', 'created', 'modified', 'subject', 'message')


@admin.register(Attendance)
class AttendanceAdmin(admin.ModelAdmin):
    list_display = ("id", 'student', 'recordedDate','recordedTime', 'status', 'section')
