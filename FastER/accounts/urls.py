from django.urls import path
from .views import *

app_name = 'accounts'

urlpatterns = [
    path("search/history", SearchHistoryView.as_view(), name="search_history" )
]