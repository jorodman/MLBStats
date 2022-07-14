"""
WSGI config for project project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.0/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

prod = os.environ.get('prod')

if prod == '1':
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'project.prod_settings')
else:
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'project.dev_settings')

application = get_wsgi_application()
