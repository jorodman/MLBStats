import json
from django.http import HttpRequest, HttpResponse
from django.shortcuts import render

from . import services


def get_fastcast_url(request: HttpRequest) -> HttpResponse:
    url = services.get_fastcast()
    resp_data = json.dumps(url)
    return HttpResponse(resp_data, "application/json")


def get_articles(request: HttpRequest) -> HttpResponse:
    articles = services.get_articles()
    resp_data = json.dumps(articles)
    return HttpResponse(resp_data, "application/json")
