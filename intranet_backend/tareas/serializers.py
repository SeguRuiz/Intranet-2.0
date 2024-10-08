from rest_framework import serializers
from .models import Info_tareas, Tareas_asignadas, Intermedia_archivos_entregables, Intermedia_tareas_archivos

class Info_tareasSerializer(serializers.ModelSerializer):
  class Meta:
    model = Info_tareas
    fields = '__all__'
    

class Tareas_asignadasSerializer(serializers.ModelSerializer):
  class Meta:
    model = Tareas_asignadas
    fields = '__all__'
    
    
class Intermedia_archivos_entregablesSerializer(serializers.ModelSerializer):
  class Meta:
    model = Intermedia_archivos_entregables
    fields = '__all__'
    
    
class Intermedia_tareas_archivosSerializer(serializers.ModelSerializer):
  class Meta:
    model = Intermedia_tareas_archivos
    fields = '__all__'