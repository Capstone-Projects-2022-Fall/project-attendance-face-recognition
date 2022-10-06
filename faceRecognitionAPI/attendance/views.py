from django.shortcuts import render
from rest_framework import status, parsers
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from django.shortcuts import get_object_or_404
from attendance.services.canvasUtils import CanvasUtils


class BaseView(APIView):
    authentication_classes = [
        TokenAuthentication,
    ]


class GenerateTokenAPIView(APIView):
    """
    Generate user token
    """
    parser_classes = [parsers.FormParser, parsers.JSONParser, parsers.MultiPartParser]

    def post(self, request):
        data = request.data
        canvas = CanvasUtils()
        user = canvas.getUserAndCanvasToken(data["canvas_code"])

        token = Token.objects.get_or_create(user=user)

        return Response(
            {
                "access_token": token[0].key,
            },
            status=status.HTTP_200_OK
        )


class UserAPIView(BaseView):

    def get(self, request):
        user = self.request.user
        return Response(
            {
                "name": user.first_name
            }
        )
