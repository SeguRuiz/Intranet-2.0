import uuid

from api.models import Estudiantes, Usuarios
from cursos.models import Sedes
from django.db import models


class Reportes_info(models.Model):
    denegado = "denegado"
    aprobado = "aprobado"
    en_espera = "en espera"

    tardia = "tardia"
    retiro = "retiro"
    ausencia = "ausencia"

    ESTATE_CHOICES = (
        (denegado, "DENEGADO"),
        (aprobado, "APROBADO"),
        (en_espera, "EN ESPERA"),
    )

    INCIDENT_CHOICES = ((tardia, "TARDIA"), (retiro, "RETIRO"), (ausencia, "AUSENCIA"))
    id = models.UUIDField(
        editable=False, null=False, primary_key=True, default=uuid.uuid4, unique=True
    )
    estudiante_id = models.ForeignKey(Estudiantes, on_delete=models.CASCADE)
    sede_id = models.ForeignKey(Sedes, on_delete=models.CASCADE)
    usuario_id = models.ForeignKey(Usuarios, on_delete=models.CASCADE)
    dia_incidente = models.DateTimeField(null=True)
    tipo_incidente = models.CharField(
        max_length=8, choices=INCIDENT_CHOICES, default="tardia"
    )
    presento_comprobante = models.BooleanField(default=False)
    fecha_creado = models.DateTimeField(auto_now_add=True)
    detalles = models.CharField(max_length=300)
    estado = models.CharField(max_length=9, choices=ESTATE_CHOICES, default="en espera")
