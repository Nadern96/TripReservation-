from django.db import models

# Create your models here.




class City (models.Model):
    name = models.CharField(max_length=100, default="")
    historical = models.BooleanField(default=False)
    local_culture = models.BooleanField(default=False)
    local_cusine = models.BooleanField(default=False)
    relaxation = models.BooleanField(default=False)

    def __str__(self):
        return self.name

class Subscribed_user (models.Model):
    email = models.EmailField(max_length=70, null=True, blank=True, unique=True)





