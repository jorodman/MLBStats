from base_settings import *

DEBUG = False

ALLOWED_HOSTS = [
    # '127.0.0.1',
    # 'localhost',
    # '172.31.31.228',
    # '18.218.230.112',
    '3.22.56.148'
    ]

CORS_ALLOWED_ORIGINS = ['http://mlbstats.s3-website.us-east-2.amazonaws.com']

CSRF_COOKIE_SECURE = True

SESSION_COOKIE_SECURE = True

CORS_ALLOW_METHODS = ['GET']
