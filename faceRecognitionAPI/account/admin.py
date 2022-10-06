from django.contrib import admin
from account.models import UserInfo


# Register your models here.
@admin.register(UserInfo)
class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'avatar', 'canvasId')
    search_fields = ('canvasId',)
