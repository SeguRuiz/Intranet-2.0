from django.urls import include, path

from .routers import router
from .views import ReportesEdit, agregar_reporte, set_reporte_estado

urlpatterns = [
    path("", include(router.urls)),
    path("reportes_edit/<uuid:pk>", ReportesEdit.as_view(), name="reportes-edit"),
    path("agregar_reporte/", agregar_reporte, name="agregar_reporte"),
    path("reporte_estado/", set_reporte_estado, name="set_reporte_estado"),
]
