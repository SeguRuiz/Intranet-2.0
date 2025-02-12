from django.urls import include, path

from .routers import router
from .views import ReportesEdit, agregar_reporte, set_reporte_estado, guardar_reporte_google_cloud, get_reportes_estudiante

urlpatterns = [
    path("", include(router.urls)),
    path("reportes_edit/<uuid:pk>", ReportesEdit.as_view(), name="reportes-edit"),
    path("agregar_reporte/", agregar_reporte, name="agregar_reporte"),
    path("reporte_estado/", set_reporte_estado, name="set_reporte_estado"),
    path("guardar_archivo_reporte/", guardar_reporte_google_cloud, name='guardar-archivo-reporte' ),
    path("reportes_estudiante/<int:pk>", get_reportes_estudiante, name='get-reportes-estudiantes' )
]
