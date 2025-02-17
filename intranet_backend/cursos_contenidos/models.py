import uuid

from api.models import Usuarios
from cursos.models import Cursos, Grupos
from django.db import models
from files.models import GoogleCloudBucketFiles

# Create your models here.


class Contenidos(models.Model):
    id = models.UUIDField(
        editable=False, null=False, primary_key=True, default=uuid.uuid4, unique=True
    )
    nombre = models.CharField(max_length=150, null=False)
    curso = models.ForeignKey(Cursos, on_delete=models.CASCADE)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_de_desbloqueo = models.DateField(null=True)
    bloqueado = models.BooleanField(default=False)

    class Meta:
        db_table = "contenidos"
        indexes = [
            models.Index(fields=["id", "nombre"], name="contenidos-indx"),
            models.Index(fields=["id"], name="id-contenidos-indx"),
        ]


class SubContenidos(models.Model):
    id = models.UUIDField(
        editable=False, null=False, primary_key=True, default=uuid.uuid4, unique=True
    )
    nombre = models.CharField(max_length=150, null=False)
    archivo = models.ForeignKey(
        GoogleCloudBucketFiles, null=True, on_delete=models.SET_NULL
    )
    contenido = models.ForeignKey(Contenidos, on_delete=models.CASCADE, null=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    bloqueado = models.BooleanField(default=False)

    def delete_self_and_file(self):
        if bool(self.archivo):
            file_self = GoogleCloudBucketFiles.objects.get(pk=self.archivo.pk)
            try:
                file_self.delete()
                self.delete()

                return file_self.nombre
            except file_self.DoesNotExist:
                self.delete()

                return ""
        self.delete()

    class Meta:
        db_table = "subcontenidos"
        indexes = [
            models.Index(fields=["contenido"], name="subcont-contenido-indx"),
            models.Index(fields=["archivo"], name="subcont-archivo-indx"),
            models.Index(fields=["id"], name="id-subcont-indx"),
        ]


class Comunicados(models.Model):
    id = models.UUIDField(
        editable=False, null=False, primary_key=True, default=uuid.uuid4, unique=True
    )
    asunto = models.CharField(max_length=100, null=False)
    descripcion = models.CharField(max_length=500, null=False)
    curso_id = models.ForeignKey(Cursos, on_delete=models.CASCADE)
    usuario_id = models.ForeignKey(Usuarios, on_delete=models.CASCADE)
    grupo_id = models.ForeignKey(Grupos, on_delete=models.CASCADE)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "comunicados"
        indexes = [
            models.Index(fields=["usuario_id"], name="user-comunicado"),
            models.Index(fields=["grupo_id"], name="grupo-comunicado"),
            models.Index(fields=["curso_id"], name="curso-comunicado"),
            models.Index(fields=["id", "grupo_id"], name="grupo-e-id-com"),
        ]
