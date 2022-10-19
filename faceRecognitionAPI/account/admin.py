from django.contrib import admin
from account.models import Student, Instructor, CanvasToken


# Register your models here.
@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('id', 'canvasId', 'user')
    search_fields = ('canvasId',)


@admin.register(Instructor)
class InstructorAdmin(admin.ModelAdmin):
    list_display = ('id', 'canvasId', 'user')
    search_fields = ('canvasId',)


@admin.register(CanvasToken)
class CanvasTokenAdmin(admin.ModelAdmin):
    list_display = ("id", "accessToken", "refreshToken", "expires", "created", "is_valid", "user")