import uuid

from api.models import Estudiantes, Usuarios
from cursos.models import Grupos
from django.db import models


class ReporteDeAsistencias(models.Model):
    id = models.UUIDField(
        editable=False, null=False, primary_key=True, default=uuid.uuid4, unique=True
    )
    profesor_id = models.ForeignKey(Usuarios, on_delete=models.CASCADE)
    fecha_creacion = models.DateTimeField(auto_now_add=True)


class Asistencias(models.Model):
    ausente = "ausente"
    presente = "presente"
    tardia = "tardia"
    retiro = "retiro"

    ASISTENCIAS_ESTADO_CHOICES = (
        (ausente, ausente.upper()),
        (presente, presente.upper()),
        (tardia, tardia.upper()),
        (retiro, retiro.upper())
    )

    id = models.UUIDField(
        editable=False, null=False, primary_key=True, default=uuid.uuid4, unique=True
    )
    dia_asistencia = models.DateTimeField(auto_now_add=True)
    estudiante_id = models.ForeignKey(Estudiantes, on_delete=models.CASCADE)
    grupo_id = models.ForeignKey(Grupos, on_delete=models.CASCADE)
    estado = models.CharField(
        max_length=8, choices=ASISTENCIAS_ESTADO_CHOICES, default=presente
    )
    reporte_asistencias_id = models.ForeignKey(
        ReporteDeAsistencias, on_delete=models.CASCADE
    )
    
    class Meta:
        db_table = "asistencias"
        indexes = [
            models.Index(fields=["grupo_id"], name="grupo-AS-indx"),
            models.Index(fields=["dia_asistencia"], name="name-AS-indx"),
            models.Index(fields=["estudiante_id"], name="estudiante-AS-indx"),
        ]
