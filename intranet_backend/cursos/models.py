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
    ubicacion = models.CharField(max_length=250)
    activa = models.BooleanField(null=False, default=True)

    class Meta:
        db_table = "sedes"
        unique_together = ["nombre", "ubicacion"]
        indexes = [
            models.Index(fields=["nombre", "ubicacion"], name="nombre-ubicacion-indx"),
            models.Index(fields=["id"], name="id-sedes-indx"),
        ]


class Grupos(models.Model):
    id = models.UUIDField(
        unique=True, primary_key=True, null=False, editable=False, default=uuid.uuid4
    )
    sede_id = models.ForeignKey(Sedes, on_delete=models.CASCADE, null=False)
    nombre_grupo = models.CharField(max_length=100, null=False)

    class Meta:
        db_table = "grupos"
        unique_together = ["sede_id", "nombre_grupo"]
        indexes = [
            models.Index(
                fields=["sede_id", "nombre_grupo"], name="sede_id-nombre_grupo-indx"
            ),
            models.Index(fields=["id"], name="id-grupos-indx"),
        ]


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
        unique_together = ["grupo_id", "usuario_id"]
        indexes = [
            models.Index(
                fields=["usuario_id", "grupo_id"], name="IntegranteGrupo-IG-indx"
            ),
            models.Index(
                fields=["usuario_id"], name="usuario_id-IG-indx"
            ),
            models.Index(
                fields=["grupo_id"], name="grupo_id-IG-indx"
            ),
            models.Index(fields=["id"], name="id-IG-indx"),
        ]


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
        unique_together = ['id','nombre']
        indexes = [
            models.Index(fields=['id'], name='id-cursos-indx')
        ]
    


class Grupos_cursos_intermedia(models.Model):
    id = models.UUIDField(
        unique=True, primary_key=True, null=False, editable=False, default=uuid.uuid4
    )
    curso_id = models.ForeignKey(Cursos, on_delete=models.CASCADE)
    grupo_id = models.ForeignKey(Grupos, on_delete=models.CASCADE)

    class Meta:
        db_table = "grupos_cursos_intermedia"
        unique_together = ['curso_id','grupo_id']
        indexes = [
            models.Index(fields=['curso_id', 'grupo_id'], name='GruposCursos-indx'),
            models.Index(fields=['curso_id'], name='GC-curso_id-indx'),
            models.Index(fields=['grupo_id'], name='GC-grupo_id-indx'),
            models.Index(fields=['id'], name='id-GC-indx')
        ]