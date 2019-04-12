from django.shortcuts import render,get_object_or_404, redirect
from CustomUser.models import User
from django.http import HttpResponse
from django.contrib.auth import authenticate, login , logout
from .form_save import DesignTrip_formSave, User_SignUp
from django.contrib import messages

# Create your views here.

def design_form_render(request):
    return render(request, 'design_form.html')


def checkEmail(request):
    email = request.POST.get('emailValue', False)
    if email:
        numberOfEmail = User.objects.filter(email=email).count()
        if numberOfEmail != 0:
            id = User.objects.filter(email=email).values('id')[0]['id']
            user = get_object_or_404(User, pk=id)
            if user.is_active:
                res = "There is already an AmieGoo account set up with this email address"
            else:
                res = "There is already an AmieGoo account set up with this email address But It Is Not Active Please Check Your Mail For Confirmation So You Can Make A Trip Request"
        else:
            res = "No account with this email found please Create an account"
    else:
        res = ""
    return HttpResponse('%s' % res)


def check_auth(request):
    if request.user.is_authenticated:
        return HttpResponse('%s' % "yes")
    else:
        return HttpResponse('%s' % "no")

def design_form_get(request):
    email = request.POST.get('email','')
    if request.user.is_authenticated:
        DesignTrip_formSave(request,request.user,False)
        messages.success(request,f'Your Trip Request Was Sent Successfully You Can See Your Request In Your Account')
        return redirect('form_complete',{'messages':messages})
    elif User.objects.filter(email=email).count() !=0:
        id = User.objects.filter(email=email).values('id')[0]['id']
        user = get_object_or_404(User, pk=id)
        DesignTrip_formSave(request,user,True)
        messages.success(request,f'Your Trip Request Was Sent Successfully Please Login To See Your Account')
        return redirect('form_complete',{'messages':messages})
    else:
        user = User_SignUp(request)
        DesignTrip_formSave(request,user,True)
        messages.success(request,f'Your Trip Request Was Sent Successfully And A Confirmation Mail Was Sent To Your Mail')
        return redirect('form_complete',{'messages':messages})
        


def form_complete(request):
    return render(request,'form_complete.html')