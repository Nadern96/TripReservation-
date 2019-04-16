from django.shortcuts import render,get_object_or_404, redirect
from CustomUser.models import User
from django.http import HttpResponse
from django.contrib.auth import authenticate, login , logout
from .form_save import DesignTrip_formSave, User_SignUp
from django.contrib import messages
from django.utils.http import is_safe_url
from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import force_bytes, force_text


#Email confirmation
from django.conf import settings
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.core.mail import EmailMultiAlternatives
from CustomUser.tokens import account_activation_token
from django.urls import reverse
from django.template.loader import render_to_string
from django.core.mail import EmailMessage



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

# already signed in = 1
# have account = 2
# signed up = 3
complete_status = 0

def design_form_get(request):
    global complete_status
    email = request.POST.get('email','')
    if request.user.is_authenticated:
        DesignTrip_formSave(request,request.user,False)
        complete_status = 1
        return redirect('form_complete')
    elif User.objects.filter(email=email).count() !=0:
        id = User.objects.filter(email=email).values('id')[0]['id']
        user = get_object_or_404(User, pk=id)
        DesignTrip_formSave(request,user,True)
        complete_status = 2
        return redirect('form_complete')
    else:
        user = User_SignUp(request)
        DesignTrip_formSave(request,user,True)
        complete_status = 3
        #### for confirmation mail
        current_site = get_current_site(request)
        mail_subject = 'Activate your blog account.'
        message = render_to_string('TripPackages/acc_active_email.html', {
            'user': user,
            'domain': current_site.domain,
            'uid':urlsafe_base64_encode(force_bytes(user.pk)),
            'token':account_activation_token.make_token(user),
        })
        to_email = request.POST.get('email','')
        email = EmailMessage(
                    mail_subject, message, to=[to_email]
        )
        email.send()
        return redirect('form_complete')
        


def form_complete(request):
    global complete_status
    if complete_status == 1:
        message = 'Your Trip Request Was Sent Successfully You Can See Your Request In Your Account'
    elif complete_status == 2:
        message = 'Your Trip Request Was Sent Successfully Please Login To See Your Account'
    elif complete_status == 3:
        message = 'Your Trip Request Was Sent Successfully And A Confirmation Mail Was Sent To Your Mail'
    return render(request,'form_Complete.html',{'message':message})