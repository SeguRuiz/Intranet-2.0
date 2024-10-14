from django.urls import include, path

from .router import router
from .views import (
    CursosEdit,
    GruposCursosEdit,
    GruposEdit,
    IntegrantesGrupoEdit,
    SedesDelete,
    eliminar_lista_sedes
)

urlpatterns = [
    path("", include(router.urls)),
    path("sedes_edit/<uuid:pk>", SedesDelete.as_view(), name="sedes-edit"),
    path("grupos_edit/<uuid:pk>", GruposEdit.as_view(), name="grupos-edit"),
    path(
        "integrantes_de_grupo_edit/<uuid:pk>",
        IntegrantesGrupoEdit.as_view(),
        name="intengrantes-edit",
    ),
    path("cursos_edit/<uuid:pk>", CursosEdit.as_view(), name="cursos-edit"),
    path(
        "grupos_cursos_edit/<uuid:pk>",
        GruposCursosEdit.as_view(),
        name="grupos-cursos-edit",
    ),
    path('eliminar_lista_sedes/', eliminar_lista_sedes, name='eliminar-lista-sedes')
]
