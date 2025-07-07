from django.db import models

# Create your models here.
class Specialty(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class Hospital(models.Model):
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=500)
    hos_lat = models.FloatField(verbose_name='위도')
    hos_lng = models.FloatField(verbose_name='경도')
    phone = models.CharField(max_length=20)
    is_emergency = models.BooleanField(default=False, verbose_name='응급실 여부')
    open_24 = models.BooleanField(default=False, verbose_name='24시간 운영여부')
    nightcare = models.BooleanField(default=False, verbose_name='야간진료여부')
    business_hour = models.CharField(max_length=200)
    image = models.ImageField(upload_to='hospital_images/', null=True, blank=True)
    specialties = models.ManyToManyField(Specialty, related_name='hospitals') #N:M으로 연결

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
    hospital = models.OneToOneField(Hospital, on_delete=models.CASCADE, related_name='status')
    #공통 필드 
    congestion = models.CharField(max_length=10, choices=CONGESTION_CHOICES)  
    #실시간 병상정보(응급실 바로 찾기)
    available_beds = models.IntegerField(max_length=50)
    #실시간 대기인원(증상별 병원 찾기)
    waiting_count = models.IntegerField(max_length=50)


    # def __str__(self):
    





