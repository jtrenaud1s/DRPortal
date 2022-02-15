from django.contrib import admin
from django.urls import include, path
from django.views.generic import TemplateView

app_name = "portal"

urlpatterns = [
    path('', TemplateView.as_view(template_name="portal/index.html")),
]