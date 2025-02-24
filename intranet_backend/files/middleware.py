from django.utils.deprecation import MiddlewareMixin
from django.utils import timezone
from datetime import timedelta
from .models import GoogleCloudBucketFiles
from .views import create_file_signed_url_by_name


class UpdateSignedURLsMiddleware(MiddlewareMixin):
    def process_request(self, request):
        """
        Middleware que revisa si las Signed URLs están a punto de expirar
        (faltan 2 minutos o menos) y las renueva automáticamente.
        """
        ahora = timezone.now()
        archivos_a_renovar = GoogleCloudBucketFiles.objects.filter(expiracion__lte=ahora + timedelta(minutes=2))

        if archivos_a_renovar.exists():  
            print(f"🔄 Middleware: Renovando {archivos_a_renovar.count()} Signed URLs")

            for file in archivos_a_renovar:
                signed_url, expira_en, blob_type = create_file_signed_url_by_name(
                    folder_name=file.nombre.split('/')[0],
                    name=file.nombre,
                    expiration_minutes=60,  
                )

                file.url = signed_url
                file.expiracion = expira_en
                file.save(update_fields=["url", "expiracion"])  

        return None  # Continúa con la ejecución normal
