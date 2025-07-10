from django.urls import path
from . import views
from .views import *

app_name = 'hospital'

urlpatterns = [
    # 병원 리스트 API(필터링용)
    path("filter-list/", views.filtered_hospitals, name="filtered_hospitals"),

    # 병원 상세 조회 API
    path("info/<int:hospital_id>/", views.hospital_info, name="hospital_info"),

]