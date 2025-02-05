from django.shortcuts import render,redirect
# Create your views here.
from . models import City , Place , Subscribed_user
from django.contrib.auth import authenticate, login , logout , get_user_model
from CustomUser.forms import RegisterForm , LoginForm , SetPasswordForm
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

#reset pass 
from django.views.generic import *

#for addSubUSer
from django.urls import reverse_lazy


def Home_view (request):
    cities = City.objects.all()
    context = {
        'cities': cities
    }
    return render(request, 'TripPackages/Home.html', context)

def city_view (request,city):
    places = Place.objects.all()
    places = places.filter(city__name=city)
    cities = City.objects.all()
    city = cities.filter(name=city)
    context = {
        "places": places,
        "cities": cities,
        "city" : city,
     }
    return render(request, 'TripPackages/City_template.html',context)
def about_us (request):
    cities = City.objects.all()
    context = {
        'cities': cities
    }
    return render(request, 'TripPackages/About_us.html', context)

# def login_user(request):

#     if request.method == "POST":
#         email = request.POST['email']
#         password = request.POST['password']
#         user = authenticate(email=email, password=password)
#         if user is not None:
#             if user.is_active:
#                 login(request, user)
#                 request.session.set_expiry(10)
#                 return redirect('Home_view')

#     return redirect('Home_view')

def logout_user(request):
    logout(request)
    return redirect('Home_view')

def login_page(request):
    form = LoginForm(request.POST or None)
    next_ = request.GET.get('next')
    next_post = request.POST.get('next')
    redirect_path = next_ or next_post or None
    if form.is_valid():
        email  = form.cleaned_data.get("email")
        password  = form.cleaned_data.get("password")
        remember_me = request.POST.get('remember_me')
        user = authenticate(request, username=email, password=password)
        if user is not None:
            login(request, user)
            if not remember_me:
                request.session.set_expiry(0)
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
        mail_subject = 'Activate your AmieGoo! account.'
        message = render_to_string('accounts/acc_active_email.html', {
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

    messages.error(request,f'This email address is already in use')
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
    elif user.is_active:
        return redirect('Home_view')
    else:
        messages.error(request,f'Activation link is invalid!')
        return render(request,'TripPackages/Home.html')


# password_reset: Form where the user submits the email address
def password_reset(request):
    if request.method == "POST":
        email = request.POST.get('email')
        all_users = User.objects.all()
        user = all_users.filter(email=email)

        if not user.exists():
            messages.error(request,f"invalid Email")
            return redirect("/",{'messages':messages})

        user = user[0]
        full_name = user.full_name
        next_ = request.GET.get('next')
        next_post = request.POST.get('next')
        redirect_path = next_ or next_post or None
    
        #send email to that user 
        current_site = get_current_site(request)
        mail_subject = 'Reset your Password'
        message = render_to_string('accounts/acc_forgot_pass.html', {
            'full_name': full_name,
            'domain': current_site.domain,
            'uid':urlsafe_base64_encode(force_bytes(user.pk)),
            'token':account_activation_token.make_token(user),
        })
        to_email = email
        email = EmailMessage(
                    mail_subject, message, to=[to_email]
        )
        email.send()
        messages.success(request,f'Please Check your Email!')
        ###
        try:
            del request.session['guest_email_id']
        except:
            pass
        if is_safe_url(redirect_path, request.get_host()):
            return redirect(redirect_path,{'messages':messages})
        else:
            messages.error(request,f'Try Again')
            return redirect("/",{'messages':messages})

        messages.error(request,f'Try Again')
    return redirect(redirect_path,{'messages':messages})    
    

class PasswordResetConfirmView(FormView):
    template_name = "accounts/acc_reset_pass.html"
    success_url = '/'
    form_class = SetPasswordForm

    def post(self, request, uidb64=None, token=None, *arg, **kwargs):
        """
        View that checks the hash in a password reset link and presents a
        form for entering a new password.
        """
        UserModel = get_user_model()
        form = self.form_class(request.POST)
        assert uidb64 is not None and token is not None  # checked by URLconf
        try:
            uid = urlsafe_base64_decode(uidb64)
            user = UserModel._default_manager.get(pk=uid)
        except (TypeError, ValueError, OverflowError, UserModel.DoesNotExist):
            user = None

        if user is not None and account_activation_token.check_token(user, token):
            if form.is_valid():
                new_password= form.cleaned_data['new_password2']
                user.set_password(new_password)
                user.save()
                messages.success(request, 'Password has been reset.')
                return self.form_valid(form)
            else:
                messages.error(request, 'Password reset has not been unsuccessful.')
                return self.form_invalid(form)
        else:
            messages.error(request,'The reset password link is no longer valid.')
            return redirect("/",{'messages':messages})
              

    
class addSubUser(CreateView):
    model = Subscribed_user
    fields = ['email']

    success_url =reverse_lazy('Home_view')
    