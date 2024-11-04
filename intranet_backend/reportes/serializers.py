from rest_framework.serializers import ModelSerializer
from .models import Reportes_info

class ReportesSerializer(ModelSerializer):
    class Meta:
        model = Reportes_info
        fields = '__all__'
     