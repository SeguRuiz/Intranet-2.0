from rest_framework import serializers
from .models import Tipos_archivos, Archivos_referencia

class ArchivosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Archivos_referencia
        fields = '__all__'
        
class TiposArchivosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tipos_archivos
        fields = '__all__'