from fer import FER
import cv2 as cv
import numpy as np


def detectUserEmotion(upload_image):
    """
    return most dominant emotion
    """
    np_array = np.fromstring(upload_image.read(), dtype=np.uint8)
    img = cv.imdecode(np_array, cv.IMREAD_UNCHANGED)
    emotion_detector = FER(mtcnn=True)
    dominant_emotion, emotion_score = emotion_detector.top_emotion(img)
    print(dominant_emotion, emotion_score)
    return dominant_emotion

