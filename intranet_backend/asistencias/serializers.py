from rest_framework.serializers import ModelSerializer

from .models import Asistencias, ReporteDeAsistencias


class asistenciasSerializer(ModelSerializer):
    class Meta:
        model = Asistencias
        fields = "__all__"


class reportesDeAsistenciasSerializer(ModelSerializer):
    class Meta:
        model = ReporteDeAsistencias
        fields = "__all__"

