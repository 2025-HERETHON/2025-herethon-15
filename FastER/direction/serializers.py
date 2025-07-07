from rest_framework import serializers
from .models import Direction
from hospital.serializers import HospitalSerializer

class DirectionSerializer(serializers.ModelSerializer):
    hospital = HospitalSerializer(read_only=True)

    class Meta:
        model = Direction
        fields = [
            'id', 'user', 'hospital',
            'origin_lat', 'origin_lng', 'hos_lat', 'hos_lng',
            'estimated_time', 'estimated_cost', 'distance',
            'requested_at'
        ]
        read_only_fields = ['user', 'requested_at']
