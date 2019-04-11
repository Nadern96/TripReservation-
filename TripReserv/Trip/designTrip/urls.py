from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.design_form_render, name = "design_form_render"),
    path('check_email/',views.checkEmail,name='check_email'),
    path('ajax_signIn/',views.ajaxSignIn,name="ajax_SignIn"),
    path('ajax_check_auth/',views.check_auth,name="check_auth"),
    path('design_form_get/',views.design_form_get,name="design_form_get"),
    path('test/',views.test,name="test"),
]