from django.urls import include, path

from .router import router
from .views import (
    CursosEdit,
    GruposCursosEdit,
    GruposEdit,
    IntegrantesGrupoEdit,
    SedesDelete,
    eliminar_lista_sedes,
    agregar_lista_integrantes,
    get_grupos_y_integrantes,
    eliminar_lista_grupos,
    eliminar_integrantes
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
    path('eliminar_lista_sedes/', eliminar_lista_sedes, name='eliminar-lista-sedes'),
    path('agregar_lista_integrantes/', agregar_lista_integrantes, name='agregar-lista-integrantes'),
    path('get_grupos_integrantes/', get_grupos_y_integrantes, name='get-grupos-e-integrantes'),
    path('eliminar_lista_grupos/', eliminar_lista_grupos, name='eliminar-listas-grupos'),
    path('eliminar_integrantes/',eliminar_integrantes, name='eliminar-integrantes-custom' )
]
