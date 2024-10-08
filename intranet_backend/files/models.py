from django.db import models
import uuid

# Create your models here.

class Tipos_archivos(models.Model):
    id = models.UUIDField(primary_key=True, editable=False, null=False, default=uuid.uuid4)
    tipo = models.CharField(max_length=200, null=False)
    extension = models.CharField(max_length=100, null=False)
    
    class Meta:
        db_table = 'tipos_archivos'
        indexes = [
            models.Index(fields=['id'], name='tipos-achivo-id-indx')
        ]

class Archivos_referencia(models.Model):
    id = models.UUIDField(primary_key=True, editable=False, null=False, default=uuid.uuid4)
    nombre = models.CharField(null=False, max_length=500)
    key = models.UUIDField(null=False)
    
    class Meta:
        db_table = 'archivos'
        unique_together = ['nombre', 'key']
        indexes = [
            models.Index(fields=['key', 'nombre'], name='info-archivo-indx'),
            models.Index(fields=['key'], name='key-archivo-indx'),
            models.Index(fields=['id'], name='id-archivo')
        ]
    
