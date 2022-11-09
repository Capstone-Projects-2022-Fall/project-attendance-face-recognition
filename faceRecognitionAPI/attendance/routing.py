from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from attendance import consumers, views

"""
websocket_urlpatterns = [
    re_path("ws/attendance/", consumers.TakingAttendance.as_asgi())
]
"""
urlpatterns = [
    path("attendance/", views.SectionAttendanceAPIView.as_view())
]