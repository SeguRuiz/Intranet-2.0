# Create your views here.

import os
import smtplib
import ssl
from email.message import EmailMessage

from api.models import Usuarios
from cursos.models import Grupos, Intengrantes_de_grupo
from django.shortcuts import get_object_or_404
from dotenv import load_dotenv
from files.views import delete_file
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

from .models import Comunicados, Contenidos, SubContenidos
from .serializers import (
    ComunicadosSerializer,
    ContenidosSerializer,
    SubContenidosSerializer,
)


class ComunicadosCreate(ModelViewSet):
    queryset = Comunicados.objects.all()
    serializer_class = ComunicadosSerializer
    lookup_field = "pk"
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]


class ComunicadosEdit(RetrieveUpdateDestroyAPIView):
    queryset = Comunicados.objects.all()
    serializer_class = ComunicadosSerializer
    lookup_field = "pk"
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]


class ContenidosCreate(ModelViewSet):
    queryset = Contenidos.objects.all()
    serializer_class = ContenidosSerializer
    lookup_field = "pk"
    permission_classes = [IsAdminUser]
    authentication_classes = [JWTAuthentication]


class ContenidosEdit(RetrieveUpdateDestroyAPIView):
    queryset = Contenidos.objects.all()
    serializer_class = ContenidosSerializer
    permission_classes = [IsAdminUser]
    authentication_classes = [JWTAuthentication]
    lookup_field = "pk"


class SubContenidosEdit(RetrieveUpdateDestroyAPIView):
    queryset = SubContenidos.objects.all()
    serializer_class = SubContenidosSerializer
    lookup_field = "pk"
    permission_classes = [IsAdminUser]
    authentication_classes = [JWTAuthentication]


class SubContenidosCreate(ModelViewSet):
    queryset = SubContenidos.objects.all()
    serializer_class = SubContenidosSerializer
    lookup_field = "pk"
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAdminUser]


def sendEmail(email_receiver: str, subject: str, body: str) -> None:
    # Carga las variables de entorno del archivo .env
    load_dotenv()
    email_sender = "lsegura@fwdcostarica.com"  # Dirección de correo del remitente
    password = os.getenv(
        "PASSWORD"
    )  # Obtiene la contraseña del remitente desde las variables de entorno

    # Crea un objeto EmailMessage para estructurar el correo
    em = EmailMessage()
    em["From"] = email_sender  # Asigna el remitente
    em["To"] = email_receiver  # Asigna el destinatario
    em["Subject"] = subject  # Asigna el asunto
    em.set_content(body)  # Establece el contenido del correo

    # Crea un contexto seguro para la conexión SSL
    context = ssl.create_default_context()

    # Conecta al servidor SMTP de Gmail utilizando SSL
    with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as smtp:
        smtp.login(email_sender, password)  # Inicia sesión en el servidor SMTP
        smtp.sendmail(email_sender, email_receiver, em.as_string())  # Envía el correo


@api_view(["GET"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def get_contenidos_and_subcontenidos(request, pk=None):
    # Filtra los contenidos según el curso especificado por 'pk'
    contenidos = Contenidos.objects.filter(curso=pk).order_by("fecha_creacion")
    contenidos_serializer = ContenidosSerializer(instance=contenidos, many=True)

    # Serializa la lista de contenidos
    contenidos_list = contenidos_serializer.data

    # Para cada contenido, busca y agrega los subcontenidos relacionados
    for x in contenidos_list:
        SubCont = SubContenidos.objects.filter(contenido=x["id"]).order_by(
            "fecha_creacion"
        )
        subContenidos_serializer = SubContenidosSerializer(instance=SubCont, many=True)
        SubCont_list = subContenidos_serializer.data
        x.update(
            subcontenidos=SubCont_list
        )  # Agrega la lista de subcontenidos al contenido correspondiente

    # Retorna la lista de contenidos con sus respectivos subcontenidos
    return Response(contenidos_list, status=status.HTTP_200_OK)


@api_view(["GET"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def get_comunicados_by_date(request):
    # Obtiene todos los comunicados, ordenados por fecha de creación
    comunicados = Comunicados.objects.all().order_by("fecha_creacion")
    # Serializa la lista de comunicados
    comunicados_serializer = ComunicadosSerializer(instance=comunicados, many=True)
    # Devuelve la lista de comunicados serializados con un código de estado 200 OK
    return Response(comunicados_serializer.data, status=status.HTTP_200_OK)


@api_view(["POST"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def send_emails_to_group(request):
    try:
        # Obtiene el grupo correspondiente al ID proporcionado en la solicitud
        grupo = get_object_or_404(Grupos, pk=request.data["grupo_id"])

        # Define el asunto y el cuerpo del correo
        subject = f"Anuncio en el grupo {grupo.nombre_grupo}"
        body = request.data["body"]

        # Filtra los usuarios que son integrantes del grupo
        usuarios = Intengrantes_de_grupo.objects.filter(
            grupo_id=request.data["grupo_id"]
        ).values("usuario_id")

        # Obtiene los correos electrónicos de los usuarios
        usuarios_email = Usuarios.objects.filter(
            id__in=[n["usuario_id"] for n in usuarios]
        ).values("email")

        # Envía un correo a cada usuario en la lista
        for x in usuarios_email:
            sendEmail(email_receiver=x["email"], subject=subject, body=body)

        # Devuelve una respuesta indicando que los correos se han enviado
        return Response(
            {"info": "se ha enviado los emails a los integrantes del grupo"},
            status=status.HTTP_200_OK,
        )

    except KeyError:
        # Maneja el caso en que falta algún dato en la solicitud
        return Response({"info": "error de objeto"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["DELETE"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def delete_file_and_subcont(request):
    load_dotenv()

    subcont_id: str = request.data["id"]
    subcont = get_object_or_404(SubContenidos, pk=subcont_id)
    file_name: str = subcont.delete_self_and_file()
    bucket_name = os.getenv("GOOGLE_CLOUD_BUCKET")

    if bool(file_name):
        delete_file(
            bucket_name=bucket_name, blob_name=file_name, folder_name=os.getenv('FOLDER_ARCHIVOS_CURSOS')
        )
        return Response({"info": "archivo y sub borrados"}, status=status.HTTP_200_OK)

    return Response({"info": "archivo y sub borrados"}, status=status.HTTP_200_OK)


@api_view(["DELETE"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def delete_contenidos_and_files(request):
    load_dotenv()
    bucket_name = os.getenv("GOOGLE_CLOUD_BUCKET")
    contenido = get_object_or_404(Contenidos, pk=request.data["contenido_id"])

    if SubContenidos.objects.filter(contenido=contenido).exists():
        subcontenidos = SubContenidos.objects.filter(contenido=contenido)
        for n in subcontenidos:
            file_name = n.delete_self_and_file()
            if bool(file_name):
                delete_file(
                    bucket_name=bucket_name,
                    blob_name=file_name,
                    folder_name=os.getenv('FOLDER_ARCHIVOS_CURSOS'),
                )
        contenido.delete()
        return Response({"info": "Contenido eliminado"}, status=status.HTTP_200_OK)

    contenido.delete()
    return Response({"info": "Contenido eliminado"}, status=status.HTTP_200_OK)
