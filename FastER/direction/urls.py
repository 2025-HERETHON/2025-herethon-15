from django.urls import path
from . import views

app_name = 'direction'

urlpatterns = [
    path('', views.map_view, name='map'),
    path('route/', views.get_kakao_route, name='get_kakao_route'),
    path('taxi/', views.taxi_view, name='taxi_view'),
]