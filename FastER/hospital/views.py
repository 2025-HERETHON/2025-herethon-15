from django.shortcuts import render
from .models import *
from django.http import JsonResponse
from django.utils.timezone import now

# Create your views here.

#지도 템플릿 뷰 
def emergency_map_view(request):
    return render(request, "map/emergency_map.html") #응급실 전용 지도 템플릿

def symptom_map_view(request):
    category = request.GET.get("category")  
    return render(request, "map/symptom_map.html", {"category": category}) #증상 별 병원 찾기 템플릿

#병원 목록 API
#1. 응급실 전용 
def emergency_hospitals(request):
    hospitals = Hospital.objects.filter(is_emergency=True)

    #야간 진료 필터
    if request.GET.get("night") == "true":
        hospitals = hospitals.filter(nightcare=True)

    data = [{
        "id": h.id,
        "name": h.name,
        "latitude": h.hos_lat,
        "longitude": h.hos_lng,
        "address": h.address,
    } for h in hospitals]

    return JsonResponse({"success": True, "hospitals": data})

#2. 증상 기반 + 필터링
def filtered_hospitals(request):
    hospitals = Hospital.objects.all()

    #진료과 필터
    specialty = request.GET.get("specialty")
    if specialty:
        hospitals = hospitals.filter(specialties__name=specialty)

    #야간진료 필터
    if request.GET.get("night") == "true":
        hospitals = hospitals.filter(nightcare=True)

    # 현재 진료 중 필터
    if request.GET.get("open_now") == "true":
        current_time = now().time()
        hospitals = hospitals.filter(start_hour__lte=current_time, end_hour__gte=current_time)

    hospitals = hospitals.distinct()

    data = [{
        "id": h.id,
        "name": h.name,
        "latitude": h.hos_lat,
        "longitude": h.hos_lng,
        "address": h.address,
    } for h in hospitals]

    return JsonResponse({"success": True, "hospitals": data})

#병원 상세 조회 API
def hospital_info(request, hospital_id):
    hospital = Hospital.objects.get(id=hospital.id)

    status = getattr(hospital, 'status', None)

    data = {
            "id": hospital.id,
            "name": hospital.name,
            "address": hospital.address,
            "phone": hospital.phone,
            "start_hour": hospital.start_hour.strftime("%H:%M"),
            "end_hour": hospital.end_hour.strftime("%H:%M"),
            "is_emergency": hospital.is_emergency,
            "image": hospital.image.url,
            "specialties": [s.name for s in hospital.specialties.all()],
        }

    #응급실 -> 병상 정보 
    if hospital.is_emergency:
        data["realtime_info"]={
            "type": "emergency",
            "available_beds": status.available_beds,
            "congestion": status.congestion
        }
    else: #일반 병원 -> 대기 인원
        data["realtime_info"]={
            "type":"normal",
            "waiting_count": status.waiting_count,
            "congestion": status.congestion
        }
    return JsonResponse({"success": True, "hospital": data})