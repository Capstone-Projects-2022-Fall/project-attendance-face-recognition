from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from course import views

urlpatterns = [
    path('courses/current/', views.userCurrentClassAPIView.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)