from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
import attendance.routing
from faceRecognitionAPI.middleware import TokenAuthMiddlewareStack

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
    'http': TokenAuthMiddlewareStack(
        URLRouter(
            attendance.routing.urlpatterns
        )
    )
})