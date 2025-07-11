from django.shortcuts import render, redirect
from django.contrib.auth import login as auth_login
from django.contrib.auth.forms import AuthenticationForm
from django.db.models import Q
from .models import *
from .forms import *

from django.http import JsonResponse
from django.views import View
import json

def map(request):
    return render(request, 'direction/map.html')

# 로그인
def signup(request):
    if request.method == 'GET':
        form = SignUpForm()
        return render(request, 'accounts/signup.html', {'form': form})
    
    form = SignUpForm(request.POST)
    if form.is_valid():
        form.save()
        return redirect('accounts:login')
    else:
        return render(request, 'accounts/signup.html', {'form': form})

# 로그인
def login(request):
    if request.method == 'GET':
        return render(request, 'accounts/login.html', {'form': AuthenticationForm()})
    
    form = AuthenticationForm(request, request.POST)
    if form.is_valid():
        auth_login(request, form.user_cache)
        return redirect('accounts:map')
    return render(request, 'accounts/login.html', {'form': form})

def symptom_search(request):
    if request.method == 'GET':
        categorized_symptoms = {}
        for symptom in Symptom.objects.all():
            category = symptom.get_category_display()
            categorized_symptoms.setdefault(category, []).append(symptom.symptom_keyword)

        return render(request, 'accounts/symptoms_search.html', {
            'categorized_symptoms': categorized_symptoms
        })

    elif request.method == 'POST':
        symptom_input = request.POST.get('symptom', '').strip()
        specialties = []
        not_found = False

        if symptom_input:
            matching_symptoms = Symptom.objects.filter(
                Q(symptom_keyword__icontains=symptom_input)
            )

            if matching_symptoms.exists():
                # 관련된 진료과 ID 수집 (중복 제거)
                specialty_ids = matching_symptoms.values_list('specialties__id', flat=True).distinct()
                specialties = Specialty.objects.filter(id__in=specialty_ids)
                if not specialties:
                    not_found = True
            else:
                not_found = True
        else:
            not_found = True

        return render(request, 'accounts/symptoms_search.html', {
            'specialties': specialties,
            'not_found': not_found,
            'symptom': symptom_input
        })

