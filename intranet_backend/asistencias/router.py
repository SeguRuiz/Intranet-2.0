from rest_framework.routers import DefaultRouter
from .views import AsistenciasCreate, ReportesDeAsistenciasCreate
router = DefaultRouter()
router.register(prefix=r'asistencias', viewset=AsistenciasCreate, basename='asistencias-create')
router.register(prefix=r'reportes_de_asistencias', viewset=ReportesDeAsistenciasCreate, basename='reportes-de-asistencias-create')