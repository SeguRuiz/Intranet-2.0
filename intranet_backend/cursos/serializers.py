from rest_framework import serializers

from .models import Grupos, Intengrantes_de_grupo, Sedes, Cursos, Grupos_cursos_intermedia


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
        fields = '__all__'

class GruposCursosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grupos_cursos_intermedia
        fields = '__all__'