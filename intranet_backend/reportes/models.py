import uuid

from api.models import Estudiantes, Usuarios
from cursos.models import Sedes
from django.db import models
from files.models import Archivos_referencia


class Reportes_info(models.Model):
    denegado = "denegado"
    aprobado = "aprobado"
    en_espera = "en espera"

    tardia = "tardia"
    retiro = "retiro"
    ausencia = "ausencia"
    permiso_especial = "permiso especial"

    ESTATE_CHOICES = (
        (denegado, "DENEGADO"),
        (aprobado, "APROBADO"),
        (en_espera, "EN ESPERA"),
    )

    INCIDENT_CHOICES = (
        (tardia, "TARDIA"),
        (retiro, "RETIRO"),
        (ausencia, "AUSENCIA"),
        (permiso_especial, "PERMISO ESPECIAL"),
    )
    id = models.UUIDField(
        editable=False, null=False, primary_key=True, default=uuid.uuid4, unique=True
    )
    estudiante_id = models.ForeignKey(Estudiantes, on_delete=models.CASCADE)
    sede_id = models.ForeignKey(Sedes, on_delete=models.CASCADE)
    usuario_id = models.ForeignKey(Usuarios, on_delete=models.CASCADE)
    dia_incidente = models.DateField(null=True)
    tipo_incidente = models.CharField(
        max_length=17, choices=INCIDENT_CHOICES, default="tardia"
    )
    presento_comprobante = models.BooleanField(default=False)
    fecha_creado = models.DateTimeField(auto_now_add=True)
    detalles = models.CharField(max_length=300)
    estado = models.CharField(max_length=9, choices=ESTATE_CHOICES, default="en espera")
    archivo_id = models.ForeignKey(Archivos_referencia, on_delete=models.SET_NULL, null=True)

    class Meta:
        db_table = "reportes_info"
        indexes = [
            models.Index(fields=["usuario_id"], name="usuario_reporte"),
            models.Index(fields=["dia_incidente"], name="dia_incidente"),
            models.Index(fields=["sede_id", "usuario_id"], name="user_sede_report"),
            models.Index(fields=['archivo_id'], name='archivo_report_indx')
        ]
