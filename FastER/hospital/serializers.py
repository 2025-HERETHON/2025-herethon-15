from rest_framework import serializers
from .models import Hospital, HospitalStatus, Specialty

#병원 진료과 정보
class SpecialtySerializer(serializers.ModelSerializer):
    class Meta:
        model = Specialty
        fields = ['id', 'name']

#실시간 상태 제공 API에서 사용
class HospitalStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = HospitalStatus
        fields = ['id', 'congestion', 'available_beds', 'waiting_count']


#병원 전체 정보 제공 (필터링 및 지도에 뿌릴 때)
class HospitalSerializer(serializers.ModelSerializer):
    status = HospitalStatusSerializer(read_only=True)
    specialties = SpecialtySerializer(many=True, read_only=True)

    class Meta:
        model = Hospital
        fields = [
            'id', 'name', 'address', 'hos_lat', 'hos_lng', 'phone',
            'is_emergency', 'open_24', 'nightcare', 'image',
            'specialties', 'status'
        ]
