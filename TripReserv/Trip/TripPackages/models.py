from django.db import models

# Create your models here.




class City (models.Model):
    name = models.CharField(max_length=100, default="")
    historical = models.BooleanField(default=False)
    local_culture = models.BooleanField(default=False)
    local_cusine = models.BooleanField(default=False)
    relaxation = models.BooleanField(default=False)
    about_city = models.TextField(default=" ")

    def __str__(self):
        return self.name

class Place (models.Model):
    name= models.CharField(max_length=250, default="")
    about_place = models.TextField(default=" ")
    historical= 'historical'
    local_culture = 'local_culture'
    local_cusine = 'local_cusine'
    relaxation = 'relaxation'
    category = (
        (historical, 'historical'),
        (local_culture, 'local_culture'),
        (local_cusine, 'local_cusine'),
        (relaxation, 'Senrelaxationior'),
    )
    city = models.ForeignKey(City, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class Subscribed_user (models.Model):
    email = models.EmailField(max_length=70, null=True, blank=True, unique=True)





