from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.profile_render, name = "design_form_render"),
]