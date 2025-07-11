import os
import json
from datetime import datetime
from django.core.management.base import BaseCommand
from hospital.models import Hospital

class Command(BaseCommand):
    help = 'JSON 파일로부터 응급실 병원 데이터를 로드합니다.'

    def handle(self, *args, **kwargs):
        BASE_DIR = os.path.dirname(os.path.abspath(__file__))
        project_root = os.path.abspath(os.path.join(BASE_DIR, '../../../'))  # FastER 루트
        json_path = os.path.join(project_root, 'static', 'data', 'emergency_data.json')


        with open(json_path, encoding='utf-8') as f:
            data = json.load(f)

        count = 0

        for item in data:
            def parse_time(value):
                try:
                    return datetime.strptime(value.strip(), '%H:%M').time() if value else None
                except Exception:
                    return None

            hospital = Hospital.objects.create(
                name=item.get('name', '').strip(),
                address=item.get('address', '').strip(),
                hos_lat=float(item.get('hos_lat', 0)),
                hos_lng=float(item.get('hos_lng', 0)),
                phone=item.get('phone', '').strip() or None,
                is_emergency=item.get('is_emergency', False),
                nightcare=item.get('nightcare', False),
                start_hour=parse_time(item.get('start_hour', '')),
                end_hour=parse_time(item.get('end_hour', '')),
                image=item.get('image', '').strip() or None
            )

            # Specialty 연결은 추후 확장 가능
            count += 1

        self.stdout.write(self.style.SUCCESS(f'✅ 응급실 병원 {count}개 로드 완료'))