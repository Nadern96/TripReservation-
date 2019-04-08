from django.shortcuts import render,redirect
# Create your views here.
from . models import City
from django.contrib.auth import authenticate, login , logout

from django.http import HttpResponseRedirect
from django.urls import reverse

def Home_view (request):
    cities = City.objects.all()
    context = {
        'cities': cities
    }
    return render(request, 'TripPackages/Home.html', context)


def base_view (request):
    cities = City.objects.all()
    context = {
        'cities': cities
    }
    return render(request, 'TripPackages/base.html', context)


def login_user(request):

    if request.method == "POST":
        email = request.POST['email']
        password = request.POST['password']
        user = authenticate(email=email, password=password)
        if user is not None:
            if user.is_active:
                login(request, user)
                return redirect('Home_view')


    return redirect('Home_view')


def logout_user(request):
    logout(request)
    return redirect('Home_view')