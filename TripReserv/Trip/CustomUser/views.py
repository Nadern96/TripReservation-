from django.shortcuts import render,get_object_or_404,redirect
from .models import User
from designTrip.models import DesignTrip
from TripPackages.models import City
from django.http import HttpResponse

def profile_render(request,user_id):
    user = get_object_or_404(User,id=user_id)
    designedTrips = DesignTrip.objects.filter(user=user)
    cities = City.objects.all()
    context = {'user':user, 'DesignedTrips':designedTrips,'cities':cities}
    return render(request,'user_profile.html', context)

def cancel_request(request):
    trip_id = request.POST.get("trip_id",'')
    trip_request = get_object_or_404(DesignTrip,id=trip_id)
    user_id = trip_request.user.id
    trip_request.delete()
    return redirect('profile_render',user_id)

def get_mobile(request,user_id):
    user = get_object_or_404(User,id=user_id)
    mobile = user.mobile
    return HttpResponse('%s' % mobile)