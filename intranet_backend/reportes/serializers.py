from rest_framework import serializers
from rest_framework.serializers import ModelSerializer, Serializer

from .models import Reportes_info


class ReportesSerializer(ModelSerializer):
    class Meta:
        model = Reportes_info
        fields = "__all__"


class ReportesFileSerializer(Serializer):
    file = serializers.FileField()
    reporte_id = serializers.UUIDField()
