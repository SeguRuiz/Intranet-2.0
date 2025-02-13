import os
from datetime import date, datetime

from api.models import Estudiantes, Usuarios
from api.serializers import EstudiantesSerializer
from cursos_contenidos.views import sendEmail
from django.shortcuts import get_object_or_404
from dotenv import load_dotenv
from files.models import GoogleCloudBucketFiles
from files.serializers import GoogleCloudBucketFilesSerializer
from files.views import delete_file, is_valid_img, is_valid_pdf, upload_file_to_bucket
from rest_framework import status
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import Reportes_info
from .serializers import ReportesFileSerializer, ReportesSerializer

# Create your views here.

load_dotenv()


class ReportesCreate(ModelViewSet):
    queryset = Reportes_info.objects.all()
    lookup_field = "pk"
    serializer_class = ReportesSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]


class ReportesEdit(RetrieveUpdateDestroyAPIView):
    queryset = Reportes_info.objects.all()
    lookup_field = "pk"
    serializer_class = ReportesSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def get_reportes_estudiante(request, pk):
    usuario = get_object_or_404(Usuarios, pk=pk)
    estudiante = get_object_or_404(Estudiantes, usuario_id=usuario)

    reportes_estudiantes = Reportes_info.objects.filter(estudiante_id=estudiante)
    reportes_serializer = ReportesSerializer(instance=reportes_estudiantes, many=True)

    return Response(reportes_serializer.data, status=status.HTTP_200_OK)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def agregar_reporte(request):
    try:
        # Se inicializa el serializador para el reporte con los datos de la solicitud
        reporte = ReportesSerializer(data=request.data)

        if reporte.is_valid():
            # Si el serializador es válido, se guarda el reporte
            reporte.save()

        # Se obtiene el estudiante relacionado utilizando el ID proporcionado
        estudiante = get_object_or_404(Estudiantes, pk=request.data["estudiante_id"])
        estudiante_ser = EstudiantesSerializer(instance=estudiante)

        # Se obtiene el usuario asociado al estudiante
        user = get_object_or_404(Usuarios, pk=estudiante_ser.data["usuario_id"])
        # Se obtiene el profesor que crea el reporte
        profesor = get_object_or_404(Usuarios, pk=request.data["usuario_id"])

        # Se prepara el cuerpo del correo electrónico para notificar al estudiante
        body = f"""
Un nuevo reporte esta siendo procesado hacia {user.first_name} {user.last_name}, si necesita presentar un comprobante al respecto debe comunicarse, con el profesor {profesor.first_name} {profesor.last_name}.
"""

        # Se envía el correo electrónico al estudiante
        sendEmail(
            email_receiver=user.email,
            subject="Informe reporte",
            body=body,
        )

        # Se devuelve la información del reporte creado
        return Response(reporte.data, status=status.HTTP_201_CREATED)
    except KeyError:
        # Maneja el caso en que falta algún dato necesario en la solicitud
        return Response({"info": "Objeto mal formulado"})


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def set_reporte_estado(request):
    try:
        # Se obtienen el ID del reporte y el nuevo estado de la solicitud
        reporte_id: str = request.data["reporte_id"]
        nuevo_estado: str = request.data["estado"]

        # Se obtiene el reporte utilizando el ID proporcionado
        reporte = get_object_or_404(Reportes_info, pk=reporte_id)
        # Se actualiza el estado del reporte
        reporte.estado = nuevo_estado
        reporte.save()

        # Se serializa el reporte actualizado para obtener su información
        reporte_ser = ReportesSerializer(instance=reporte)

        # Se obtiene el estudiante relacionado con el reporte
        estudiante = get_object_or_404(
            Estudiantes, id=reporte_ser.data["estudiante_id"]
        )
        estudiante_ser = EstudiantesSerializer(instance=estudiante)

        # Se obtiene el usuario asociado al estudiante
        user = get_object_or_404(Usuarios, pk=estudiante_ser.data["usuario_id"])
        # Se obtiene el profesor que creó el reporte
        profesor = get_object_or_404(Usuarios, pk=reporte_ser.data["usuario_id"])

        # Se obtiene la fecha de creación del reporte
        dia: datetime = reporte.fecha_creado

        # Se prepara el cuerpo del correo electrónico para notificar al estudiante
        body = f"""
El reporte emitido el {dia.date()} a las {dia.hour}:{dia.minute}, por el profesor {profesor.first_name} {profesor.last_name},  a sido clasificado como "{nuevo_estado.upper()}" si tienes alguna duda comunicate a {profesor.email}.      
"""

        # Se envía el correo electrónico al estudiante con el nuevo estado
        sendEmail(email_receiver=user.email, subject="Informe reporte", body=body)

        # Se devuelve un mensaje de éxito
        return Response({"info": "cambio logrado"}, status=status.HTTP_200_OK)

    except KeyError:
        # Maneja el caso en que falta algún dato necesario en la solicitud
        return Response(
            {"info": "Objeto mal formulado"}, status=status.HTTP_400_BAD_REQUEST
        )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def guardar_reporte_google_cloud(request):
    load_dotenv()
    try:
        serializer = ReportesFileSerializer(data=request.data)

        if serializer.is_valid():
            file = serializer.validated_data["file"]
            file_nombre = file.name
            reporte_id = serializer.validated_data["reporte_id"]
            if not (is_valid_img(file) or is_valid_pdf(file)):
                return Response(
                    {
                        "error": "Solo se aceptan pdfs o imagenes",
                    },
                    status=status.HTTP_406_NOT_ACCEPTABLE,
                )
            reporte = get_object_or_404(Reportes_info, pk=reporte_id)
            se_remplazo_archivo, info_archivo, nombre_archivo = (
                reporte.delete_self_file()
            )
            if se_remplazo_archivo:
                delete_file(
                    bucket_name=os.getenv("GOOGLE_CLOUD_BUCKET"),
                    blob_name=nombre_archivo,
                    folder_name=os.getenv("FOLDER_ARCHIVOS_REPORTES"),
                )
            google_cloud_serializer = GoogleCloudBucketFilesSerializer(
                data={"nombre": file_nombre}
            )

            if google_cloud_serializer.is_valid():
                google_cloud_serializer.save()
            else:
                return Response(
                    google_cloud_serializer.errors, status=status.HTTP_400_BAD_REQUEST
                )

            google_cloud_file = get_object_or_404(
                GoogleCloudBucketFiles, nombre=file_nombre
            )

            reporte.presento_comprobante = True
            reporte.archivo_id = google_cloud_file
            reporte.save()

            mensaje = upload_file_to_bucket(
                bucket_name=os.getenv("GOOGLE_CLOUD_BUCKET"),
                file=file,
                folder_name=os.getenv("FOLDER_ARCHIVOS_REPORTES"),
            )

            return Response(
                {
                    "Info": mensaje,
                    "archivo_id": google_cloud_file.pk,
                    "info_archivo_reporte": info_archivo,
                },
                status.HTTP_200_OK,
            )

        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except KeyError:
        return Response(
            {"info": "El objeto esta mal formulado"}, status=status.HTTP_400_BAD_REQUEST
        )


@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def subir_justificante_reporte(request, pk):
    descripcion_comprobante = request.data["descripcion_comprobante"]
    reporte = get_object_or_404(Reportes_info, pk=pk)

    reporte.descripcion_comprobante = descripcion_comprobante
    reporte.save()
    serializer = ReportesSerializer(instance=reporte)

    ##############################################################################

    dia_incidente= reporte.dia_incidente

    email_asunto = f"Notificación de Envío de Comprobante - {reporte.estudiante_id.usuario_id.first_name} {reporte.estudiante_id.usuario_id.last_name}"

    email_bodys = (
        f"""\
Estimado equipo del área socioemocional,

El estudiante {reporte.estudiante_id.usuario_id.first_name} {reporte.estudiante_id.usuario_id.last_name} ha enviado un comprobante en respuesta al siguiente reporte:

- **ID del reporte:** {reporte.pk}
- **Tipo del reporte:** {reporte.tipo_incidente}
- **Fecha del reporte:** {dia_incidente}

Detalles del envío:

- **Fecha de envío del comprobante:** {date.today()} - {datetime.now().strftime("%I:%M %p")}

Pueden revisar el comprobante en el sistema o contactar al estudiante si requieren más información.

Saludos cordiales, 
FWD - ADMINISTRACION  
""",
    )
    sendEmail(
        email_receiver=os.getenv("CORREO_SOCIOEMOCIONAL"),
        subject=email_asunto,
        body=email_bodys[0],
    )
    
    return Response(serializer.data, status=status.HTTP_200_OK)
