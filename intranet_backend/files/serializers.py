from rest_framework import serializers
from .models import  Archivos_referencia

class ArchivosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Archivos_referencia
        fields = '__all__'
        
class FileSerializer(serializers.Serializer):
    file = serializers.FileField()
 