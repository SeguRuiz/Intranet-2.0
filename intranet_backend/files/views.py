from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.viewsets import ModelViewSet
from .models import Tipos_archivos, Archivos_referencia
from .serializers import TiposArchivosSerializer, ArchivosSerializer

class TiposArchivosCreate(ModelViewSet):
    queryset = Tipos_archivos.objects.all()
    serializer_class = TiposArchivosSerializer
    lookup_field = 'pk'

class TiposArchivosEdit(RetrieveUpdateDestroyAPIView):
    queryset = Tipos_archivos.objects.all()
    serializer_class = TiposArchivosSerializer
    lookup_field = 'pk'
    
class ArchivosCreate(ModelViewSet):
    queryset = Archivos_referencia.objects.all()
    serializer_class = ArchivosSerializer
    lookup_field = 'pk'

class ArchivosEdit(RetrieveUpdateDestroyAPIView):
    queryset = Archivos_referencia.objects.all()
    serializer_class = ArchivosSerializer
    lookup_field = 'pk'