

from .base import *

ALLOWED_HOSTS += ["*"]
DEBUG = True

WSGI_APPLICATION = 'home.wsgi.dev.application'
ASGI_APPLICATION = "home.asgi.application"

CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels.layers.InMemoryChannelLayer'
    },
}
# CHANNEL_LAYERS = {
#     "default": {
#         "BACKEND": "channels_redis.core.RedisChannelLayer",
#         "CONFIG": {
#             "hosts": ['redis://:p170483e05c44f76040b98b03717d59384162863936644a96fbddbb1948645c38@ec2-18-209-132-241.compute-1.amazonaws.com:13790', 'redis://localhost:6379'],
#         },
#     },
# }



DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        # 'NAME': 'postgres_db', 
        'NAME': 'postgres',
        'USER': 'postgres',
        'PASSWORD': '9008978',
        # 'HOST': 'db',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.postgresql_psycopg2',
#         'NAME': 'dnpr698e915gb',
#         'USER': 'rfpriwdhgaoytx',
#         'PASSWORD': 'f814fcf8c769e430f552ba185c9c6c20dff5f6900bf947f732c79095f6433ae1',
#         'HOST': 'ec2-3-224-112-203.compute-1.amazonaws.com',
#         'PORT': '5432',
#     }
# }

CACHES = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        # 'LOCATION': 'redis://:p170483e05c44f76040b98b03717d59384162863936644a96fbddbb1948645c38@ec2-18-209-132-241.compute-1.amazonaws.com:13790',
        # 'PASSWORD': 'p170483e05c44f76040b98b03717d59384162863936644a96fbddbb1948645c38',
        # 'PORT': '13790',
        # 'HOST': 'ec2-18-209-132-241.compute-1.amazonaws.com',
        'LOCATION': 'redis://localhost:6379/1',
        'OPTIONS':{
            "CLIENT_CLASS":'django_redis.client.DefaultClient'
        },
        "KEY_PREFIX":'private'
    }
}

CORS_ORIGIN_WHITELIST = (
    'http://localhost:3000',
    # 'https://stark-badlands-33991.herokuapp.com/',
    # 'http://stark-badlands-33991.herokuapp.com/',
    # 'https://aws-fgw-project.s3.amazonaws.com/',
    # 'http://aws-fgw-project.s3.amazonaws.com/'
)
# CSRF_TRUSTED_ORIGINS=True
# CORS_ALLOW_CREDENTIALS = True
# CORS_ALLOW_HEADERS = (
#     'csrftoken',
#     'content-type',
#     'X-CSRFTOKEN'
# )
# CSRF_COOKIE_NAME = "csrftoken"
# CSRF_HEADER_NAME = 'X-CSRFTOKEN'
