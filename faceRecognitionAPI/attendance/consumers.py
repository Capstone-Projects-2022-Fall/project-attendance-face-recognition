import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from asgiref.sync import async_to_sync
from django.utils import timezone

from course.services.schedule import currentCourse


class TakingAttendance(AsyncWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(args, kwargs)
        self.user = None
        self.section = None
        self.course = None

    @database_sync_to_async
    def _get_current_class_section(self, user):
        return currentCourse(user)

    async def connect(self):
        self.user = self.scope['user']
        if self.user.is_anonymous:
            await self.close()
        course_section = await self._get_current_class_section(self.user)
        self.course = course_section[0]
        self.section = course_section[1]
        print(self.section.course)
        await self.channel_layer.group_add(
            self.section.name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.section.name,
            self.channel_name
        )

    async def receive(self, text_data=None, bytes_data=None):
        test_data_json = json.loads(text_data)
        message = test_data_json['message']
        now = timezone.now()
        await self.channel_layer.group_send(
            self.section.name,
            {
                'type': 'chat_message',
                'message': message,
                'user': self.user.first_name,
                'datetime': now.isoformat()
            }
        )

    async def chat_message(self, event):
        await self.send(text_data=json.dumps(event))
