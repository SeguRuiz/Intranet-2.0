from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Usuarios, Roles, Estudiantes
# Register your models here.
admin.site.register(Usuarios)
admin.site.register(Roles)
admin.site.register(Estudiantes)
