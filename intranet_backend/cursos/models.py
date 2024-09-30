import uuid
from api.models import Usuarios
from django.core.validators import MinLengthValidator
from django.db import models

# Create your models here.


class Sedes(models.Model):
    id = models.UUIDField(
        unique=True, primary_key=True, null=False, editable=False, default=uuid.uuid4
    )
    nombre = models.CharField(
        max_length=250,
        null=False,
        validators=[
            MinLengthValidator(
                limit_value=5, message="El nombre debe al menos mayor  a 3 caracteres"
            )
        ],
    )
    ubicacion = models.CharField(max_length=1000)
    activa = models.BooleanField(null=False, default=True)

    class Meta:
        db_table = "sedes"


class Grupos(models.Model):
    id = models.UUIDField(
        unique=True, primary_key=True, null=False, editable=False, default=uuid.uuid4
    )
    sede_id = models.ForeignKey(Sedes, on_delete=models.CASCADE, null=False)
    nombre_grupo = models.CharField(max_length=100, null=False)

    class Meta:
        db_table = "grupos"


class Intengrantes_de_grupo(models.Model):
    id = models.UUIDField(
        unique=True, primary_key=True, null=False, editable=False, default=uuid.uuid4
    )
    grupo_id = models.ForeignKey(Grupos, on_delete=models.CASCADE, null=False)
    usuario_id = models.ForeignKey(Usuarios, on_delete=models.CASCADE, null=False)
    fecha_actualizacion = models.DateTimeField(auto_now=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "integrates_de_grupo"


class Cursos(models.Model):
    id = models.UUIDField(
        unique=True, primary_key=True, null=False, editable=False, default=uuid.uuid4
    )
    nombre = models.CharField(max_length=250, null=False)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)
    activo = models.BooleanField(null=False, default=True)

    class Meta:
        db_table = "Cursos"


class Grupos_cursos_intermedia(models.Model):
    id = models.UUIDField(
        unique=True, primary_key=True, null=False, editable=False, default=uuid.uuid4
    )
    curso_id = models.ForeignKey(Cursos, on_delete=models.CASCADE)
    grupo_id = models.ForeignKey(Grupos, on_delete=models.CASCADE)

    class Meta:
        db_table = "grupos_cursos_intermedia"
