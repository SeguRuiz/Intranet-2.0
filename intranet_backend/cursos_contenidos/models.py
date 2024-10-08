from django.db import models
from cursos.models import Cursos
from files.models import Archivos_referencia
import uuid
# Create your models here.

class Contenidos(models.Model):
    id = models.UUIDField(editable=False, null=False, primary_key=True, default=uuid.uuid4, unique=True)
    nombre = models.CharField(max_length=150, null=False)
    curso = models.ForeignKey(Cursos, on_delete=models.CASCADE)
    
    class Meta:
        db_table = 'contenidos'
        indexes = [
            models.Index(fields=['id','nombre'], name='contenidos-indx'),
            models.Index(fields=['id'], name='id-contenidos-indx')
        ]
        

class SubContenidos(models.Model):
    id = models.UUIDField(editable=False, null=False, primary_key=True, default=uuid.uuid4, unique=True)
    nombre = models.CharField(max_length=150, null=False)
    archivo = models.ForeignKey(Archivos_referencia, null=True, on_delete=models.SET_NULL)
    contenido = models.ForeignKey(Contenidos, on_delete=models.CASCADE, null=True)
    
    class Meta:
        db_table = 'subcontenidos'
        indexes = [
            models.Index(fields=['contenido'], name='subcont-contenido-indx'),
            models.Index(fields=['archivo'], name='subcont-archivo-indx'),
            models.Index(fields=['id'], name='id-subcont-indx'),
        ]




