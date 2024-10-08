from django.db import models
import uuid
from api.models import Usuarios
from cursos.models import Cursos
from api.models import Estudiantes
from files.models import Archivos_referencia


# Create your models here.

class Info_tareas(models.Model):
    id = models.UUIDField(primary_key=True, editable=False, null=False, default=uuid.uuid4)
    titulo = models.CharField(max_length=150, null=False)
    descripcion = models.CharField(max_length=200, null=False)
    fecha_entrega = models.DateTimeField(max_length=200, null=False)
    fecha_revision = models.DateTimeField(max_length=200, null=False)
    profesor_id = models.ForeignKey(Usuarios,on_delete=models.SET_NULL, null=True)
    cursos = models.ForeignKey(Cursos, on_delete= models.CASCADE)
    
    class Meta:
        db_table = 'Info_tareas'


class Tareas_asignadas(models.Model):
    id = models.UUIDField(primary_key=True, editable=False, null=False, default=uuid.uuid4)
    estudiante_id = models.ForeignKey(Estudiantes, on_delete=models.CASCADE)
    curso_id = models.ForeignKey(Cursos,on_delete=models.CASCADE)
    entregada = models.BooleanField(default=False)
    revisada = models.BooleanField(default=False)
    profesor_id = models.ForeignKey(Usuarios,on_delete=models.SET_NULL, null=True)
    calificacion = models.FloatField(default=0)
    
    class Meta:
        db_table = 'Tareas_asignadas'


class Intermedia_archivos_entregables(models.Model):
    id = models.UUIDField(primary_key=True, editable=False, null=False, default=uuid.uuid4)
    info_tarea_id = models.ForeignKey(Info_tareas, on_delete=models.CASCADE)
    asignacion_id = models.ForeignKey(Tareas_asignadas, on_delete=models.CASCADE)
    archivo_id = models.ForeignKey(Archivos_referencia, on_delete=models.CASCADE)
    
    class Meta:
        db_table = 'Intermedia_archivos_entregables'


class Intermedia_tareas_archivos(models.Model):
    id = models.UUIDField(primary_key=True, editable=False, null=False, default=uuid.uuid4)
    info_tarea_id = models.ForeignKey(Info_tareas, on_delete=models.CASCADE)
    archivo_id = models.ForeignKey(Archivos_referencia, on_delete=models.CASCADE)
    
    class Meta:
        db_table = 'Intermedia_tareas_archivos'