from rest_framework import serializers
from .models import Contenidos, SubContenidos, Comunicados

class ContenidosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contenidos
        fields = '__all__'

class SubContenidosSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubContenidos
        fields = '__all__'
        

class ComunicadosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comunicados
        fields = '__all__'
        
