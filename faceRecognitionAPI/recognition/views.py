import cv2
import numpy as np
from django.shortcuts import render
from rest_framework import status, parsers
from rest_framework.response import Response
from attendance.views import BaseView
from recognition.services.encode_face import encode_student_face
from django.contrib.auth.models import User
from recognition.services.recognize_image import recognize_image
from django.shortcuts import get_object_or_404


class ImageEncodingAPIView(BaseView):
    """
    Encode student images
    """
    parser_classes = [parsers.FormParser, parsers.JSONParser, parsers.MultiPartParser]

    def post(self, request):
        user = self.request.user
        data = request.FILES['image']
        # img = cv2.imdecode(np.fromstring(data.read(), np.uint8), cv2.IMREAD_UNCHANGED)
        image = encode_student_face(user, data)
        return Response({
            "file": image
        },
            status=status.HTTP_200_OK
        )


class TestRecognizeImageAPIView(BaseView):
    """
    recognize student images
    """
    parser_classes = [parsers.FormParser, parsers.JSONParser, parsers.MultiPartParser]

    def post(self, request):
        user = self.request.user
        data = request.FILES['image']
        id = recognize_image(data)
        email = get_object_or_404(User, id=id["id"]).email
        return Response({
            "user": email
        },
            status=status.HTTP_200_OK
        )
