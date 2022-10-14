from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from account import views

urlpatterns = [
    path('user/', views.UserInfoAPIView.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)