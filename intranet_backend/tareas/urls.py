from .router import router
from django.urls import include, path

from .views import Info_tareasCreate, Info_tareasDelete

urlpatterns = [
   path("", include(router.urls)),
   # path("Info_tareas/<uuid:pk>", Info_tareasCreate.as_view(), name="Info_Tareas_Create"),
]
