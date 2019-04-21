from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('id=<int:user_id>/', views.profile_render, name = "profile_render"),
    path('cancel_request/', views.cancel_request, name = "cancel_request"),
    path('id=<int:user_id>/get_mobile/', views.get_mobile, name = "get_mobile"),
]