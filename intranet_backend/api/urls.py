from django.urls import path, include
from .views import register, login, roles, aignar_rol_a
urlpatterns = [
    path('register/',register, name='register'),
    path('login/', login, name='login'),
    path('roles/', roles, name='roles' ),
    path('asignar_rol_a/<int:pk>', aignar_rol_a, name='asignar_rol_a')
]
