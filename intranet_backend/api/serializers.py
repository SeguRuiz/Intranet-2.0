from rest_framework import serializers
from .models import Usuarios, Roles, Estudiantes

class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuarios
        fields = [ 'id', 'first_name', 'last_name', 'email','cedula', 'password', 'rol_id', 'username']

class RolesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Roles
        fields = ['tipo', 'id']
        
        
class EstudiantesSerializer(serializers.ModelSerializer):
    class Meta:
        
        model = Estudiantes
        
        fields = '__all__'

