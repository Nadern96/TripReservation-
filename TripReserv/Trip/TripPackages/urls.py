from django.contrib import admin
from django.urls import path, include
from . import views
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.auth import views as auth_views


urlpatterns = [

    path('', views.Home_view, name = "Home_view"),
    path('loginUser', views.login_user , name='login_user'),
    path('logout_user', views.logout_user , name='logout_user')
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

