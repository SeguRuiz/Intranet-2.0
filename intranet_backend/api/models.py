# Create your models here.
import uuid

from django.contrib.auth.models import AbstractUser
from django.db import models
from files.models import GoogleCloudBucketFiles


class Roles(models.Model):
    id = models.UUIDField(
        unique=True, primary_key=True, editable=False, null=False, default=uuid.uuid4
    )
    tipo = models.CharField(max_length=100, null=False, unique=True)

    class Meta:
        db_table = "Roles"
        indexes = [
            models.Index(fields=["tipo", "id"], name="tipo-id-indx"),
            models.Index(fields=["tipo"], name="tipo-indx"),
        ]


class Usuarios(AbstractUser):
    ID_PASAPORTE = "pasaporte"
    ID_NACIONAL = "nacional"
    ID_EXTRANJERO = "extranjero"

    ID_CHOICES = (
        (ID_PASAPORTE, ID_PASAPORTE.upper()),
        (ID_NACIONAL, ID_NACIONAL.upper()),
        (ID_EXTRANJERO, ID_EXTRANJERO.upper()),
    )

    cedula = models.CharField(max_length=20)
    tipo_cedula = models.CharField(
        max_length=10, choices=ID_CHOICES, default="nacional"
    )
    rol_id = models.ForeignKey(Roles, on_delete=models.SET_NULL, null=True)
    fecha_editado = models.DateTimeField(auto_now=True)
    is_socioemocional = models.BooleanField(default=False)
    perfilUrl = models.ForeignKey(
        GoogleCloudBucketFiles, on_delete=models.SET_NULL, null=True
    )

    class Meta:
        db_table = "Usuarios"
        indexes = [
            models.Index(
                fields=["cedula", "first_name", "last_name"],
                name="cedula-nombre-apellidos-indx",
            ),
            models.Index(fields=["email"], name="email-indx"),
            models.Index(fields=["id", "email"], name="email-id-indx"),
            models.Index(fields=["id", "first_name"], name="nombre-id-indx"),
            models.Index(fields=["tipo_cedula"], name="tipo-cedula-indx"),
        ]

    def get_Role(self):
        return self.rol_id.tipo


class Estudiantes(models.Model):
    id = models.UUIDField(
        editable=False, null=False, primary_key=True, default=uuid.uuid4, unique=True
    )
    usuario_id = models.ForeignKey(
        Usuarios,
        on_delete=models.CASCADE,
        null=True,
    )
    nota = models.FloatField(null=False, default=0)
    reportes = models.IntegerField(null=False, default=0)
    activo = models.BooleanField(null=False, default=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    faltas = models.IntegerField(default=0, null=False)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "Estudiantes"
        unique_together = ["id", "usuario_id"]
        indexes = [
            models.Index(fields=["usuario_id"], name="usuario_id-indx"),
            models.Index(
                fields=["usuario_id", "activo"], name="usuario_id-activo-indx"
            ),
            models.Index(fields=["id"], name="id-indx"),
        ]
