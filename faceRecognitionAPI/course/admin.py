from django.contrib import admin
from course.models import Course, Section, Schedule


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('id', 'canvasId', 'name', 'course_number', 'start_date', 'end_date')
    search_fields = ('canvasId', 'name')


@admin.register(Section)
class SectionAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'course', 'instructor')
    list_filter = ('id', 'name')
    search_fields = ('canvasId', 'name')


@admin.register(Schedule)
class ScheduleAdmin(admin.ModelAdmin):
    list_display = ('id', 'weekday', 'start_time', 'end_time','section')