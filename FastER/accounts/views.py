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

class SearchHistoryView(View):
    #최근 검색어 리스트 조회
    def get(self, request):
        histories=SearchHistory.objects.filter(user=request.user)
        data=[
            {
            "id": h.id,
            "keyword": h.keyword,
            "selected_hospital": h.selected_hospital.name if h.selected_hospital else None
            }
            for h in histories
        ]
        return JsonResponse(data, safe=False)
    
    #새로운 검색어 저장
    def post(self, request):
        body = json.loads(request.body)
        keyword=body["keyword"].strip()
        hospital_id = body.get("hospital_id") #선택된 병원 id가 있으면 저장 

        selected_hospital = None

        if hospital_id:
            try:
                selected_hospital = Hospital.objects.get(id=hospital_id)
            except Hospital.DoesNotExist:
                pass  #병원 존재하지 않아도 무시하고 저장 

        #무조건 검색어는 저장 
        SearchHistory.objects.create(
            user=request.user,
            keyword=keyword,
            selected_hospital=selected_hospital
        )

        return JsonResponse({}, status=201)

