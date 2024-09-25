from django.db import models
from django.core.validators import MinLengthValidator, RegexValidator
# Create your models here.
import uuid
from django.contrib.auth.models import AbstractUser


class Roles(models.Model):
    id = models.UUIDField(unique=True,primary_key=True, editable=False, null=False, default=uuid.uuid4)
    tipo = models.CharField(max_length=100,null=False,default='no_definido')
    
    class Meta:
        db_table = 'Roles'
        
    

class Usuarios(AbstractUser):
    cedula = models.IntegerField(null=False, default=0, unique=True)
    activo = models.BooleanField(default=False)
    rol_id = models.ForeignKey(Roles, on_delete=models.CASCADE, null=True )
    
    class Meta:
        db_table = 'Usuarios'

class Estudiantes(models.Model):
    id = models.UUIDField(editable=False, null=False, primary_key=True, default=uuid.uuid4, unique=True)
    usuario_id = models.ForeignKey(Usuarios,  on_delete=models.CASCADE, null=False)
    nota = models.FloatField(null=False, default=0)
    reportes = models.IntegerField(null=False, default=0)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    faltas = models.IntegerField(default=0, null=False)
    fecha_actualizacion = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'Estudiantes'