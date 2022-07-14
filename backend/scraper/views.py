import json
from tkinter import W
from django.http import HttpRequest, HttpResponse
from django.shortcuts import render

from . import services

# Create your views here.

def get_articles(request: HttpRequest) -> HttpResponse:
    print(request.build_absolute_uri())
    articles = services.get_articles()
    resp_data = json.dumps(articles)
    return HttpResponse(resp_data, "application/json")
