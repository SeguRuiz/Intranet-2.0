import uuid

from django.db import models

# Create your models here.


class Archivos_referencia(models.Model):
    id = models.UUIDField(
        primary_key=True, editable=False, null=False, default=uuid.uuid4
    )
    nombre = models.CharField(null=False, max_length=500)
    key = models.UUIDField(null=False)

    class Meta:
        db_table = "archivos"
        unique_together = ["nombre", "key"]
        indexes = [
            models.Index(fields=["key", "nombre"], name="info-archivo-indx"),
            models.Index(fields=["key"], name="key-archivo-indx"),
            models.Index(fields=["id"], name="id-archivo"),
        ]


class GoogleCloudBucketFiles(models.Model):
    nombre = models.CharField(null=False, max_length=255, unique=True)
    
    class Meta:
        db_table = "google_cloud_bucket_files"
        unique_together = ["nombre", "id"]
        indexes = [
            models.Index(fields=["id", "nombre"], name="info-cloud-indx"),
            models.Index(fields=["nombre"], name="nombre-archivo-indx"),
            models.Index(fields=["id"], name="id-cloud"),
        ]
