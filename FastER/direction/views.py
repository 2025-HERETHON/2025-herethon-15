from django.shortcuts import render, get_object_or_404
import requests
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from hospital.models import Hospital, Specialty, HospitalStatus
import json

def map_view(request):
    hospitals = Hospital.objects.all()
    print(f"병원 개수: {len(hospitals)}")
    specialties = Specialty.objects.all()

    hospitals_json = [
        {
            'id': h.id,
            'name': h.name,
            'address': h.address,
            'hos_lat': h.hos_lat,
            'hos_lng': h.hos_lng,
            'phone': h.phone,
            'is_emergency': h.is_emergency,
            'nightcare': h.nightcare,
            'start_hour': h.start_hour.strftime('%H:%M') if h.start_hour else None,
            'end_hour': h.end_hour.strftime('%H:%M') if h.end_hour else None,
            'image': h.image.url if h.image else None,
            'specialties': [s.name for s in h.specialties.all()],
            'status': {
            'congestion': getattr(h.status, 'congestion', '정보 없음'),
            'available_beds': getattr(h.status, 'available_beds', 0),
            'waiting_count': getattr(h.status, 'waiting_count', 0),
        } if h.status else None
        }
        for h in hospitals
    ]

    hospitals_json_str = json.dumps(hospitals_json, ensure_ascii=True)

    return render(request, 'direction/map.html', {
        'hospitals': hospitals,
        'specialties': specialties,
        'hospitals_json': hospitals_json_str
    })

def taxi_view(request):
    return render(request, 'direction/taxi.html')

def get_kakao_route(request):
    if request.method == "GET":
        origin = request.GET.get("origin")       # ex) "126.9786567,37.566826"
        destination = request.GET.get("destination")  # ex) "127.033,37.501"

        headers = {
            "Authorization": "KakaoAK b68113441b41493ce9b97d9c36e24afa"  # ← 본인의 REST API 키로 교체
        }
        params = {
            "origin": origin,
            "destination": destination,
            "priority": "RECOMMEND",  # 최적 경로
            "car_fuel": "GASOLINE",
            "car_hipass": False
        }

        kakao_url = "https://apis-navi.kakaomobility.com/v1/directions"
        response = requests.get(kakao_url, headers=headers, params=params)

        return JsonResponse(response.json())