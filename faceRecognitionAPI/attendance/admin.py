from django.contrib import admin
from attendance.models import Issue

# Register your models here.
@admin.register(Issue)
class IssueAdmin(admin.ModelAdmin):
    list_display = ('id', 'student', 'section', 'status', 'created', 'modified', 'subject', 'message')

