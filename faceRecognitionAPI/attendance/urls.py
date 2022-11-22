from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from attendance import views

urlpatterns = [
    path('issue_submission/', views.IssueSubmissionAPIView.as_view()),
    path('issues/admin/', views.TeacherIssuesAPIView.as_view()),
    path('report/today/', views.TeacherDailyReportAPIView.as_view()),
    path('statistics/attendance/', views.AttendanceStatisticsAPIView.as_view()),
    path('statistics/sections/', views.SectionStatisticsAPIView.as_view()),
    path('attendance/', views.AttendanceStudentAPIView.as_view()),
    path('attendance/monitoring/', views.AttendanceSectionAPIView.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
