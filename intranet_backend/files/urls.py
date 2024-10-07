from django.urls import include, path

from .router import router
from .views import (
    ArchivosEdit,
    TiposArchivosEdit,
    delete_archivo,
    get_archivo,
    guardar_archivo,
)

urlpatterns = [
    path("", include(router.urls)),
    path("tipos_edit/<uuid:pk>", TiposArchivosEdit.as_view(), name="tipos_edit"),
    path("archivos_edit/<uuid:pk>", ArchivosEdit.as_view(), name="archivos_edit"),
    path("guardar_archivo/", guardar_archivo, name="guardar-archivo"),
    path("delete_archivo/", delete_archivo, name="delete-archivo"),
    path("get_archivo/", get_archivo, name="get-archivo"),
]
