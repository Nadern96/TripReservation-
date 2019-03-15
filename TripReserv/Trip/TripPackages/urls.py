from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.Home_view, name = "Home_view"),

]