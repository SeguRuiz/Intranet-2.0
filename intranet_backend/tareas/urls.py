from .router import router
from django.urls import include, path

from .views import  Info_tareasDelete

urlpatterns = [
   path("", include(router.urls)),
   path("delete/<uuid:pk>", Info_tareasDelete.as_view(), name="Info_Tareas_Delete"),
]


#Aqui van las urls que van a editar o eliminar los contenidos ( DELETE, UPDATE )