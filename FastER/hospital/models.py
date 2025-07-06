from django.db import models
import os
from uuid import uuid4
from django.utils import timezone

def upload_filepath(instance, filename):
    today_str = timezone.now().strftime("%Y%m%d")
    file_basename = os.path.basename(filename)
    return f'{instance._meta.model_name}/{today_str}/{str(uuid4())}_{file_basename}'


class Hospital(models.Model):
    name = models.CharField(max_length=50)
    address = models.CharField(max_length=1000)
    hos_lat = models.FloatField(verbose_name='위도')
    hos_lng = models.FloatField(verbose_name='경도')
    phone = models.CharField(max_length=11, verbose_name='전화번호')
    is_emergency = models.BooleanField(verbose_name='응급실 여부')
    open_24 = models.BooleanField(verbose_name='24시간 운영여부')
    nightcare = models.BooleanField(verbose_name='야간진료여부')
    image = models.ImageField(upload_to=upload_filepath, blank=True)

    def __str__(self):
        return self.name
    

class HospitalStatus(models.Model):
    CONGESTION_CHOICES = [
        ('매우 혼잡', '매우 혼잡'),
        ('혼잡', '혼잡'),
        ('보통', '보통'),
        ('여유', '여유'),
        ('매우 여유', '매우 여유')
    ]

    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE, related_name='status')
    congestion = models.CharField(max_length=10, choices=CONGESTION_CHOICES, verbose_name='혼잡도')
    available_beds = models.CharField(max_length=10)