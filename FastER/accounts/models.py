from django.db import models
from django.contrib.auth.models import AbstractUser
from hospital.models import Hospital 

# Create your models here.
class User(AbstractUser):
    username = models.CharField(max_length=100, null=True, blank=True) 
    phone = models.CharField(max_length=20, unique=True)  
    email = models.CharField(max_length=20, unique=True)  
    location_lat = models.FloatField(null=True, blank=True) 
    location_lng = models.FloatField(null=True, blank=True)
    consent_location = models.BooleanField(default=False) # 위치 정보 동의 

    # 인증 기준 필드 변경
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username'] 
    

    def __str__(self):
        return self.email 


class Symptom(models.Model):
    CATEGORY_CHOICES = [
        ('GI', '소화기 증상'),
        ('RESP', '호흡기 증상'),
        ('TRAUMA', '외상/근골격'),
        ('INFECT', '감염성/열'),
        ('ETC', '기타 증상'),
    ]
    symptom_category = models.CharField(max_length=10, choices=CATEGORY_CHOICES)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='symptoms')
    description = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    # def __str__(self):

class VisitHistory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='visit_histories')
    hospital = models.ForeignKey(Hospital, on_delete=models.SET_NULL, null=True, related_name='visit_histories')
    via_emergency = models.BooleanField(default=False)
    visited_at = models.DateTimeField()

    # def __str__(self):

#검색창
class SearchHistory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='search_histories')
    keyword = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    #병원 선택 여부 기록 
    selected_hospital=models.ForeignKey('hospital.Hospital', on_delete=models.SET_NULL,
                                        null=True, blank=True, related_name='selected_histories')
    