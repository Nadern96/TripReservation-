from .models import DesignTrip
from CustomUser.models import User

def DesignTrip_formSave(request,user,signUpFlag):
    design_form = DesignTrip()
    design_form.trip_type = request.POST.get('trip_type','')
    design_form.about_trip = request.POST.get('about_trip','')
    design_form.budget = request.POST.get('budget',0)
    design_form.travel_with = request.POST.get('people_question','')
    design_form.couple_question = request.POST.get('couple_question','')
    design_form.adult_number = request.POST.get('adult_number',1)
    design_form.chidren_number = request.POST.get('chidren_number',0)
    design_form.exact_date = request.POST.get('exact_date','')
    design_form.arrival_date = request.POST.get('arrival_date',None)
    design_form.departure_date = request.POST.get('departure_date',None)
    design_form.month = request.POST.get('month','')
    design_form.period = request.POST.get('period','')
    design_form.begin_trip = request.POST.get('whereTobeginTrip_question','')
    design_form.agent_language = request.POST.get('language_question','')
    design_form.agent_time = request.POST.get('guide_time','')
    design_form.agent_welcome = request.POST.get('welcome','')
    design_form.agent_byebye = request.POST.get('byebye_question','')
    design_form.agent_car = request.POST.get('car_question','')
    design_form.agent_camera = request.POST.get('camera_question','')
    design_form.additional_info = request.POST.get('additional_info','')
    if signUpFlag:
        design_form.user = user
    else:
        design_form.user = request.user
    design_form.save()
    
def User_SignUp(request):
    user = User()
    user.email = request.POST.get('email','')
    user.title = request.POST.get('title_question','')
    user.full_name = request.POST.get('first_name','') +" "+ request.POST.get('last_name','')
    user.country = request.POST.get('country_complete','')
    user.mobile = request.POST.get('mobile_complete','')
    user.birthday = request.POST.get('birthday',None)
    user.set_password(request.POST.get('password_signup',''))
    user.save()
    return user
    