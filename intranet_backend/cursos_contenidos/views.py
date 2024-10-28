# Create your views here.

import os
import smtplib
import ssl
from email.message import EmailMessage

from api.models import Usuarios
from cursos.models import Grupos, Intengrantes_de_grupo
from django.shortcuts import get_object_or_404
from dotenv import load_dotenv
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
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


class ContenidosEdit(RetrieveUpdateDestroyAPIView):
    queryset = Contenidos.objects.all()
    serializer_class = ContenidosSerializer
    lookup_field = "pk"


class SubContenidosEdit(RetrieveUpdateDestroyAPIView):
    queryset = SubContenidos.objects.all()
    serializer_class = SubContenidosSerializer
    lookup_field = "pk"


class SubContenidosCreate(ModelViewSet):
    queryset = SubContenidos.objects.all()
    serializer_class = SubContenidosSerializer
    lookup_field = "pk"


#####


@api_view(["GET"])
# @authentication_classes([TokenAuthentication])
# @permission_classes([IsAuthenticated])
def get_contenidos_and_subcontenidos(request, pk=None):
    contenidos = Contenidos.objects.filter(curso=pk)
    contenidos_serializer = ContenidosSerializer(instance=contenidos, many=True)

    contenidos_list = contenidos_serializer.data

    for x in contenidos_list:
        SubCont = SubContenidos.objects.filter(contenido=x["id"])
        subContenidos_serializer = SubContenidosSerializer(instance=SubCont, many=True)
        SubCont_list = subContenidos_serializer.data
        x.update(subcontenidos=SubCont_list)

    return Response(contenidos_list, status=status.HTTP_200_OK)


@api_view(["GET"])
def get_comunicados_by_date(request):
    comunicados = Comunicados.objects.all().order_by("fecha_creacion")
    comunicados_serializer = ComunicadosSerializer(instance=comunicados, many=True)
    return Response(comunicados_serializer.data, status=status.HTTP_200_OK)


@api_view(["POST"])
def send_emails_to_group(request):
    try:
        load_dotenv()

        grupo = get_object_or_404(Grupos, pk=request.data["grupo_id"])
        email_sender = "lsegura@fwdcostarica.com"
        password = os.getenv("PASSWORD")

        subject = f"Anuncio en el grupo {grupo.nombre_grupo}"
        body = request.data["body"]

        usuarios = Intengrantes_de_grupo.objects.filter(
            grupo_id=request.data["grupo_id"]
        ).values("usuario_id")

        usuarios_email = Usuarios.objects.filter(
            id__in=[n["usuario_id"] for n in usuarios]
        ).values("email")

        for x in usuarios_email:
            email_receiver = x["email"]

            context = ssl.create_default_context()

            em = EmailMessage()
            em["From"] = email_sender
            em["To"] = email_receiver
            em["Subject"] = subject
            em.set_content(body)

            with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as smtp:
                smtp.login(email_sender, password)
                smtp.sendmail(email_sender, email_receiver, em.as_string())

        return Response(
            {"info": "se a enviando los email a los integrantes del grupo"},
            status=status.HTTP_200_OK,
        )

    except KeyError:
        return Response({"info": "error de objeto"}, status=status.HTTP_400_BAD_REQUEST)
