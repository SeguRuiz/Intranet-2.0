from django.db import models
import uuid

# Create your models here.

class Tipos_archivos(models.Model):
    id = models.UUIDField(primary_key=True, editable=False, null=False, default=uuid.uuid4)
    tipo = models.CharField(max_length=200, null=False)
    extension = models.CharField(max_length=100, null=False)
    
    class Meta:
        db_table = 'tipos_archivos'

class Archivos_referencia(models.Model):
    id = models.UUIDField(primary_key=True, editable=False, null=False, default=uuid.uuid4)
    nombre = models.CharField(null=False, max_length=500)
    key = models.CharField(null=False, max_length=1000)
    
    class Meta:
        db_table = 'archivos'
    
