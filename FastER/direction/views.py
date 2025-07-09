from django.shortcuts import render
import requests
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


def map_view(request):
    return render(request, 'direction/map.html')

def taxi_view(request):
    return render(request, 'direction/taxi.html')

def get_kakao_route(request):
    if request.method == "GET":
        origin = request.GET.get("origin")       # ex) "126.9786567,37.566826"
        destination = request.GET.get("destination")  # ex) "127.033,37.501"

        headers = {
            "Authorization": "KakaoAK b68113441b41493ce9b97d9c36e24afa"  # ← 본인의 REST API 키로 교체
        }
        params = {
            "origin": origin,
            "destination": destination,
            "priority": "RECOMMEND",  # 최적 경로
            "car_fuel": "GASOLINE",
            "car_hipass": False
        }

        kakao_url = "https://apis-navi.kakaomobility.com/v1/directions"
        response = requests.get(kakao_url, headers=headers, params=params)

        return JsonResponse(response.json())