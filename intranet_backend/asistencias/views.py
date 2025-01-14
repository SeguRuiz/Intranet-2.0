from datetime import date

from api.models import Estudiantes, Usuarios
from cursos.models import Intengrantes_de_grupo
from reportes.models import Reportes_info
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import Asistencias, ReporteDeAsistencias
from .serializers import asistenciasSerializer, reportesDeAsistenciasSerializer


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
    "tardia": f"El estudiante ingresó tarde a la clase del {date.today()}. El retraso fue registrado conforme a los lineamientos establecidos en el sistema de asistencia.",
    "ausente": f"El estudiante no se presentó a la clase correspondiente en la fecha siguiente {date.today()}. Se registró como ausencia según los parámetros establecidos para el control de asistencia.",
    "retiro": f"El estudiante se retiró antes de finalizar la clase del {date.today()}. Este evento quedó registrado como retiro anticipado en el reporte de asistencia.",
}


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

                if n["info"]["estado"] != "presente":
                    nuevo_reporte = Reportes_info(
                        tipo_incidente=n["info"]["estado"],
                        sede_id=sede,
                        estudiante_id=Estudiantes.objects.get(pk=n["id"]),
                        usuario_id=Usuarios.objects.get(
                            pk=reportes_asistencias.data["profesor_id"]
                        ),
                        dia_incidente=date.today(),
                        detalles=detalles[f"{n["info"]["estado"]}"],
                    )

                    nuevo_reporte.save()

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
