import os
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
import core.routing
# import django
# from channels.routing import get_default_application
# os.environ.setdefault("DJANGO_SETTINGS_MODULE", "home.settings.dev")
# django.setup()
# application = get_default_application()
application = ProtocolTypeRouter({
  "http": get_asgi_application(),
  "websocket": AuthMiddlewareStack(
        URLRouter(
            core.routing.websocket_urlpatterns
        )
    ),
})