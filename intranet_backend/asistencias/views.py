import os
from datetime import date

from api.models import Estudiantes, Usuarios
from cursos.models import Intengrantes_de_grupo
from dotenv import load_dotenv
from reportes.models import Reportes_info
from reportes.views import sendEmail
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import Asistencias, ReporteDeAsistencias
from .serializers import asistenciasSerializer, reportesDeAsistenciasSerializer

load_dotenv()


class AsistenciasCreate(ModelViewSet):
    queryset = Asistencias.objects.all()
    serializer_class = asistenciasSerializer
    lookup_field = "pk"
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]


class AsistenciasEdit(RetrieveUpdateDestroyAPIView):
    queryset = Asistencias.objects.all()
    serializer_class = asistenciasSerializer
    lookup_field = "pk"
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]


class ReportesDeAsistenciasCreate(ModelViewSet):
    queryset = ReporteDeAsistencias.objects.all()
    serializer_class = reportesDeAsistenciasSerializer
    lookup_field = "pk"
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]


class ReportesDeAsistenciasEdit(RetrieveUpdateDestroyAPIView):
    queryset = ReporteDeAsistencias.objects.all()
    serializer_class = reportesDeAsistenciasSerializer
    lookup_field = "pk"
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]


detalles = {
    "tardia": f"El estudiante ingresó tarde a la clase del {date.today().strftime("%d/%m/%Y")}. El retraso fue registrado conforme a los lineamientos establecidos en el sistema de asistencia.",
    "ausente": f"El estudiante no se presentó a la clase correspondiente en la fecha siguiente {date.today().strftime("%d/%m/%Y")}. Se registró como ausencia según los parámetros establecidos para el control de asistencia.",
    "retiro": f"El estudiante se retiró antes de finalizar la clase del {date.today().strftime("%d/%m/%Y")}. Este evento quedó registrado como retiro anticipado en el reporte de asistencia.",
}


def enviarMensajeASocioemocional(
    estudiante_nombre: str,
    tipo_reporte: str,
    presento_aviso: str,
    profesor_nombre: str,
):
    email_receptor = os.getenv("CORREO_SOCIOEMOCIONAL")
    asunto = f"FWD-INFO: {profesor_nombre} acaba de crear un reporte."

    body_opciones = {
        "tardia": f"""\
Reporte de ingreso tardío - {estudiante_nombre}

Estimado/a equipo de apoyo socioemocional,  

Se ha registrado un ingreso tardío del estudiante **{estudiante_nombre}** en la clase del **{date.today().strftime("%d/%m/%Y")}**, {presento_aviso}.  

Este evento ha sido documentado en el sistema de asistencia para su seguimiento.  

Atentamente,  
Area administrativa de FWD
""",
        "ausente": f"""\
Reporte de ausencia - {estudiante_nombre}

Estimado/a equipo de apoyo socioemocional,  

Se ha registrado una ausencia del estudiante **{estudiante_nombre}** en la clase del **{date.today().strftime("%d/%m/%Y")}**, {presento_aviso}.  

De acuerdo con los parámetros de control de asistencia, esta inasistencia ha sido documentada en el sistema para su seguimiento.  

Atentamente,  
Area administrativa de FWD
""",
        "retiro": f"""\
Reporte de retiro anticipado - {estudiante_nombre}

Estimado/a equipo de apoyo socioemocional,  

Se ha registrado un **retiro anticipado** del estudiante **{estudiante_nombre}** en la clase del **{date.today().strftime("%d/%m/%Y")}**, {presento_aviso}.  

Este evento ha sido documentado en el sistema de asistencia para su respectivo seguimiento.  

Atentamente, 
Area administrativa de FWD 
""",
    }

    sendEmail(
        email_receiver=email_receptor, subject=asunto, body=body_opciones[tipo_reporte]
    )


def enviarMensajeAestudiante(
    estudiante_nombre: str,
    tipo_reporte: str,
    profesor_nombre: str,
    estudiante_correo: str,
    profesor_correo: str,
):
    email_receptor = os.getenv("CORREO_SOCIOEMOCIONAL")
    motivos = {"tardia": "Tardia", "ausente": "Ausencia", "retiro": "Retiro"}
    asunto = "Notificación de reporte académico de asistencia"

    body_opciones = {
        "estudiante": f"""\
Estimado/a {estudiante_nombre},

Esperamos que este mensaje te encuentre bien.

Te informamos que el profesor/a {profesor_nombre} ha generado un reporte académico en relación con tu asistencia al programa.

📌 **Detalles del Reporte:**
- **Profesor:** {profesor_nombre}
- **Fecha:** {date.today().strftime("%d/%m/%Y")}
- **Motivo:** {motivos[tipo_reporte]}

Te recomendamos revisar el reporte y, si tienes alguna duda o inquietud, comunicarte con el profesor/a a este correo {profesor_correo}.

Si necesitas más información, no dudes en contactar a {email_receptor}.
"""
    }
    sendEmail(
        email_receiver=estudiante_correo,
        subject=asunto,
        body=body_opciones["estudiante"],
    )


@api_view(["POST"])
def subir_reporte_de_asistencias(request):
    try:
        reportes_asistencias = reportesDeAsistenciasSerializer(
            data=request.data["reporte_de_asistencia_info"]
        )
        asistencias = request.data["asistencias_info"]

        if reportes_asistencias.is_valid():
            reportes_asistencias.save()

            sede = Intengrantes_de_grupo.objects.get(
                usuario_id=reportes_asistencias.data["profesor_id"]
            ).grupo_id.sede_id

            for n in asistencias:
                n["info"]["reporte_asistencias_id"] = reportes_asistencias.data["id"]
                estudiante = Estudiantes.objects.get(pk=n["id"])
                profesor = Usuarios.objects.get(
                    pk=reportes_asistencias.data["profesor_id"]
                )

                if n["info"]["estado"] != "presente":
                    nuevo_reporte = Reportes_info(
                        tipo_incidente=n["info"]["estado"],
                        sede_id=sede,
                        estudiante_id=estudiante,
                        usuario_id=profesor,
                        dia_incidente=date.today().strftime("%d/%m/%Y"),
                        detalles=detalles[f"{n['info']['estado']}"],
                        presento_aviso=n["info"]["presento_aviso"],
                    )

                    nuevo_reporte.save()
                    enviarMensajeASocioemocional(
                        estudiante_nombre=f"{estudiante.usuario_id.first_name} {estudiante.usuario_id.last_name}",
                        tipo_reporte=n["info"]["estado"],
                        profesor_nombre=f"{profesor.first_name} {profesor.last_name}",
                        presento_aviso="sin presentar aviso previo"
                        if not n["info"]["presento_aviso"]
                        else "con un aviso previo",
                    )
                    enviarMensajeAestudiante(
                        estudiante_correo=estudiante.usuario_id.email,
                        profesor_nombre=f"{profesor.first_name} {profesor.last_name}",
                        tipo_reporte=n["info"]["estado"],
                        profesor_correo=profesor.email,
                        estudiante_nombre=f"{estudiante.usuario_id.first_name} {estudiante.usuario_id.last_name}",
                    )

                asistencias_serializer = asistenciasSerializer(data=n["info"])

                if asistencias_serializer.is_valid():
                    asistencias_serializer.save()
                else:
                    return Response(
                        asistencias_serializer.errors,
                        status=status.HTTP_400_BAD_REQUEST,
                    )

        else:
            return Response(
                reportes_asistencias.errors, status=status.HTTP_400_BAD_REQUEST
            )

        return Response(
            {"info": "La informacion de asistencias fue enviada"},
            status=status.HTTP_200_OK,
        )

    except KeyError:
        return Response(
            {"error": "El objeto esta mal formulado"},
            status=status.HTTP_400_BAD_REQUEST,
        )
