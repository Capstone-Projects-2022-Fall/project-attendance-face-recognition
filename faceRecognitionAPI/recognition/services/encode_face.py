import json
from django.shortcuts import get_object_or_404
from imutils import paths
import face_recognition
import cv2
import os
from recognition.models import StudentImage
from account.models import Student
import numpy as np


class NpEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.integer):
            return int(obj)
        if isinstance(obj, np.floating):
            return float(obj)
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        return json.JSONEncoder.default(self, obj)

def encode_student_face(user, upload_image):
    student = get_object_or_404(Student, user=user)
    knownEncodings = []
    studentImage = StudentImage(imageFile=upload_image, student=student)
    studentImage.save()
    # convert image from BGR to dlib ordering RGB
    # TODO make this an environment variable maybe? This really shouldn't have to
    # be linked to anyone's user page since it won't work for anyone else
    image = cv2.imread("/Users/shiv/canvasIntegration/project-attendance-face-recognition/faceRecognitionAPI"+studentImage.imageFile.url)
    rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    # detect the (x, y)-coordinates of the bounding boxes
    # corresponding to each face in the input image
    boxes = face_recognition.face_locations(rgb, model="hog")
    # compute the facial embedding for the face
    encodings = face_recognition.face_encodings(rgb, boxes)
    # loop over the encodings
    for encoding in encodings:
        knownEncodings.append(encoding)
        # test = (json.dumps(knownEncodings, cls=NpEncoder))
        # print(np.asarray(json.loads(test))[0])
        studentImage.encoding = json.dumps(knownEncodings, cls=NpEncoder)
        studentImage.save()
    return studentImage.imageFile.url
