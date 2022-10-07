from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from recognition import views

urlpatterns = [
    path('encoding/', views.ImageEncodingAPIView.as_view()),
    path('authenticate/', views.TestRecognizeImageAPIView.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)