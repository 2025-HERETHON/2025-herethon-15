from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(Specialty)
@admin.register(Hospital)
class HospitalAdmin(admin.ModelAdmin):
    filter_horizontal = ('specialties',)
admin.site.register(HospitalStatus)