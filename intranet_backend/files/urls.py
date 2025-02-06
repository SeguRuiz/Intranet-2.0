from django.urls import include, path

from .router import router
from .views import (
    ArchivosEdit,
    delete_file_from_google_cloud_and_subcont,
    get_file_from_google_cloud,
    save_file_of_subcont_to_google_cloud,
    set_profile_img,
)

urlpatterns = [
    path("", include(router.urls)),
    path("archivos_edit/<uuid:pk>", ArchivosEdit.as_view(), name="archivos_edit"),
    path(
        "guardar_archivo_de_subcontenidos_a_cloud/",
        save_file_of_subcont_to_google_cloud,
        name="save-file-of-subcont-to-google-cloud",
    ),
    path(
        "eliminar_archivo_from_google_cloud_and_subcont/",
        delete_file_from_google_cloud_and_subcont,
        name="delete-file-from-google-cloud-and-subcont",
    ),
    path(
        "obtener_archivo_from_google_cloud/",
        get_file_from_google_cloud,
        name="get-file-from-google-cloud",
    ),
    path(
        "set_profile_img/",
        set_profile_img,
        name="set-profile-img",
    ),
]
