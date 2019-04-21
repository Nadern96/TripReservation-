from django.contrib import admin
from django.urls import path, include
from . import views
from TripPackages.views import PasswordResetConfirmView
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.auth import views as auth_views
from django.conf.urls import url

urlpatterns = [

    path('', views.Home_view, name = "Home_view"),
    path('cities/<city>/', views.city_view, name='city_view'),
    path('loginUser', views.login_user , name='login_user'),
    path('logout_user', views.logout_user , name='logout_user'),
    
    path('signUp', views.signUp , name='signUp'),
    path('login_page', views.login_page , name='login_page'),
    
    url(r'^activate/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
        views.activate_user_account, name='activate_user_account'),

    path('resetpass',views.password_reset,name='password_reset'),
    # url(r'^password_reset_confirm/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
    #     views.password_reset_confirm, name='password_reset_confirm'),

    url(r'^account/reset_password_confirm/(?P<uidb64>[0-9A-Za-z]+)-(?P<token>.+)/$', PasswordResetConfirmView.as_view(),name='reset_password_confirm'),

  

]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

