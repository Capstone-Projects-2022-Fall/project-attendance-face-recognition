from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from rest_live.routers import RealtimeRouter

import attendance.routing
from attendance.views import AttendanceViewSet
from faceRecognitionAPI.middleware import TokenAuthMiddlewareStack
from django.urls import path, re_path
import django_eventstream
from django.core.asgi import get_asgi_application

router = RealtimeRouter()
router.register(AttendanceViewSet)
'''
application = ProtocolTypeRouter({
    'websocket': TokenAuthMiddlewareStack(
        URLRouter(
            attendance.routing.websocket_urlpatterns
        )
    )
})
'''
application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": TokenAuthMiddlewareStack(
        URLRouter([
            path("ws/attendance/", router.as_consumer().as_asgi(), name="subscriptions"),
        ])
    )
})