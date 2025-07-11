import os
import json
from django.core.management.base import BaseCommand
from hospital.models import Specialty
from accounts.models import Symptom

class Command(BaseCommand):
    help = 'JSON 파일로부터 응급실 병원 데이터를 로드합니다.'

    def handle(self, *args, **kwargs):
        BASE_DIR = os.path.dirname(os.path.abspath(__file__))
        project_root = os.path.abspath(os.path.join(BASE_DIR, '../../../'))  # FastER 루트
        json_path = os.path.join(project_root, 'static', 'data', 'symptom_data.json')

        with open(json_path, encoding='utf-8') as f:
            data = json.load(f)

        for item in data:
            symptom = Symptom.objects.create(
                symptom_keyword=item['symptom_keyword'],
                category=item['category'].strip()  # ' INFECT'처럼 공백 제거
            )

            for spec_name in item['specialties']:
                specialty, _ = Specialty.objects.get_or_create(name=spec_name)
                symptom.specialties.add(specialty)

        self.stdout.write(self.style.SUCCESS('증상 데이터 등록 완료'))