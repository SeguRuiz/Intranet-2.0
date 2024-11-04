from .router import router
from django.urls import include, path
from .views import  (Info_tareasDelete,guardar_archivo_tareas, borrar_archivo_tarea, obtener_archivo_tarea,asignar_tareas_estudiantes,subir_tarea_estudiante, mostrar_archivo)

urlpatterns = [
   path("", include(router.urls)),  
   path("delete/<uuid:pk>", Info_tareasDelete.as_view(), name="Info-Tareas-Delete"),
   path("guardar_archivo_tarea/", guardar_archivo_tareas, name="guardar-archivo-tarea"),
   path("borrar_archivo_tarea/<uuid:pk>/", borrar_archivo_tarea, name="borrar-archivo-tarea"),
   path("obtener_archivo_tarea/", obtener_archivo_tarea, name="obtener-archivo-tarea"),
   path("asignar_tareas_estudiantes/", asignar_tareas_estudiantes, name="asignar-tareas-estudiantes"),
   path("subir_tarea_estudiante/", subir_tarea_estudiante, name="subir-tarea-estudiante"),
   path("mostrar_archivo/", mostrar_archivo, name="mostrar-archivo"),
]


#Aqui van las urls que van a editar o eliminar los contenidos ( DELETE, UPDATE )