from rest_framework.routers import DefaultRouter
from .views import Info_tareasCreate, Tareas_asignadasCreate, Intermedia_tareas_archivosCreate, Intermedia_archivos_entregablesCreate

router = DefaultRouter()
router.register(
    prefix=r'info_tarea', basename='info-tareas', viewset=Info_tareasCreate
)
router.register(
    prefix=r'tarea_asignada', basename='tareas-asignadas', viewset=Tareas_asignadasCreate
)

router.register(
    prefix=r'intermedia_tarea_archivo', basename='tareas-archivos', viewset=Intermedia_tareas_archivosCreate
)

router.register(
    prefix=r'intermedia_archivo_entregable', basename='tareas-asignadas-archivos', viewset=Intermedia_archivos_entregablesCreate
)




#aqui van los path que puede postear y obtener info( GET, POST )