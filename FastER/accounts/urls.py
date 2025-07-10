from django.urls import path
from .views import *

app_name = 'accounts'

urlpatterns = [
    #path('', map, name='map'),
    path('signup/', signup, name='signup'),
    path('login/', login, name='login'),
    path('symptom/', symptom_search, name='symptom_search'),
]