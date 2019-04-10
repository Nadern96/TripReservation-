from django.contrib import admin
from django.urls import path, include
from . import views
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.auth import views as auth_views
from django.conf.urls import url


urlpatterns = [

    path('', views.Home_view, name = "Home_view"),
    path('loginUser', views.login_user , name='login_user'),
    path('logout_user', views.logout_user , name='logout_user'),
    
    path('signUp', views.signUp , name='signUp'),
    path('login_page', views.login_page , name='login_page'),
    


]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

