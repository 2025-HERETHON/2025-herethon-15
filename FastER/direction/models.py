from django.db import models
from django.contrib.auth import get_user_model
from hospital.models import *

User = get_user_model()

class Direction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='directions')
    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE, related_name='direction')
    #출발 위치 
    origin_lat = models.FloatField(verbose_name='출발지 위도')
    origin_lng = models.FloatField(verbose_name='출발지 경도')
    #병원 위치 
    hos_lat = models.FloatField(verbose_name='병원 위도')
    hos_lng = models.FloatField(verbose_name='병원 경도')
    #결과 정보
    estimated_time = models.IntegerField(verbose_name='예상 소요 시간(분)')
    estimated_cost = models.IntegerField(verbose_name='예상 비용(원)')
    distance = models.FloatField(verbose_name='거리(km)')