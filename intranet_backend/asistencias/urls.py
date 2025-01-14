from django.urls import include, path

from .router import router
from .views import (
    AsistenciasEdit,
    ReportesDeAsistenciasEdit,
    subir_reporte_de_asistencias,
)

urlpatterns = [
    path("", include(router.urls)),
    path(
        "asistencias_edit/<uuid:pk>", AsistenciasEdit.as_view(), name="asistencias-edit"
    ),
    path(
        "reportes_de_asistencias/<uuid:pk>",
        ReportesDeAsistenciasEdit.as_view(),
        name="reportes-de-asistencias-edit",
    ),
    path(
        "subir_reporte_de_asistencias/",
        subir_reporte_de_asistencias,
        name="subir-reporte-de-asistencias",
    ),
]
