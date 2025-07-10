import csv
import os
from django.core.management.base import BaseCommand
from hospital.models import Hospital

class Command(BaseCommand):
    help = 'CSV 파일로부터 응급실 병원 데이터를 로드합니다.'

    def handle(self, *args, **kwargs):
        BASE_DIR = os.path.dirname(os.path.abspath(__file__))
        csv_path = os.path.join(BASE_DIR, '../../data/emergency_cleaned.csv')
        csv_path = os.path.abspath(csv_path)  # 경로 정리

        with open(csv_path, newline='', encoding='EUC-KR') as f:
            reader = csv.DictReader(f)
            for row in reader:
                Hospital.objects.create(
                    name=row['기관명'],
                    address=row['주소'],
                    hos_lat=row['병원위도'],
                    hos_lng=row['병원경도'],
                    is_emergency=True
                )
        self.stdout.write(self.style.SUCCESS('✅ 응급실 데이터 로드 완료'))
