from django.shortcuts import render

def index(request):
    return render(request, 'direction/map.html')
# Create your views here.
