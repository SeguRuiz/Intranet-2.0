from rest_framework import serializers
from .models import Usuarios, Roles, Estudiantes

class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuarios
        fields = ['username', 'nombre', 'apellidos', 'email','cedula', 'password', 'rol_id']

class RolesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Roles
        fields = ['tipo', 'id']
        
        
class EstudiantesSerializer(serializers.ModelSerializer):
    class Meta:
        
        model = Estudiantes
        
        fields = '__all__'

