import uuid

from api.models import Estudiantes, Usuarios
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

    def get_estudiantes_del_grupo(self):
        estudiantes_del_grupo = [
            usuario.usuario_id.pk
            for usuario in Intengrantes_de_grupo.objects.filter(grupo_id=self.id)
            if usuario.usuario_id.rol_id.tipo in ["estudiante", "ESTUDIANTE"]
        ]

        estudiantes1 = [
            {
                "id": est.pk,
                "nombre": f"{est.usuario_id.first_name} {est.usuario_id.last_name}",
                "reportes": est.reportes,
                "estado": "None",
            }
            for est in Estudiantes.objects.all()
            if est.usuario_id.pk in estudiantes_del_grupo
        ]

        return estudiantes1

    def get_profesores(self):
        profesores_del_grupo = [
            usuario.usuario_id
            for usuario in Intengrantes_de_grupo.objects.filter(grupo_id=self.id)
            if usuario.usuario_id.rol_id.tipo in ["profesor", "Profesor"]
        ]
        
        return profesores_del_grupo


class Intengrantes_de_grupo(models.Model):
    id = models.UUIDField(
        unique=True, primary_key=True, null=False, editable=False, default=uuid.uuid4
    )
    grupo_id = models.ForeignKey(Grupos, on_delete=models.CASCADE, null=False)
    usuario_id = models.OneToOneField(Usuarios, on_delete=models.CASCADE, null=False)
    fecha_actualizacion = models.DateTimeField(auto_now=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "integrates_de_grupo"
        unique_together = ["grupo_id", "usuario_id"]
        indexes = [
            models.Index(
                fields=["usuario_id", "grupo_id"], name="IntegranteGrupo-IG-indx"
            ),
            models.Index(fields=["usuario_id"], name="usuario_id-IG-indx"),
            models.Index(fields=["grupo_id"], name="grupo_id-IG-indx"),
            models.Index(fields=["id"], name="id-IG-indx"),
        ]


class Cursos(models.Model):
    id = models.UUIDField(
        unique=True, primary_key=True, null=False, editable=False, default=uuid.uuid4
    )
    nombre = models.CharField(max_length=250, null=False)
    detalles = models.CharField(max_length=400, null=True) 
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)
    activo = models.BooleanField(null=False, default=True)

    class Meta:
        db_table = "Cursos"
        unique_together = ["id", "nombre"]
        indexes = [models.Index(fields=["id"], name="id-cursos-indx")]


class Grupos_cursos_intermedia(models.Model):
    id = models.UUIDField(
        unique=True, primary_key=True, null=False, editable=False, default=uuid.uuid4
    )
    curso_id = models.ForeignKey(Cursos, on_delete=models.CASCADE)
    grupo_id = models.ForeignKey(Grupos, on_delete=models.CASCADE)

    class Meta:
        db_table = "grupos_cursos_intermedia"
        unique_together = ["curso_id", "grupo_id"]
        indexes = [
            models.Index(fields=["curso_id", "grupo_id"], name="GruposCursos-indx"),
            models.Index(fields=["curso_id"], name="GC-curso_id-indx"),
            models.Index(fields=["grupo_id"], name="GC-grupo_id-indx"),
            models.Index(fields=["id"], name="id-GC-indx"),
        ]
