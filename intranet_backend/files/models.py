from django.db import models
import uuid
from api.models import Usuarios
# Create your models here.

class Tipos_archivos(models.Model):
    id = models.UUIDField(primary_key=True, editable=False, null=False, default=uuid.uuid4)
    tipo = models.CharField(max_length=200, null=False)
    extension = models.CharField(max_length=100, null=False)
    
    class Meta:
        db_table = 'tipos_archivos'

class Archivos_referencia(models.Model):
    id = models.UUIDField(primary_key=True, editable=False, null=False, default=uuid.uuid4)
    usuario_id = models.ForeignKey(Usuarios, on_delete=models.CASCADE)
    tipo_id = models.ForeignKey(Tipos_archivos,on_delete=models.CASCADE )
    nombre = models.CharField(null=False, max_length=500)
    key = models.CharField(null=False, max_length=1000)
    
    class Meta:
        db_table = 'archivos'

