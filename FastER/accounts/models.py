from django.db import models
from django.contrib.auth.models import AbstractUser
from hospital.models import *

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
    symptom_keyword = models.CharField(max_length=100)
    category = models.CharField(max_length=10, choices=CATEGORY_CHOICES)
    specialties = models.ManyToManyField(Specialty, related_name='linked_keywords')
    
    #user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='symptoms')
    #description = models.CharField(max_length=255)
    #created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.symptom_keyword

