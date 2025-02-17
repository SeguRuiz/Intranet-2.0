from django.urls import include, path

from .router import router
from .views import (
    ComunicadosEdit,
    ContenidosEdit,
    SubContenidosEdit,
    get_comunicados_by_date,
    get_contenidos_and_subcontenidos,
    send_emails_to_group,
    delete_file_and_subcont,
    delete_contenidos_and_files
)

urlpatterns = [
    path("", include(router.urls)),
    path("contenidos_edit/<uuid:pk>", ContenidosEdit.as_view(), name="contenidos-edit"),
    path(
        "subcontenidos_edit/<uuid:pk>",
        SubContenidosEdit.as_view(),
        name="subcontenidos-edit",
    ),
    path(
        "get_contenidos_and_subcontenidos/<uuid:pk>",
        get_contenidos_and_subcontenidos,
        name="get_contenidos_and_subcontenidos",
    ),
    path(
        "comunicados_edit/<uuid:pk>/", ComunicadosEdit.as_view(), name="comunicados-edit"
    ),
    path("comunicados_date/", get_comunicados_by_date, name="comunicados-by-date"),
    path("enviar_emails_grupo/", send_emails_to_group, name="send_emails_g"),
    path("eliminar_archivo_y_sub/", delete_file_and_subcont, name="eliminar-archvo-sub"),
    path("eliminar_contenidos_files/", delete_contenidos_and_files, name="eliminar-archvo-contenidos"),
    
]
