import json

import requests
from cursos_contenidos.models import SubContenidos
from django.shortcuts import get_object_or_404
from reportes.models import Reportes_info
from rest_framework import status
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import Archivos_referencia
from .serializers import ArchivosSerializer


class ArchivosCreate(ModelViewSet):
    queryset = Archivos_referencia.objects.all()
    serializer_class = ArchivosSerializer
    lookup_field = "pk"
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]


class ArchivosEdit(RetrieveUpdateDestroyAPIView):
    queryset = Archivos_referencia.objects.all()
    serializer_class = ArchivosSerializer
    lookup_field = "pk"
    permission_classes = [IsAdminUser]
    authentication_classes = [JWTAuthentication]


@api_view(["POST", "GET"])
@permission_classes([IsAdminUser])
@authentication_classes([JWTAuthentication])
def guardar_archivo(request):
    if request.method == "GET":
        # Recupera todos los archivos de referencia de la base de datos
        data = Archivos_referencia.objects.all()

        # Serializa la lista de archivos
        serializer = ArchivosSerializer(instance=data, many=True)
        # Devuelve la lista de archivos serializados con un código de estado 200 OK
        return Response(serializer.data, status=status.HTTP_200_OK)

    try:
        # Realiza una solicitud POST a un endpoint externo
        response = requests.post(
            "https://dknht1by8b.execute-api.us-east-2.amazonaws.com/default/PutData",
            json=request.data,
        )
        files = []  # Lista para almacenar los archivos creados

        for n in request.data["files_info"]:
            # Serializa la información de cada archivo recibido
            serializer = ArchivosSerializer(
                data={"key": n["id"], "nombre": n["nombre"]}
            )

            if serializer.is_valid():
                # Guarda el archivo si el serializer es válido
                serializer.save()

            # Obtiene el archivo recién creado
            file = get_object_or_404(Archivos_referencia, pk=serializer.data["id"])
            # Obtiene el subcontenido correspondiente
            subcontenido = get_object_or_404(
                SubContenidos, pk=request.data["subcontenido"]
            )
            # Asocia el archivo al subcontenido
            subcontenido.archivo = file
            subcontenido.save()

            # Agrega el archivo a la lista
            files.append(file)

        # Serializa la lista de archivos creados
        serializer_list = ArchivosSerializer(instance=files, many=True)

        # Devuelve la respuesta con el estado de la solicitud a AWS y los archivos creados
        return Response(
            {"aws_state": response.ok, "archivo_creado": serializer_list.data},
            status=status.HTTP_200_OK,
        )

    except KeyError:
        # Maneja el caso en que falta algún dato necesario en la solicitud
        return Response(
            {"info": "el objeto no cuenta con los valores necesarios"},
            status=status.HTTP_400_BAD_REQUEST,
        )



@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
@authentication_classes([IsAdminUser])
def delete_archivo(request):
    try:
        # Obtiene el archivo de referencia utilizando el id proporcionado
        archivo = get_object_or_404(Archivos_referencia, pk=request.data["id"])

        # Serializa el archivo para obtener su información
        serializer = ArchivosSerializer(instance=archivo)

        # Realiza una solicitud POST a un servicio externo para eliminar el archivo
        response = requests.post(
            "https://dknht1by8b.execute-api.us-east-2.amazonaws.com/default/PutData",
            json={"method": "DELETE", "key": serializer.data["key"]},
        )

        # Elimina el archivo de la base de datos
        archivo.delete()

        # Devuelve el estado de la respuesta de la solicitud a AWS
        return Response({"aws_status": response.ok}, status=status.HTTP_200_OK)
    except KeyError:
        # Maneja el caso en que no se proporciona el id del archivo
        return Response(
            {"error": "El objeto no cuenta con el id requerido"},
            status=status.HTTP_400_BAD_REQUEST,
        )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def get_archivo(request):
    # Obtiene el archivo de referencia utilizando el id proporcionado
    archivo = get_object_or_404(Archivos_referencia, pk=request.data["archivo"])

    # Serializa el archivo para obtener su información
    serializer = ArchivosSerializer(instance=archivo)

    # Realiza una solicitud POST a un servicio externo para obtener el archivo
    request_fetch = requests.post(
        "https://dknht1by8b.execute-api.us-east-2.amazonaws.com/default/PutData",
        json={"method": "GET", "key": serializer.data["key"]},
    )

    # Carga el contenido de la respuesta de la solicitud
    content = json.loads(request_fetch.content)

    # Devuelve el contenido del archivo en la respuesta
    return Response({"archivo": content["data_archivo"]}, status=status.HTTP_200_OK)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def guardar_reporte(request):
    try:
        # Realiza una solicitud POST a un servicio externo para guardar el archivo
        requests.post(
            "https://dknht1by8b.execute-api.us-east-2.amazonaws.com/default/PutData",
            json=request.data["file"],
        )

        # Procesa cada archivo incluido en la solicitud
        for n in request.data["file"]["files_info"]:
            # Serializa la información del archivo
            archivo = ArchivosSerializer(data={"key": n["id"], "nombre": n["nombre"]})

            if archivo.is_valid():
                # Guarda el archivo si el serializador es válido
                archivo.save()

            # Obtiene el archivo recién guardado
            file_saved = get_object_or_404(Archivos_referencia, pk=archivo.data["id"])
            # Obtiene el reporte correspondiente
            reporte = get_object_or_404(Reportes_info, pk=request.data["reporte_id"])
            # Asocia el archivo al reporte y marca como comprobante presentado
            reporte.archivo_id = file_saved
            reporte.presento_comprobante = True
            reporte.save()

        # Devuelve un mensaje de éxito junto con el id del archivo guardado
        return Response(
            {"aws": "el archivo se gurado", "archivo_id": file_saved.id},
            status=status.HTTP_200_OK,
        )

    except KeyError:
        # Maneja el caso en que falta algún dato necesario en la solicitud
        return Response(
            {"info": "Objeto mal formulado"}, status=status.HTTP_400_BAD_REQUEST
        )
