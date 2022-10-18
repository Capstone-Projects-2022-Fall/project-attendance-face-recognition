from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from account import views

urlpatterns = [
    path('token/', views.GenerateTokenAPIView.as_view()),
    path('', views.InitialInfoAPIView.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
