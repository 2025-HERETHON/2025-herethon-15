from django.urls import path
from .views import *

app_name = 'accounts'

urlpatterns = [
    path('login/', login, name='login'),
    path('signup/', signup, name='signup'),
    path('symptom/', symptom_search, name='symptom_search'),
    path('menu/', menu, name='menu'),
    path('', home, name='home'),
]