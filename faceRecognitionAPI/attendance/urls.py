from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from attendance import views

urlpatterns = [
    path('issues/', views.StudentIssuesAPIView.as_view()),
    path('issues/admin/', views.TeacherIssuesAPIView.as_view()),
    path('report/today/', views.TeacherDailyReportAPIView.as_view()),
    path('statistics/attendance/', views.AttendanceStatisticsAPIView.as_view()),
    path('statistics/sections/', views.SectionStatisticsAPIView.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)