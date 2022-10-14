from django.contrib import admin
from account.models import UserInfo, CanvasToken


# Register your models here.
@admin.register(UserInfo)
class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'avatar', 'canvasId')
    search_fields = ('canvasId',)


@admin.register(CanvasToken)
class CanvasTokenAdmin(admin.ModelAdmin):
    list_display = ("id", "accessToken", "refreshToken", "expires", "created", "is_valid", "user")