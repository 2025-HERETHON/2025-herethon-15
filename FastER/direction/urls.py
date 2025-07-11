from django.urls import path
from .views import *

app_name = 'direction'

urlpatterns = [
    path('', map_emr_view, name='map_emr_view'),
    path('route/', get_kakao_route, name='get_kakao_route'),
    path('taxi/', taxi_view, name='taxi_view'),
    path('map', map_view, name='map_view'),
    path('api/hospitals/', hospitals_api, name='hospitals_api'),
]