from django.shortcuts import render
import json
import requests
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.viewsets import ModelViewSet
from files.models import Archivos_referencia
from files.serializers import ArchivosSerializer
from .models import Info_tareas, Tareas_asignadas, Intermedia_archivos_entregables, Intermedia_tareas_archivos
from .serializers import Info_tareasSerializer, Tareas_asignadasSerializer, Intermedia_archivos_entregablesSerializer, Intermedia_tareas_archivosSerializer
from rest_framework.decorators import (
    api_view )

class Info_tareasCreate(ModelViewSet):
  queryset = Info_tareas.objects.all()
  serializer_class =  Info_tareasSerializer
  lookup_field = "pk"
  
class Info_tareasDelete(RetrieveUpdateDestroyAPIView):
  queryset = Info_tareas.objects.all()
  serializer_class = Info_tareasSerializer
  lookup_field = "pk"
  
class Tareas_asignadasCreate(ModelViewSet):
  queryset = Tareas_asignadas.objects.all()
  serializer_class =  Tareas_asignadasSerializer
  lookup_field = "pk"
  
class Intermedia_tareas_archivosCreate(ModelViewSet):
  queryset = Intermedia_tareas_archivos.objects.all()
  serializer_class =  Intermedia_tareas_archivosSerializer
  lookup_field = "pk"
  
class Intermedia_archivos_entregablesCreate(ModelViewSet):
  queryset = Intermedia_archivos_entregables.objects.all()
  serializer_class =  Intermedia_archivos_entregablesSerializer
  lookup_field = "pk"
  
  
@api_view(["POST", "GET"])
def guardar_archivo_tareas(request):
  if request.method == "GET":
    data = Archivos_referencia.objects.all()
    
    serializer= ArchivosSerializer(instance=data,many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
  try:
      response = requests.post(
      "https://dknht1by8b.execute-api.us-east-2.amazonaws.com/default/PutData",
      json=request.data,
      )
      files = []
      for n in request.data["files_info"]:
        serializer = ArchivosSerializer(
        data = {"key": n["id"], "nombre": n["nombre"]}
      )
      
        if serializer.is_valid():
            serializer.save()
        
        file = get_object_or_404(Archivos_referencia, pk=serializer.data["id"])
        files.append(file)
      serializer_list = ArchivosSerializer(instance=files, many=True)
      
      return Response(
    {"aws_state":response.ok,"archivo_creado":serializer_list.data},
    status=status.HTTP_200_OK,
  )
  except KeyError:
    return Response(
    {"info":"el objetivo no cuenta con los valores necesarios"},
    status=status.HTTP_400_BAD_REQUEST,
  )
    
@api_view(["DELETE"])
def borrar_archivo_tarea(request, pk):
  try:
    archivo = get_object_or_404(Archivos_referencia, pk=pk)
    serializer = ArchivosSerializer(instance=archivo)

    response = requests.post(
       "https://dknht1by8b.execute-api.us-east-2.amazonaws.com/default/PutData",
       json={"method": "DELETE", "key": serializer.data["key"]},
    )
    
    # Verificar si la solicitud a AWS fue exitosa
    if response.ok:
      archivo.delete()
      return Response({"aws_status": "Archivo eliminado exitosamente"}, status=status.HTTP_200_OK)
    else:
      return Response({"error": "Error en AWS", "aws_response": response.json()}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
  
  except Archivos_referencia.DoesNotExist:
    return Response(
      {"error": "Archivo no encontrado"}, status=status.HTTP_404_NOT_FOUND,
    )
  except Exception as e:
    return Response(
      {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
    )

    
@api_view(["POST"])
def obtener_archivo_tarea(request):
    archivo = get_object_or_404(Archivos_referencia, pk=request.data["archivo"]['id'])

    serializer = ArchivosSerializer(instance=archivo)

    request_fetch = requests.post(
        "https://dknht1by8b.execute-api.us-east-2.amazonaws.com/default/PutData",
        json={"method": "GET", "key": serializer.data["key"]},
    )

    content = json.loads(request_fetch.content)
    # print(request_fetch.content)
    return Response({"archivo": content["data_archivo"]}, status=status.HTTP_200_OK)
    
