from django.shortcuts import render, get_object_or_404
import requests
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from hospital.models import Hospital, Specialty, HospitalStatus
from django.utils.timezone import now

def hospitals_api(request):
    hospitals = Hospital.objects.all()
    hospitals_json = []

    for h in hospitals:
        try:
            status_data = {
                'congestion': h.status.congestion,
                'available_beds': h.status.available_beds,
                'waiting_count': h.status.waiting_count,
            }
        except HospitalStatus.DoesNotExist:
            status_data = None

        hospitals_json.append({
            'id': h.id,
            'name': h.name,
            'address': h.address,
            'hos_lat': h.hos_lat,
            'hos_lng': h.hos_lng,
            'phone': h.phone,
            'is_emergency': h.is_emergency,
            'nightcare': h.nightcare,
            'start_hour': h.start_hour.strftime("%H:%M") if h.start_hour else None,
            'end_hour': h.end_hour.strftime("%H:%M") if h.end_hour else None,
            'image': h.image.url if h.image else "",
            'specialties': [s.name for s in h.specialties.all()],
            'status': status_data
        })

    return JsonResponse({'hospitals': hospitals_json})

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
    
def map_emr_view(request):
    return render(request, 'direction/map_emr.html')

def map_view(request):
    return render(request, 'direction/map.html')