from django.contrib import admin
from attendance.models import CanvasToken

# Register your models here.
@admin.register(CanvasToken)
class CanvasTokenAdmin(admin.ModelAdmin):
    list_display = ("id", "accessToken", "refreshToken", "expires", "created", "user")
