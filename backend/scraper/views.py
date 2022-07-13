import json
from django.http import HttpRequest, HttpResponse
from django.shortcuts import render

from . import services

# Create your views here.

def get_articles(request: HttpRequest) -> HttpResponse:
    articles = services.get_articles()
    resp_data = json.dumps(articles)
    return HttpResponse(resp_data, "application/json")