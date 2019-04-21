from django.contrib import admin

from .models import City , Place , Subscribed_user

# Register your models here.

admin.site.register(City)
admin.site.register(Place)
admin.site.register(Subscribed_user)