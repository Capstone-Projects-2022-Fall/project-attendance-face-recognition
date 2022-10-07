import json
from imutils import paths
import face_recognition
import cv2
import os
from recognition.models import StudentImage
import numpy as np


def recognize_image(upload_image):
    print(upload_image)
    img = cv2.imdecode(np.fromstring(upload_image.read(), np.uint8), cv2.IMREAD_UNCHANGED)
    studentImages = StudentImage.objects.all()
    data = {"encodings": [],"students": []}
    for image in studentImages:
        data["encodings"].append(np.asarray(json.loads(image.encoding))[0])
        data["students"].append(image.student.id)

    print(data["encodings"])
    rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    boxes = face_recognition.face_locations(rgb, model="hog")
    # compute the facial embedding for the face
    encodings = face_recognition.face_encodings(rgb, boxes)
    #print(encodings)
    # loop over the facial embeddings
    userId = None
    for encoding in encodings:
        #print(encoding)
        matches = face_recognition.compare_faces(data["encodings"], encoding)
        # print(matches)
        # check to see if we have found a match
        if True in matches:
            matchedIdxs = [i for (i, b) in enumerate(matches) if b]
            counts = {}
            for i in matchedIdxs:
                print(data["students"])
                userId = data["students"][i]
                counts[userId] = counts.get(userId, 0) + 1
            userId = max(counts, key=counts.get)
    return {"id": userId}