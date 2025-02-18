from django.shortcuts import get_object_or_404
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import Estudiantes, Roles, Usuarios


class EstudianteSerializerUnion(serializers.ModelSerializer):
    nombre_usuario = serializers.CharField()
    apellidos_usuario = serializers.CharField()
    correo = serializers.EmailField()
    id_user = serializers.IntegerField()

    class Meta:
        model = Estudiantes
        fields = [
            "id",
            "nota",
            "reportes",
            "activo",
            "fecha_creacion",
            "faltas",
            "fecha_actualizacion",
            "nombre_usuario",
            "apellidos_usuario",
            "correo",
            "id_user",
        ]


class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuarios
        fields = [
            "id",
            "first_name",
            "last_name",
            "email",
            "cedula",
            "password",
            "rol_id",
            "username",
            "is_staff",
            "is_socioemocional",
            "tipo_cedula",
            "perfilUrl",
        ]


class RolesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Roles
        fields = ["tipo", "id"]


class UsersPrivateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuarios
        fields = [
            "id",
            "first_name",
            "last_name",
            "email",
            "cedula",
            "username",
            "tipo_cedula",
            "perfilUrl",
        ]


class EstudiantesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estudiantes

        fields = "__all__"


class CustomJWTSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        credentials = {"username": "", "password": attrs.get("password")}

        user_obj = get_object_or_404(Usuarios, email=attrs.get("username"))
        if user_obj:
            credentials["username"] = user_obj.username

        data = super().validate(credentials)
        refresh = self.get_token(self.user)

        refresh["email"] = self.user.email
        refresh["id"] = self.user.id

        data["email"] = self.user.email
        data["id"] = self.user.id

        return data
