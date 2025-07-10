from django.http import JsonResponse
from django.shortcuts import render
from django.views import View
from .models import *
import json

# Create your views here.
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

