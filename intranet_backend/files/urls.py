from django.urls import include, path

from .router import router
from .views import (
    ArchivosEdit,
    delete_archivo,
    get_archivo,
    guardar_archivo,
    guardar_reporte
)

urlpatterns = [
    path("", include(router.urls)),
    path("archivos_edit/<uuid:pk>", ArchivosEdit.as_view(), name="archivos_edit"),
    path("guardar_archivo/", guardar_archivo, name="guardar-archivo"),
    path("delete_archivo/", delete_archivo, name="delete-archivo"),
    path("get_archivo/", get_archivo, name="get-archivo"),
    path("guardar_reporte/", guardar_reporte, name='guardar-reporte')
]
