from django.shortcuts import render
from CustomUser.models import User
from django.http import HttpResponse
from django.contrib.auth import authenticate, login , logout

# Create your views here.

def design_form_render(request):
    return render(request, 'design_form.html')


def checkEmail(request):
    email = request.POST.get('emailValue', False)
    if email:
        numberOfEmail = User.objects.filter(email=email).count()
        if numberOfEmail != 0:
            res = "There is already an AmieGoo account set up with this email address"
        else:
            res = "No account with this email found please Create an account"
    else:
        res = ""
    return HttpResponse('%s' % res)


def ajaxSignIn(request):
    email = request.POST.get('email', False)
    password = request.POST.get('password', False)
    user = authenticate(email=email, password=password)
    signIn_status = ""
    if user is not None:
        if user.is_active:
            login(request, user)
            signIn_status = "Okay"
            return HttpResponse('%s' % signIn_status)
        else:
            signIn_status = "You are not active"
            return HttpResponse('%s' % signIn_status)
    else:
        signIn_status = "Invalid Password"
        return HttpResponse('%s' % signIn_status)

def check_auth(request):
    if request.user.is_authenticated:
        return HttpResponse('%s' % "yes")
    else:
        return HttpResponse('%s' % "no")

def design_from_get(request):
    email = request.POST.get('email', False)
    if request.user.is_authenticated:
        pass
    elif email and User.objects.filter(email=email).count() !=0:
        pass
    else:
        pass
        