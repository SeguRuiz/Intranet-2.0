from django.urls import path, include
from .router import router
from .views import AsistenciasEdit, ReportesDeAsistenciasEdit
urlpatterns = [
    path('', include(router.urls) ),
    path('asistencias_edit/<uuid:pk>', AsistenciasEdit.as_view(), name='asistencias-edit'),
    path('reportes_de_asistencias/<uuid:pk>', ReportesDeAsistenciasEdit.as_view(), name='reportes-de-asistencias-edit')
]
