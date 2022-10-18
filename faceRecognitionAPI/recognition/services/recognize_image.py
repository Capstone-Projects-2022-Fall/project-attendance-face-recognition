import json
from imutils import paths
import face_recognition
import cv2
import os
from recognition.models import StudentImage
import numpy as np
from course.services.schedule import currentCourse


def recognize_image(upload_image, user):
    print(upload_image)
    img = cv2.imdecode(np.fromstring(upload_image.read(), np.uint8), cv2.IMREAD_UNCHANGED)
    students = currentCourse(user)[1].students.all()
    students_ids = [student.id for student in students]
    studentImages = StudentImage.objects.filter(student__in=students_ids)
    data = {"encodings": [], "students": []}
    for image in studentImages:
        data["encodings"].append(np.asarray(json.loads(image.encoding))[0])
        data["students"].append(image.student.id)

    print(data["encodings"])
    rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    boxes = face_recognition.face_locations(rgb, model="hog")
    # compute the facial embedding for the face
    encodings = face_recognition.face_encodings(rgb, boxes)
    # loop over the facial embeddings
    studentId = None
    for encoding in encodings:
        matches = face_recognition.compare_faces(data["encodings"], encoding)
        # print(matches)
        # check to see if we have found a match
        if True in matches:
            matchedIdxs = [i for (i, b) in enumerate(matches) if b]
            counts = {}
            for i in matchedIdxs:
                print(data["students"])
                studentId = data["students"][i]
                counts[studentId] = counts.get(studentId, 0) + 1
            studentId = max(counts, key=counts.get)
    return {"id": studentId}