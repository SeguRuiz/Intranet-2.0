from .router import router
from django.urls import include, path

from .views import  (Info_tareasDelete, guardar_archivo_tareas, borrar_archivo_tarea, obtener_archivo_tarea)

urlpatterns = [
   path("", include(router.urls)),
   path("delete/<uuid:pk>", Info_tareasDelete.as_view(), name="Info_Tareas_Delete"),
   path("guardar_archivo_tarea/", guardar_archivo_tareas, name="guardar-archivo-tarea"),
   path("borrar_archivo_tarea/<uuid:pk>/", borrar_archivo_tarea, name="borrar-archivo-tarea"),
   path("obtener_archivo_tarea/", obtener_archivo_tarea, name="obtener-archivo-tarea"),
]


#Aqui van las urls que van a editar o eliminar los contenidos ( DELETE, UPDATE )