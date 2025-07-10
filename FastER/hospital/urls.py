from django.urls import path
from . import views
from .views import *

app_name = 'hospital'

urlpatterns = [
    # 지도 템플릿 뷰
    path("emergency-map/", views.emergency_map_view, name="emergency_map"),
    path("symptom-map/", views.symptom_map_view, name="symptom_map"),

    # 병원 목록 API
    path("emergency-list/", views.emergency_hospitals, name="emergency_hospitals"),
    path("filter-list/", views.filtered_hospitals, name="filtered_hospitals"),

    # 병원 상세 조회 API
    path("info/<int:hospital_id>/", views.hospital_info, name="hospital_info"),

    path('', views.map_hsp_view, name='hospital'),
]