import cv2
import numpy as np
from django.shortcuts import render
from rest_framework import status, parsers
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView

from recognition.services.encode_face import encode_student_face
from recognition.services.recognize_image import recognize_image

from django.contrib.auth.models import User
from recognition.models import StudentImage
from account.models import Student

from recognition.serializers import StudentImageSerializer
from account.serializers import UserSerializer


class ImageTrainingAPIView(APIView):
    """
    View saved or Encode student images
    """
    permission_classes = [IsAuthenticated]
    parser_classes = [parsers.FormParser, parsers.JSONParser, parsers.MultiPartParser]

    def get(self, request):
        studentImage = StudentImage.objects.filter(student__user=self.request.user)
        return Response(
            StudentImageSerializer(studentImage, many=True).data,
            status=status.HTTP_200_OK
        )

    def post(self, request):
        user = self.request.user
        data = request.FILES['imageFile']
        # img = cv2.imdecode(np.fromstring(data.read(), np.uint8), cv2.IMREAD_UNCHANGED)
        image = encode_student_face(user, data)
        return Response({
            "file": image
        },
            status=status.HTTP_200_OK
        )


class RecognizeImageAPIView(APIView):
    """
    recognize student images
    """
    parser_classes = [parsers.FormParser, parsers.JSONParser, parsers.MultiPartParser]

    def post(self, request):
        data = request.FILES['image']
        print(request.FILES)
        id = recognize_image(data, self.request.user)
        student = get_object_or_404(Student, id=id["id"])
        if student.user == self.request.user:
            return Response({
                "user": UserSerializer(student.user).data
            },
                status=status.HTTP_200_OK
            )
        else:
            return Response({
                "user": None
            })
