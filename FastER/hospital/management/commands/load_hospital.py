import os
import csv
from datetime import datetime
from django.core.management.base import BaseCommand
from hospital.models import Hospital

class Command(BaseCommand):
    help = 'CSV 파일로부터 병원 데이터를 로드합니다.'

    def handle(self, *args, **kwargs):
        BASE_DIR = os.path.dirname(os.path.abspath(__file__))
        csv_path = os.path.abspath(os.path.join(BASE_DIR, '../../data/hospital_data.csv'))

        with open(csv_path, newline='', encoding='EUC-KR') as f:
            reader = csv.DictReader(f)
            for row in reader:
                # 시간 파싱
                def parse_time(value):
                    try:
                        return datetime.strptime(value.strip(), '%H:%M').time() if value else None
                    except ValueError:
                        return None

                hospital = Hospital.objects.create(
                    name=row.get('name', '').strip(),
                    address=row.get('address', '').strip(),
                    hos_lat=float(row.get('hos_lat', 0)),
                    hos_lng=float(row.get('hos_lng', 0)),
                    phone=row.get('phone', '').strip() or None,
                    is_emergency=row.get('is_emergency', '').strip().upper() == 'TRUE',
                    nightcare=row.get('nightcare', '').strip().upper() == 'TRUE',
                    start_hour=parse_time(row.get('start_hour', '')),
                    end_hour=parse_time(row.get('end_hour', '')),
                    image=row.get('image', '').strip() or None  # FileField에선 None 가능
                )

                # specialties는 나중에 처리 가능 (예: row['specialties']를 쉼표로 분리해서 추가)
                # ex: "내과,소아과"
                # 추후 필요하면 Specialty 모델과 연결해서 추가 가능

        self.stdout.write(self.style.SUCCESS('✅ 병원 데이터 로드 완료'))
