import environ
import requests
from canvasapi import Canvas
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from attendance.models import CanvasToken
from account.models import UserInfo

from course.models import Course

env = environ.Env(
    DEBUG=(bool, False)
)
environ.Env.read_env()


class CanvasUtils:
    """
    Working with canvas api
    """

    def __init__(self):
        self.API_URL = env("CANVAS_URL")
        self.client_id = env("CANVAS_CLIENTID")
        self.client_secret = env("CANVAS_CLIENT_SECRET")

    def getUserAndCanvasToken(self, canvas_code):
        """
        get new canvas token to access token
        :param canvas_code:
        :return:
        """
        data = {
            "grant_type": "authorization_code",
            "client_id": self.client_id,
            "client_secret": self.client_secret,
            "redirect_uri": env("AFR_URL"),
            "code": canvas_code
        }
        r = requests.post(url=self.API_URL + "/login/oauth2/token", data=data)
        data = r.json()

        # canvas API Key
        access_token = data["access_token"]
        # initialize a new canvas object
        canvas = Canvas(self.API_URL, access_token)
        # get current canvas user
        canvas_user = canvas.get_current_user().get_profile()
        print(canvas_user)

        if User.objects.filter(email=canvas_user["primary_email"]).exists():
            user = get_object_or_404(User, email=canvas_user["primary_email"], username=canvas_user["primary_email"])
        else:
            name = str(canvas_user["sortable_name"]).split(",")
            user = User(username=canvas_user["primary_email"], email=canvas_user["primary_email"],
                        first_name=name[1].strip(),
                        last_name=name[0].strip())
            user.save()
            profile = UserInfo(canvasId=canvas_user["id"], avatar=canvas.get_current_user().get_avatars()[0].url,
                               sisId=canvas_user["sis_user_id"], user=user)
            profile.save()

        if not CanvasToken.objects.filter(user=user).exists():
            canvasToken = CanvasToken(accessToken=data["access_token"], refreshToken=data["refresh_token"],
                                      expires=data["expires_in"], user=user)
            canvasToken.save()
        else:
            canvasToken = get_object_or_404(CanvasToken, user=user)
            canvasToken.accessToken = data["access_token"]
            canvasToken.refreshToken = data["refresh_token"]
            canvasToken.expires = data["expires_in"]
            canvasToken.save()
        return user

    def getCanvasToken(self, user):
        """
        get previous token or refresh token
        :return:
        """
        canvasToken = get_object_or_404(CanvasToken, user=user)
        if not canvasToken:
            data = {
                "grant_type": "refresh_token",
                "client_id": self.client_id,
                "client_secret": self.client_secret,
                "redirect_token": canvasToken.refreshToken
            }
            try:
                r = requests.post(url=self.API_URL + "/login/oauth2/token", data=data)
                data = r.json()
                canvasToken.accessToken = data["access_token"]
                canvasToken.refreshToken = data["refresh_token"]
                canvasToken.expires = data["expires_in"]
                canvasToken.save()
            except:
                print("error getting token")
                return None
        return canvasToken.accessToken

    def deleteCanvasToken(self):
        """
        delete canvas token
        :return:
        """
        pass

    def getCourseInfo(self, canvas_course_id, user):
        """
        Get course info
        :return:
        """
        # canvas API Key
        access_token = self.getCanvasToken(user)
        # initialize a new canvas object
        canvas = Canvas(self.API_URL, access_token)
        course = canvas.get_course(canvas_course_id)
        print(course)
        return course
        # if Course.objects.filter(canvasId=canvas_course_id):
