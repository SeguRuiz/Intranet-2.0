import json

import requests
from django.shortcuts import get_list_or_404, get_object_or_404
from files.models import Archivos_referencia
from files.serializers import ArchivosSerializer
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .models import (
    Info_tareas,
    Intermedia_archivos_entregables,
    Intermedia_tareas_archivos,
    Tareas_asignadas,
)
from .serializers import (
    Info_tareasSerializer,
    Intermedia_archivos_entregablesSerializer,
    Intermedia_tareas_archivosSerializer,
    Tareas_asignadasSerializer,
)


class Info_tareasCreate(ModelViewSet):
    queryset = Info_tareas.objects.all()
    serializer_class = Info_tareasSerializer
    lookup_field = "pk"


class Info_tareasDelete(RetrieveUpdateDestroyAPIView):
    queryset = Info_tareas.objects.all()
    serializer_class = Info_tareasSerializer
    lookup_field = "pk"


class Tareas_asignadasCreate(ModelViewSet):
    queryset = Tareas_asignadas.objects.all()
    serializer_class = Tareas_asignadasSerializer
    lookup_field = "pk"


class Intermedia_tareas_archivosCreate(ModelViewSet):
    queryset = Intermedia_tareas_archivos.objects.all()
    serializer_class = Intermedia_tareas_archivosSerializer
    lookup_field = "pk"


class Intermedia_archivos_entregablesCreate(ModelViewSet):
    queryset = Intermedia_archivos_entregables.objects.all()
    serializer_class = Intermedia_archivos_entregablesSerializer
    lookup_field = "pk"


@api_view(["POST", "GET"])
def guardar_archivo_tareas(request):
    if request.method == "GET":
        data = Archivos_referencia.objects.all()

        serializer = ArchivosSerializer(instance=data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    try:
        response = requests.post(
            "https://dknht1by8b.execute-api.us-east-2.amazonaws.com/default/PutData",
            json=request.data,
        )
        files = []
        for n in request.data["files_info"]:
            serializer = ArchivosSerializer(
                data={"key": n["id"], "nombre": n["nombre"]}
            )

            if serializer.is_valid():
                serializer.save()

            file = get_object_or_404(Archivos_referencia, pk=serializer.data["id"])
            tarea = get_object_or_404(Info_tareas, pk=request.data["id"])
            files.append(file)

            serializer_intermedia_tarea = Intermedia_tareas_archivosSerializer(
                data={"archivo_id": file.pk, "info_tarea_id": tarea.pk}
            )
            if serializer_intermedia_tarea.is_valid():
                serializer_intermedia_tarea.save()

        serializer_list = ArchivosSerializer(instance=files, many=True)

        return Response(
            {"aws_state": response.ok, "archivo_creado": serializer_list.data},
            status=status.HTTP_200_OK,
        )
    except KeyError:
        return Response(
            {"info": "el objetivo no cuenta con los valores necesarios"},
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
            return Response(
                {"aws_status": "Archivo eliminado exitosamente"},
                status=status.HTTP_200_OK,
            )
        else:
            return Response(
                {"error": "Error en AWS", "aws_response": response.json()},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    except Archivos_referencia.DoesNotExist:
        return Response(
            {"error": "Archivo no encontrado"},
            status=status.HTTP_404_NOT_FOUND,
        )
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["POST"])
def obtener_archivo_tarea(request):
    archivo = get_object_or_404(Archivos_referencia, pk=request.data["archivo"]["id"])

    serializer = ArchivosSerializer(instance=archivo)

    request_fetch = requests.post(
        "https://dknht1by8b.execute-api.us-east-2.amazonaws.com/default/PutData",
        json={"method": "GET", "key": serializer.data["key"]},
    )

    content = json.loads(request_fetch.content)
    return Response({"archivo": content["data_archivo"]}, status=status.HTTP_200_OK)


@api_view(["POST"])
def asignar_tareas_estudiantes(request):
    try:
        tarea_info: dict = request.data["tarea_info"]
        estudiantes: list[str] = request.data["estudiantes"]
        for n in estudiantes:
            tarea_info.update(estudiante_id=n["estu_id"])
            Tareas_asignadas = Tareas_asignadasSerializer(data=tarea_info)
            if Tareas_asignadas.is_valid():
                Tareas_asignadas.save()

        return Response({"Info": "Se agrego con exito"}, status=status.HTTP_200_OK)

    except KeyError:
        return Response(
            {"Info": "Objeto mal formulado"}, status=status.HTTP_400_BAD_REQUEST
        )


@api_view(["POST", "GET"])
def subir_tarea_estudiante(request):
    if request.method == "GET":
        data = Intermedia_archivos_entregables.objects.all()

        serializer_intermedia_archivo_entregables = (
            Intermedia_archivos_entregablesSerializer(instance=data, many=True)
        )
        return Response(
            serializer_intermedia_archivo_entregables.data, status=status.HTTP_200_OK
        )
    try:
        response = requests.post(
            "https://dknht1by8b.execute-api.us-east-2.amazonaws.com/default/PutData",
            json=request.data,
        )
        archivos = []
        for n in request.data["files_info"]:
            serializer = ArchivosSerializer(
                data={"key": n["id"], "nombre": n["nombre"]}
            )
            if serializer.is_valid():
                serializer.save()

            archivo = get_object_or_404(Archivos_referencia, pk=serializer.data["id"])
            asignacion_id = get_object_or_404(
                Tareas_asignadas,
                estudiante_id=request.data["estudiante_id"],
                info_tarea_id=request.data["info_tarea_id"],
            )
            archivos.append(archivo)

            serializer_intermedia_archivo_entregables = (
                Intermedia_archivos_entregablesSerializer(
                    data={
                        "archivo_id": archivo.pk,
                        "asignacion_id": asignacion_id.pk,
                        "info_tarea_id": request.data["info_tarea_id"],
                    }
                )
            )
            if serializer_intermedia_archivo_entregables.is_valid():
                serializer_intermedia_archivo_entregables.save()

        list_archives = ArchivosSerializer(instance=archivos, many=True)

        return Response({"Info": list_archives.data}, status=status.HTTP_200_OK)

    except KeyError:
        return Response(
            {"Info": "Hubo un error al subir el archivo de la tarea"},
            status=status.HTTP_400_BAD_REQUEST,
        )


@api_view(["POST"])
def mostrar_archivo(request):
    try:
        tarea_id = request.data["info_tarea_id"]
        archivo_tarea = Intermedia_tareas_archivos.objects.filter(info_tarea_id=tarea_id).first()
            
        
        archivo_tarea_serializer = Intermedia_tareas_archivosSerializer(
            instance=archivo_tarea
        )
        archivo = get_list_or_404(
            Archivos_referencia, pk=archivo_tarea_serializer.data["archivo_id"]
        )
        archivo_serializer = ArchivosSerializer(instance=archivo, many=True)

        return Response(archivo_serializer.data, status=status.HTTP_200_OK)

    except KeyError:
        return Response(
            {"Info": "No se logró hacer el post"}, status=status.HTTP_400_BAD_REQUEST
        )


@api_view(["POST"])
def get_tareas_de_curso(request):
    try:
        curso_id: str = request.data["curso_id"]
        tareas = Info_tareas.objects.filter(cursos=curso_id)
        tarea_serializer = Info_tareasSerializer(instance=tareas, many=True)

        return Response(tarea_serializer.data, status=status.HTTP_200_OK)

    except KeyError:
        return Response(
            {"info": "objeto mal formulado"}, status=status.HTTP_400_BAD_REQUEST
        )
