from django.shortcuts import render
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.viewsets import ModelViewSet
from .models import Info_tareas, Tareas_asignadas, Intermedia_archivos_entregables, Intermedia_tareas_archivos
from .serializers import Info_tareasSerializer, Tareas_asignadasSerializer, Intermedia_archivos_entregablesSerializer, Intermedia_tareas_archivosSerializer

class Info_tareasCreate(ModelViewSet):
  queryset = Info_tareas.objects.all()
  serializer_class =  Info_tareasSerializer
  lookup_field = "pk"
  
class Info_tareasDelete(RetrieveUpdateDestroyAPIView):
  queryset = Info_tareas.objects.all()
  serializer_class = Info_tareasSerializer
  lookup_field = "pk"