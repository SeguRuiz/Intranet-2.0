from django.urls import include, path

from .router import router
from .views import TiposArchivosEdit, ArchivosEdit

urlpatterns = [
    path("", include(router.urls)),
    path("tipos_edit/<uuid:pk>", TiposArchivosEdit.as_view(), name="tipos_edit"),
    path("archivos_edit/<uuid:pk>", ArchivosEdit.as_view(), name='archivos_edit')
]
