from django.shortcuts import render


def profile_render(request):
    return render(request,'user_profile.html')