from django.shortcuts import render

# Create your views here.

def Home_view (request):
    return render(request,'Home.html')