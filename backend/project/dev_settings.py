from base_settings import *

DEBUG = True

ALLOWED_HOSTS = [
    'localhost',
    '127.0.0.1'
]

CORS_ALLOWED_ORIGINS = [
    'https://localhost:4200',
    'https://127.0.0.1:4200',
    'http://localhost:4200',
    'http://127.0.0.1:4200'
]