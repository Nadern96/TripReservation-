from django.shortcuts import render,redirect
# Create your views here.
from . models import City
from django.contrib.auth import authenticate, login , logout , get_user_model
from CustomUser.forms import RegisterForm , LoginForm , UserChangeForm
from django.utils.http import is_safe_url
from django.contrib import messages
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

def login_page(request):
    form = LoginForm(request.POST or None)
    context = {
        "form": form
    }
    next_ = request.GET.get('next')
    next_post = request.POST.get('next')
    redirect_path = next_ or next_post or None
    if form.is_valid():
        email  = form.cleaned_data.get("email")
        password  = form.cleaned_data.get("password")
        user = authenticate(request, username=email, password=password)
        if user is not None:
            login(request, user)
            try:
                del request.session['guest_email_id']
            except:
                pass
            if is_safe_url(redirect_path, request.get_host()):
                return redirect(redirect_path)
            else:
                messages.error(request,f'invalid email or password ,try again!')
                return redirect("/",{'messages':messages})
                
        
    messages.error(request,f'invalid email or password ,try again!')
    return redirect(redirect_path,{'messages':messages})  

User = get_user_model()
def signUp(request):
    form = RegisterForm(request.POST or None)
    next_ = request.GET.get('next')
    next_post = request.POST.get('next')
    redirect_path = next_ or next_post or None
    if form.is_valid():
        form.save()
        full_name = form.cleaned_data.get('full_name')
        ####
        user = form.save(commit=False)
        current_site = get_current_site(request)
        mail_subject = 'Activate your blog account.'
        message = render_to_string('TripPackages/acc_active_email.html', {
            'user': user,
            'domain': current_site.domain,
            'uid':urlsafe_base64_encode(force_bytes(user.pk)),
            'token':account_activation_token.make_token(user),
        })
        to_email = form.cleaned_data.get('email')
        email = EmailMessage(
                    mail_subject, message, to=[to_email]
        )
        email.send()
        messages.success(request,f'{full_name} Please confirm your email address to complete the registration!')
        ###
        try:
            del request.session['guest_email_id']
        except:
            pass
        if is_safe_url(redirect_path, request.get_host()):
            return redirect(redirect_path,{'messages':messages})
        else:
            messages.error(request,f'Account is not created!')
            return redirect("/",{'messages':messages})

    messages.error(request,f'Account is not created!')
    return redirect(redirect_path,{'messages':messages})    



def activate_user_account(request, uidb64=None, token=None):
    try:
        uid = force_text(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except User.DoesNotExist:
        user = None
    if user and account_activation_token.check_token(user, token):
        user.active = True
        user.save()
        login(request, user)
        messages.success(request,f'Thank you for your email confirmation')
        return render(request,'TripPackages/Home.html')
    else:
        messages.error(request,f'Activation link is invalid!')
        return render(request,'TripPackages/Home.html')


def reset(request):
    user = User.objects.all()
    form = UserChangeForm(request.POST or None)

    return render (request,"TripPackages/reset.html",{'form':form})
    