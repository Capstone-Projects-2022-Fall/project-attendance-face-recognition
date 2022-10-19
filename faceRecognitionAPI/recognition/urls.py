from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from recognition import views

urlpatterns = [
    path('registration/', views.ImageTrainingAPIView.as_view()),
    path('recognition/', views.RecognizeImageAPIView.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)