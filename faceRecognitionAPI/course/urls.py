from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from course import views

urlpatterns = [
    path('courses/canvas/', views.TeacherCanvasCoursesAPIView.as_view()),
    path('courses/', views.SetupCourseAPIView.as_view()),
    path('courses/<int:pk>/', views.SetupCourseDetailAPIView.as_view()),
    path('sections/<int:course>/', views.SetupSectionAPIView.as_view()),
    path('sections/<int:pk>/', views.SetupSectionDetailAPIView.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)