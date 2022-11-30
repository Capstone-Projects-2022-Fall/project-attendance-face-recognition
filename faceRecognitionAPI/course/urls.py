from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from course import views

urlpatterns = [
    path('courses/', views.SetupCourseAPIView.as_view()),
    path('canvas_sync/', views.SyncWithCanvasAPIView.as_view()),
    path('courses/<int:pk>/', views.SetupCourseDetailAPIView.as_view()),
    path('canvas/courses/', views.CanvasActiveCoursesAPIView.as_view()),
    path('canvas/<int:id>/sections/', views.CanvasActiveSectionsAPIView.as_view()),
    path('section/schedule/', views.SectionSettingAndScheduleAPIView.as_view()),
    path('schedule/<int:id>/', views.ScheduleDetailAPIView.as_view()),
    path('sections/<int:id>/', views.SectionDetailAPIView.as_view()),
    path('section/<int:id>/', views.SectionInfoAPIView.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
