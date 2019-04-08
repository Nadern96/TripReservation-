from django.shortcuts import render

# Create your views here.

def form_render(request):
    return render(request, 'design_form.html')