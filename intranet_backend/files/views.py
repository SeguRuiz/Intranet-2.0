import datetime
import json
import mimetypes
import os

import requests
from cursos_contenidos.models import SubContenidos
from django.shortcuts import get_object_or_404
from dotenv import load_dotenv
from google.cloud import storage
from google.oauth2 import service_account
from google_auth import project_root as here
from google_auth import read_credentials
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

from .models import Archivos_referencia, GoogleCloudBucketFiles
from .serializers import (
    ArchivosSerializer,
    GoogleCloudBucketFilesSerializer,
    SubContFileSerializer,
)

read_credentials()


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


def upload_file_to_bucket(bucket_name, file, folder_name: str | None = None):
    load_dotenv()
    creds_path = here / os.getenv("GOOGLE_CREDENTIALS_FILE")
    creds_init = service_account.Credentials.from_service_account_file(creds_path)
    google_client = storage.Client(credentials=creds_init)

    bucket = google_client.get_bucket(bucket_name)

    blob = (
        bucket.blob(file.name)
        if not folder_name
        else bucket.blob(f"{folder_name}/{file.name}")
    )
    blob_type, _ = mimetypes.guess_type(file.name)
    
    blob.upload_from_file(file, content_type=blob_type)

    return f"File {file.name} uploaded"


def delete_file(bucket_name, blob_name, folder_name: str | None = None):
    load_dotenv()
    creds_path = here / os.getenv("GOOGLE_CREDENTIALS_FILE")
    creds_init = service_account.Credentials.from_service_account_file(creds_path)
    google_client = storage.Client(credentials=creds_init)

    bucket = google_client.get_bucket(bucket_name)

    blob = (
        bucket.blob(f"{folder_name}/{blob_name}")
        if folder_name
        else bucket.blob(blob_name)
    )
    blob.delete()

    return (
        f"File {blob_name} deleted"
        if folder_name
        else f"File {folder_name}/{blob_name} deleted"
    )


def is_valid_pdf(file):
    mime_type, _ = mimetypes.guess_type(file.name)
    return mime_type == "application/pdf"


def is_valid_img(file):
    mime_type, _ = mimetypes.guess_type(file.name)
    return mime_type in [
        "image/jpe",
        "image/jpg",
        "image/png",
        "image/svg+xml",
        "image/jpeg",
        "image/pdf",
    ]


def get_files_cloud(bucket_name, expiration_minutes=2, folderName=None):
    load_dotenv()
    creds_path = here / os.getenv("GOOGLE_CREDENTIALS_FILE")
    creds_init = service_account.Credentials.from_service_account_file(creds_path)
    google_client = storage.Client(credentials=creds_init)

    bucket = google_client.get_bucket(bucket_name)

    blobs = bucket.list_blobs(prefix=folderName)
    files_data = []

    for blob in blobs:
        blob_name: str = blob.name
        if blob_name == folderName or blob_name.endswith("/"):
            continue
        blob_name = blob_name.split("/")[-1]
        signed_url = blob.generate_signed_url(
            version="v4",
            expiration=datetime.timedelta(minutes=expiration_minutes),
            method="GET",
        )
        file_type, _ = mimetypes.guess_type(blob_name)
        files_data.append({"name": blob_name, "url": signed_url, 'type': file_type})

    return files_data


def create_file_signed_url_by_name(
    folder_name: str | None = None, name: str = None, expiration_minutes=15
):
    load_dotenv()
    creds_path = here / os.getenv("GOOGLE_CREDENTIALS_FILE")
    creds_init = service_account.Credentials.from_service_account_file(creds_path)
    google_client = storage.Client(credentials=creds_init)

    bucket = google_client.get_bucket(os.getenv("GOOGLE_CLOUD_BUCKET"))

    blob = bucket.blob(f"{folder_name}/{name}") if folder_name else bucket.blob(name)
    
    blob_type, _ = mimetypes.guess_type(name)

    signed_url = blob.generate_signed_url(
        version="v4",
        expiration=datetime.timedelta(minutes=expiration_minutes),
        method="GET",
    )

    expires_in: datetime = (
        datetime.datetime.now()
        - datetime.timedelta(hours=6)
        + datetime.timedelta(minutes=expiration_minutes - 1)
    )

    return signed_url, expires_in, blob_type


@api_view(["POST", "GET"])
@permission_classes([JWTAuthentication])
@authentication_classes([IsAdminUser])
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


@api_view(["POST"])
@permission_classes([IsAdminUser])
@authentication_classes([JWTAuthentication])
def save_file_of_subcont_to_google_cloud(request):
    load_dotenv()
    fileSerializer = SubContFileSerializer(data=request.data)
    if fileSerializer.is_valid():
        if not is_valid_pdf(fileSerializer.validated_data["file"]):
            return Response(
                {"info": "El archivo no es un PDF"},
                status=status.HTTP_406_NOT_ACCEPTABLE,
            )
        file = fileSerializer.validated_data["file"]
        file_name = file.name

        if GoogleCloudBucketFiles.objects.filter(nombre=file_name).exists():
            return Response(
                {"info": "El archivo ya existe"},
                status=status.HTTP_422_UNPROCESSABLE_ENTITY,
            )

        google_bucket_serializer = GoogleCloudBucketFilesSerializer(
            data={
                "nombre": file_name,
            }
        )

        if google_bucket_serializer.is_valid():
            google_bucket_serializer.save()
        else:
            return Response(
                google_bucket_serializer.errors, status=status.HTTP_400_BAD_REQUEST
            )

        file_from_db = get_object_or_404(GoogleCloudBucketFiles, nombre=file_name)
        subContent_id = fileSerializer.validated_data["subContent_id"]
        subContent = get_object_or_404(SubContenidos, pk=subContent_id)
        subContent.archivo = file_from_db
        subContent.save()

        bucket_name = os.getenv("GOOGLE_CLOUD_BUCKET")
        upload_file_to_bucket(bucket_name, file, os.getenv("FOLDER_ARCHIVOS_CURSOS"))

        signed_url, expires_in = create_file_signed_url_by_name(
            name=file_from_db.nombre,
            folder_name=os.getenv("FOLDER_ARCHIVOS_CURSOS"),
            expiration_minutes=16,
        )

        return Response(
            {
                "id": file_from_db.pk,
                "nombre": file_name,
                "url": signed_url,
                "expira_en": expires_in,
            },
            status=status.HTTP_200_OK,
        )
    else:
        return Response(fileSerializer.errors, status=status.HTTP_400_BAD_REQUEST)


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


@api_view(["DELETE"])
@permission_classes([IsAdminUser])
@authentication_classes([JWTAuthentication])
def delete_file_from_google_cloud_and_subcont(request):
    try:
        file_id: int = request.data["file_id"]
        file = get_object_or_404(GoogleCloudBucketFiles, pk=file_id)
        subcontent = SubContenidos.objects.get(archivo=file)
        file.delete()

        delete_file(
            os.getenv("GOOGLE_CLOUD_BUCKET"),
            file.nombre,
            os.getenv("FOLDER_ARCHIVOS_CURSOS"),
        )

        return Response({"subcontenido_id": subcontent.id}, status=status.HTTP_200_OK)
    except KeyError:
        return Response(
            {"error": "El objeto esta mal formulado"},
            status=status.HTTP_400_BAD_REQUEST,
        )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def get_file_from_google_cloud(request):
    load_dotenv()
    folder_choices = {
        "CC": os.getenv("FOLDER_ARCHIVOS_CURSOS"),
        "RC": os.getenv("FOLDER_ARCHIVOS_REPORTES"),
    }
    try:
        folder = folder_choices[request.data["folder"]]
        file_id: int = request.data["archivo_id"]
        file = get_object_or_404(GoogleCloudBucketFiles, pk=file_id)
        signed_url, expires_in, file_type = create_file_signed_url_by_name(
            name=file.nombre,
            folder_name=folder,
            expiration_minutes=16,
        )

        return Response(
            {"archivo": signed_url, "expira_en": expires_in, "nombre": file.nombre, "tipo_archivo": file_type},
            status=status.HTTP_200_OK,
        )
    except KeyError:
        return Response(
            {"error": "El objeto esta mal formulado"},
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
