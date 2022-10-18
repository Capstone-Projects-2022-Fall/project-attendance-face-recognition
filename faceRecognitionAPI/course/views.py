from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status, parsers
from django.shortcuts import get_object_or_404
from attendance.services.canvasUtils import CanvasUtils
from rest_framework.views import APIView


class userCurrentClassAPIView(APIView):
    def get(self, request):
        canvas = CanvasUtils()
        course = canvas.getCourseInfo(1, self.request.user)
        print(course)
        return Response({
            "name": course.name
        },
            status=status.HTTP_200_OK
        )