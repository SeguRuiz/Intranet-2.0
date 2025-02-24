from rest_framework import serializers

from .models import (
    Avisos,
    Cursos,
    Grupos,
    Grupos_cursos_intermedia,
    Intengrantes_de_grupo,
    Sedes,
)


class AvisosListSerializer(serializers.ModelSerializer):
    url = serializers.CharField()
    img_nombre = serializers.CharField()
    perfil_url = serializers.CharField()
    usuario_nombre = serializers.CharField()
    usuario_apellidos = serializers.CharField()

    class Meta:
        model = Avisos
        fields = "__all__"


class AvisosAndFileSerializer(serializers.Serializer):
    usuario_id = serializers.IntegerField()
    archivo = serializers.FileField()
    
    class Meta:
        fields = ["usuario_id", "archivo"]


class AvisosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Avisos
        fields = "__all__"


class GruposSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grupos
        fields = "__all__"


class SedesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sedes
        fields = "__all__"


class IntengratesGruposSerializer(serializers.ModelSerializer):
    class Meta:
        model = Intengrantes_de_grupo
        fields = "__all__"


class CursosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cursos
        fields = "__all__"


class GruposCursosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grupos_cursos_intermedia
        fields = "__all__"
