from rest_framework.routers import DefaultRouter
from .views import Info_tareasCreate, Tareas_asignadasCreate, Intermedia_tareas_archivosCreate, Intermedia_archivos_entregablesCreate

router = DefaultRouter()
router.register(
    prefix=r'info', basename='info-tareas', viewset=Info_tareasCreate
)
router.register(
    prefix=r'tasks_student', basename='tareas-asignadas', viewset=Tareas_asignadasCreate
)

router.register(
    prefix=r'archivos', basename='tareas-archivos', viewset=Intermedia_tareas_archivosCreate
)

router.register(
    prefix=r'archivos_asignados', basename='tareas-asignadas-archivos', viewset=Intermedia_archivos_entregablesCreate
)




#aqui van los path que puede postear y obtener info( GET, POST )