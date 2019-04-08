from django.contrib import admin

from .models import City
from .models import Subscribed_user

# Register your models here.

admin.site.register(City)
admin.site.register(Subscribed_user)