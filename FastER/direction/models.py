from django.db import models
from hospital.models import *

class Direction(models.Model):
    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE, related_name='direction')
    origin_lat = models.FloatField(verbose_name='출발지 위도')
    origin_lng = models.FloatField(verbose_name='출발지 경도')
    hos_lat = models.FloatField(verbose_name='병원 위도')
    hos_lng = models.FloatField(verbose_name='병원 경도')
    estimated_time = models.IntegerField()
    estimated_cost = models.IntegerField()
    distance = models.FloatField()
    requested_at = models.IntegerField(verbose_name='요청 시간')