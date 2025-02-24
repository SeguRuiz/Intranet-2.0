import datetime
import mimetypes
import os

from api.models import Usuarios
from cursos_contenidos.models import SubContenidos
from django.shortcuts import get_object_or_404
from django.utils import timezone
from dotenv import load_dotenv
from google.cloud import storage
from google.oauth2 import service_account
from google_auth import project_root as here
from google_auth import read_credentials
from rest_framework import status
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListAPIView
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import Archivos_referencia, GoogleCloudBucketFiles
from .serializers import (
    ArchivosSerializer,
    GoogleCloudBucketFilesSerializer,
    PerfilImgSerializer,
    SubContFileSerializer,
)

read_credentials()
load_dotenv()





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


def delete_file(bucket_name, blob_name: str, folder_name: str | None = None):
    load_dotenv()
    creds_path = here / os.getenv("GOOGLE_CREDENTIALS_FILE")
    creds_init = service_account.Credentials.from_service_account_file(creds_path)
    google_client = storage.Client(credentials=creds_init)

    bucket = google_client.get_bucket(bucket_name)

    if not len(blob_name.split("/")) > 1:
        blob = (
            bucket.blob(f"{folder_name}/{blob_name}")
            if folder_name
            else bucket.blob(blob_name)
        )
        blob.delete()
    else:
        blob = bucket.blob(blob_name)
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
        files_data.append({"name": blob_name, "url": signed_url, "type": file_type})

    return files_data


def create_file_signed_url_by_name(
    folder_name: str | None = None, name: str = None, expiration_minutes=15
):
    load_dotenv()
    creds_path = here / os.getenv("GOOGLE_CREDENTIALS_FILE")
    creds_init = service_account.Credentials.from_service_account_file(creds_path)
    google_client = storage.Client(credentials=creds_init)

    bucket = google_client.get_bucket(os.getenv("GOOGLE_CLOUD_BUCKET"))

    blob = bucket.blob(f"{folder_name}/{name}") if folder_name and not len(name.split('/')) > 1 else bucket.blob(name)

    blob_type, _ = mimetypes.guess_type(name)

    expires_in = timezone.now() + datetime.timedelta(minutes=expiration_minutes)

    signed_url = blob.generate_signed_url(
        version="v4",
        expiration=expires_in,
        method="GET",
    )

    return signed_url, expires_in, blob_type


def get_or_recreate_url_file(folder_name: str, name: str, expiration_minutes: int = 60):
    try:
        file = GoogleCloudBucketFiles.objects.get(nombre=name)
        file_type, _ = mimetypes.guess_type(name)

        if (
            file.expiracion is None
            or (file.expiracion - datetime.timedelta(minutes=2)) < timezone.now()
        ):
            signed_url, expira_en, blob_type = create_file_signed_url_by_name(
                folder_name=folder_name,
                name=name,
                expiration_minutes=expiration_minutes,
            )

            file.expiracion = expira_en
            file.url = signed_url
            file.save()
            return [signed_url, expira_en, file_type]

        return [file.url, file.expiracion, file_type]
    except GoogleCloudBucketFiles.DoesNotExist:
        return [None, None]


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

        if GoogleCloudBucketFiles.objects.filter(
            nombre=f"{os.getenv('FOLDER_ARCHIVOS_CURSOS')}/{file_name}"
        ).exists():
            return Response(
                {"info": "El archivo ya existe"},
                status=status.HTTP_422_UNPROCESSABLE_ENTITY,
            )

        bucket_name = os.getenv("GOOGLE_CLOUD_BUCKET")
        upload_file_to_bucket(bucket_name, file, os.getenv("FOLDER_ARCHIVOS_CURSOS"))

        signed_url, expires_in, file_type = create_file_signed_url_by_name(
            name=file_name,
            folder_name=os.getenv("FOLDER_ARCHIVOS_CURSOS"),
            expiration_minutes=60,
        )

        google_bucket_serializer = GoogleCloudBucketFilesSerializer(
            data={
                "nombre": f"{os.getenv('FOLDER_ARCHIVOS_CURSOS')}/{file_name}",
                "url": signed_url,
                "expiracion": expires_in,
            }
        )

        if google_bucket_serializer.is_valid():
            google_bucket_serializer.save()
        else:
            return Response(
                google_bucket_serializer.errors, status=status.HTTP_400_BAD_REQUEST
            )

        file_from_db = get_object_or_404(
            GoogleCloudBucketFiles, nombre=google_bucket_serializer.data["nombre"]
        )
        subContent_id = fileSerializer.validated_data["subContent_id"]
        subContent = get_object_or_404(SubContenidos, pk=subContent_id)
        subContent.archivo = file_from_db
        subContent.save()

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
        "PI": os.getenv("FOLDER_ARCHIVOS_PERFILES"),
    }
    try:
        folder = folder_choices[request.data["folder"]]
        file_id: int = request.data["archivo_id"]
        file = get_object_or_404(GoogleCloudBucketFiles, pk=file_id)
        signed_url, expires_in, file_type = get_or_recreate_url_file(
            name=file.nombre,
            folder_name=folder,
            expiration_minutes=60,
        )

        return Response(
            {
                "archivo": signed_url,
                "expira_en": expires_in.isoformat(),
                "nombre": file.nombre,
                "tipo_archivo": file_type,
            },
            status=status.HTTP_200_OK,
        )
    except KeyError:
        return Response(
            {"error": "El objeto esta mal formulado"},
            status=status.HTTP_400_BAD_REQUEST,
        )


@api_view(["POST"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def set_profile_img(request):
    serializer = PerfilImgSerializer(data=request.data)

    if serializer.is_valid():
        perfil_img = serializer.validated_data["file"]
        usuario_id = serializer.validated_data["usuario_id"]
        perfil_img_name = serializer.validated_data["file"].name

        if not is_valid_img(perfil_img):
            return Response(
                {"error": "Solo se permiten imagenes"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        upload_file_to_bucket(
            bucket_name=os.getenv("GOOGLE_CLOUD_BUCKET"),
            file=perfil_img,
            folder_name=os.getenv("FOLDER_ARCHIVOS_PERFILES"),
        )

        url, expiracion, tipo_archivo = create_file_signed_url_by_name(
            folder_name=os.getenv("FOLDER_ARCHIVOS_PERFILES"),
            name=perfil_img_name,
            expiration_minutes=60,
        )

        db_file_serializer = GoogleCloudBucketFilesSerializer(
            data={
                "nombre": f"{os.getenv('FOLDER_ARCHIVOS_PERFILES')}/{perfil_img_name}",
                "url": url,
                "expiracion": expiracion,
            }
        )

        if db_file_serializer.is_valid():
            db_file_serializer.save()
        else:
            return Response(
                db_file_serializer.errors, status=status.HTTP_400_BAD_REQUEST
            )

        saved_file = get_object_or_404(GoogleCloudBucketFiles, nombre=f"{os.getenv('FOLDER_ARCHIVOS_PERFILES')}/{perfil_img_name}")
        usuario = get_object_or_404(Usuarios, pk=usuario_id)

        if bool(usuario.perfilUrl):
            usuario.perfilUrl.delete()

        usuario.perfilUrl = saved_file
        usuario.save()

        return Response(
            {"url": url, "expira_en": expiracion, "tipo_archivo": tipo_archivo}
        )
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
