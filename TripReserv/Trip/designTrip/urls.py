from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.design_form_render, name = "design_form_render"),
    path('check_email/',views.checkEmail,name='check_email'),
    path('ajax_check_auth/',views.check_auth,name="check_auth"),
    path('design_form_get/',views.design_form_get,name="design_form_get"),
    path('form_complete/',views.form_complete,name="form_complete"),
]