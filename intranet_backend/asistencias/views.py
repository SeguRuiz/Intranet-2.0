from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import Asistencias, ReporteDeAsistencias
from .serializers import asistenciasSerializer, reportesDeAsistenciasSerializer



class AsistenciasCreate(ModelViewSet):
    queryset = Asistencias.objects.all()
    serializer_class = asistenciasSerializer
    lookup_field = "pk"
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]


class AsistenciasEdit(RetrieveUpdateDestroyAPIView):
    queryset = Asistencias.objects.all()
    serializer_class = asistenciasSerializer
    lookup_field = "pk"
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

class ReportesDeAsistenciasCreate(ModelViewSet):
    queryset = ReporteDeAsistencias.objects.all()
    serializer_class = reportesDeAsistenciasSerializer
    lookup_field = 'pk'
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
 
class ReportesDeAsistenciasEdit(RetrieveUpdateDestroyAPIView):
    queryset = ReporteDeAsistencias.objects.all()
    serializer_class = reportesDeAsistenciasSerializer
    lookup_field = 'pk'
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
