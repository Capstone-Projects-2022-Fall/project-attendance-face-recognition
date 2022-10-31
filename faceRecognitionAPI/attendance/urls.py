from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from attendance import views

urlpatterns = [
    path('issues/', views.StudentIssuesAPIView.as_view()),
    path('issues/admin/', views.TeacherIssuesAPIView.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)