from rest_framework import serializers
from .models import  Archivos_referencia, GoogleCloudBucketFiles

class ArchivosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Archivos_referencia
        fields = '__all__'
        
class SubContFileSerializer(serializers.Serializer):
    file = serializers.FileField()
    subContent_id = serializers.UUIDField()
 
class GoogleCloudBucketFilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = GoogleCloudBucketFiles
        fields = '__all__'