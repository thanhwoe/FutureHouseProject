import os
# import core
# pth = os.path.dirname(core.__file__)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SECRET_KEY = '-05sgp9!deq=q1nltm@^^2cc+v29i(tyybv3v2t77qi66czazj'
DEBUG = True
ALLOWED_HOSTS = []
# CSRF_COOKIE_SECURE = True
# CSRF_COOKIE_HTTPONLY = True
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'corsheaders',
    'rest_auth',
    'rest_auth.registration',
    'rest_framework',
    'rest_framework.authtoken',
    'core',
    'django_filters',
    'ckeditor',
    'ckeditor_uploader',
    'channels',
    'storages'
]

# ROOT_URLCONF = 'server.urls'

REST_AUTH_SERIALIZERS = {
    'USER_DETAILS_SERIALIZER': 'core.api.serializers.UserSerializer',
}
# AUTH_USER_MODEL = 'core.UserExtend'


# CKEDITOR_IMAGE_BACKEND = 'pillow'
# CKEDITOR_THUMBNAIL_SIZE = (500, 500)
# CKEDITOR_IMAGE_QUALITY = 40

# CKEDITOR_MEDIA_USE_FULL_URL = True
# CKEDITOR_MEDIA_FULL_URL="http://127.0.0.1:8000"
CKEDITOR_CONFIGS = {
    'default': {
        'skin': 'moono',
        # 'skin': 'office2013',
        'toolbar_Basic': [
            ['Source', '-', 'Bold', 'Italic']
        ],
        'toolbar_YourCustomToolbarConfig': [
            {'name': 'styles', 'items': ['Styles', 'Format', 'Font', 'FontSize']},
            {'name': 'colors', 'items': ['TextColor', 'BGColor']},
            {'name': 'document', 'items': ['Source', '-', 'Save', 'NewPage', 'Preview', 'Print']},
            {'name': 'clipboard', 'items': ['Undo', 'Redo']},
            {'name': 'editing', 'items': ['Find', 'Replace']},
            
            '/',
            {'name': 'basicstyles',
             'items': ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat']},
            {'name': 'paragraph',
             'items': ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent',  'Blockquote',  '-',
                       'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock']},
            {'name': 'links', 'items': ['Link', 'Unlink']},
            {'name': 'insert',
             'items': ['Image', 'Iframe', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar']},
            
            
        ],
        'toolbar': 'YourCustomToolbarConfig',  # put selected toolbar config here
        # 'toolbarGroups': [{ 'name': 'document', 'groups': [ 'mode', 'document', 'doctools' ] }],
        # 'height': 291,
        # 'width': '100%',
        # 'filebrowserWindowHeight': 725,
        # 'filebrowserWindowWidth': 940,
        # 'toolbarCanCollapse': True,
        # 'mathJaxLib': '//cdn.mathjax.org/mathjax/2.2-latest/MathJax.js?config=TeX-AMS_HTML',
        'tabSpaces': 4,
        'extraPlugins': ','.join([
            'uploadimage', # the upload image feature
            # your extra plugins here
            'div',
            'autolink',
            'autoembed',
            'embedsemantic',
            'autogrow',
            # 'devtools',
            'widget',
            'lineutils',
            'clipboard',
            'dialog',
            'dialogui',
            'elementspath'
        ]),
    }
}

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    # 'whitenoise.middleware.WhiteNoiseMiddleware'
]

ROOT_URLCONF = 'home.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'build')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]




# set cache time out
CACHE_TTL = 60

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'Asia/Ho_Chi_Minh'
USE_I18N = True
USE_L10N = True
USE_TZ = True



# aws config
# - STATICFILES_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
AWS_S3_REGION_NAME='ap-southeast-1' 
# AWS_LOCATION='uploads'
# key admin
#- AWS_ACCESS_KEY_ID = 'AKIA5AXYTQHBATIKF5YU'
#- AWS_SECRET_ACCESS_KEY = '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'

# key django
AWS_ACCESS_KEY_ID = 'AKIA5AXYTQHBILYKM5NL'
AWS_SECRET_ACCESS_KEY = '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'

DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
AWS_STORAGE_BUCKET_NAME = 'aws-fgw-project'
AWS_DEFAULT_ACL='public-read'
AWS_S3_CUSTOME_DOMAIN= f'{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com'
AWS_S3_OBJECT_PARAMETERS = {'CacheControl':'max-age=86400'}
AWS_QUERYSTRING_EXPIRE = '604800'
AWS_S3_FILE_OVERWRITE = False
AWS_S3_VERIFY = False
AWS_S3_SIGNATURE_VERSION = 's3v4'


# STATIC_URL=f'https://{AWS_S3_CUSTOME_DOMAIN}/static/'
MEDIA_URL=f'https://{AWS_S3_CUSTOME_DOMAIN}/media/'

STATIC_URL = '/static/'
CKEDITOR_UPLOAD_PATH="uploads/"
# CKEDITOR_UPLOAD_PATH=f'https://{AWS_S3_CUSTOME_DOMAIN}/uploads/'

# MEDIA_URL = '/media/'
STATICFILES_DIRS = [os.path.join(BASE_DIR, 'build/static')]
# STATIC_ROOT = 'static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
SITE_ID = 1
DEFAULT_AUTO_FIELD='django.db.models.AutoField'

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.AllowAny',
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.TokenAuthentication',
        # 'rest_framework.authentication.SessionAuthentication',
        # 'rest_framework.authentication.BasicAuthentication',
    ),
}

# EMAIL CONFIG

EMAIL_USE_TLS = True
# EMAIL_BACKEND='django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST='smtp.gmail.com'
EMAIL_PORT=587
EMAIL_HOST_USER= 'thanhwoe@gmail.com'
EMAIL_HOST_PASSWORD='9008978abc'
# EMAIL_HOST_USER= os.environ.get('EMAIL_HOST_USER')
# EMAIL_HOST_USER_PASSWORD=os.environ.get('EMAIL_HOST_USER_PASSWORD')

# print(os.environ.get('EMAIL_HOST_USER'))
# print(os.environ.get('EMAIL_HOST_USER_PASSWORD'))

# /////
ACCOUNT_EMAIL_REQUIRED = False
ACCOUNT_AUTHENTICATION_METHOD = 'username'
ACCOUNT_EMAIL_VERIFICATION = 'none'

