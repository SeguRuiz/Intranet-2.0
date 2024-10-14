import json

import requests
from cursos_contenidos.models import SubContenidos
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .models import Archivos_referencia, Tipos_archivos
from .serializers import ArchivosSerializer, TiposArchivosSerializer


class TiposArchivosCreate(ModelViewSet):
    queryset = Tipos_archivos.objects.all()
    serializer_class = TiposArchivosSerializer
    lookup_field = "pk"


class TiposArchivosEdit(RetrieveUpdateDestroyAPIView):
    queryset = Tipos_archivos.objects.all()
    serializer_class = TiposArchivosSerializer
    lookup_field = "pk"
    


class ArchivosCreate(ModelViewSet):
    queryset = Archivos_referencia.objects.all()
    serializer_class = ArchivosSerializer
    lookup_field = "pk"
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]



class ArchivosEdit(RetrieveUpdateDestroyAPIView):
    queryset = Archivos_referencia.objects.all()
    serializer_class = ArchivosSerializer
    lookup_field = "pk"
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]



@api_view(["POST", "GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def guardar_archivo(request):
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
            subcontenido = get_object_or_404(
                SubContenidos, pk=request.data["subcontenido"]
            )
            subcontenido.archivo = file
            subcontenido.save()

            files.append(file)

        serializer_list = ArchivosSerializer(instance=files, many=True)

        return Response(
            {"aws_state": response.ok, "archivo_creado": serializer_list.data},
            status=status.HTTP_200_OK,
        )

    except KeyError:
        return Response(
            {"info": "el objeto no cuenta con los valores necesarios"},
            status=status.HTTP_400_BAD_REQUEST,
        )


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def delete_archivo(request):
    try:
        archivo = get_object_or_404(Archivos_referencia, pk=request.data["id"])

        serializer = ArchivosSerializer(instance=archivo)

        response = requests.post(
            "https://dknht1by8b.execute-api.us-east-2.amazonaws.com/default/PutData",
            json={"method": "DELETE", "key": serializer.data["key"]},
        )

        archivo.delete()

        return Response({"aws_status": response.ok}, status=status.HTTP_200_OK)
    except KeyError:
        return Response(
            {"error": "El objeto no cuenta con el id requerido"},
            status=status.HTTP_400_BAD_REQUEST,
        )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def get_archivo(request):
    archivo = get_object_or_404(Archivos_referencia, pk=request.data["archivo"])

    serializer = ArchivosSerializer(instance=archivo)

    request_fetch = requests.post(
        "https://dknht1by8b.execute-api.us-east-2.amazonaws.com/default/PutData",
        json={"method": "GET", "key": serializer.data["key"]},
    )

    content = json.loads(request_fetch.content)

    return Response({"archivo": content["data_archivo"]}, status=status.HTTP_200_OK)
