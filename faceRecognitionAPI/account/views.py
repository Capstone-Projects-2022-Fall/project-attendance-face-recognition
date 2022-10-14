from django.shortcuts import render
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from attendance.views import BaseView
from account.models import UserInfo


class UserInfoAPIView(BaseView):
    def get(self, request):
        user = self.request.user
        print(user)
        profile = get_object_or_404(UserInfo, user=user)
        return Response({
            "sis_id": profile.sisId,
            "canvas_id": profile.canvasId,
            "avatar": profile.avatar,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "username": user.username
        })