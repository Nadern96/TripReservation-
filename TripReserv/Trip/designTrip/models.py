from django.db import models
from CustomUser.models import User


class Program(models.Model):
    pass

class DesignTrip(models.Model):

    status_choices = (
        ('Requested','Requested'),
        ('onGoing','onGoing'),
        ('Done','Done'),
        ('Archieve','Archieve'),
    )

    trip_type = models.CharField(max_length=50,blank=True)
    about_trip = models.CharField(max_length=50,blank=True)
    budget_from = models.IntegerField(blank=True,null=True)
    budget_to = models.IntegerField(blank=True,null=True)
    travel_with = models.CharField(max_length=50,blank=True)
    couple_question = models.CharField(max_length=50,blank=True)
    adult_number = models.IntegerField(blank=True)
    chidren_number = models.IntegerField(blank=True)
    exact_date = models.CharField(max_length=50,blank=True)
    arrival_date = models.DateField(blank=True,null=True)
    departure_date = models.DateField(blank=True,null=True)
    month = models.CharField(max_length=50,blank=True)
    period = models.CharField(max_length=50,blank=True)
    begin_trip =models.CharField(max_length=50,blank=True)
    agent_language = models.CharField(max_length=50,blank=True)
    agent_time = models.CharField(max_length=50,blank=True)
    agent_welcome = models.CharField(max_length=50,blank=True)
    agent_byebye = models.CharField(max_length=50,blank=True)
    agent_car = models.CharField(max_length=50,blank=True)
    agent_camera = models.CharField(max_length=50,blank=True)
    additional_info = models.TextField(max_length=1000,blank=True)
    user = models.ForeignKey(User,on_delete=models.CASCADE,blank=True)
    form_submitted_date = models.DateTimeField(auto_now_add=True,blank=True,null=True)
    status = models.CharField(max_length=20,blank=True,null=True,choices=status_choices)
    program = models.OneToOneField(Program,on_delete=models.CASCADE,blank=True,null=True)
    
    def __str__(self):
        return self.user.get_full_name()
