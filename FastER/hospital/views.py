from django.shortcuts import render
from .models import *
from django.http import JsonResponse
from django.utils.timezone import now

# Create your views here.

def filtered_hospitals(request):
    hospitals = Hospital.objects.all()

    # 응급실 모드 (고정 필터)
    if request.GET.get("is_emergency") == "true":
        hospitals = hospitals.filter(is_emergency=True)

    # 진료과 필터
    specialty = request.GET.get("specialty")
    if specialty:
        hospitals = hospitals.filter(specialties__name=specialty)

    # 야간 진료 필터
    if request.GET.get("night") == "true":
        hospitals = hospitals.filter(nightcare=True)

    # 현재 진료 중 필터
    if request.GET.get("open_now") == "true":
        current_time = now().time()
        hospitals = hospitals.filter(start_hour__lte=current_time, end_hour__gte=current_time)


#병원 상세 조회 API
def hospital_info(request, hospital_id):
    hospital = Hospital.objects.get(id=hospital_id)

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

    return JsonResponse({"success": True, "hospital": data})

