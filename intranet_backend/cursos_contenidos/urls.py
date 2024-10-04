from django.urls import include, path
from .router import router
from .views import ContenidosEdit, SubContenidosEdit, get_contenidos_and_subcontenidos
urlpatterns = [
    path("", include(router.urls)),
    path("contenidos_edit/<uuid:pk>", ContenidosEdit.as_view(), name='contenidos-edit' ),
    path("subcontenidos_edit/<uuid:pk>", SubContenidosEdit.as_view(), name='subcontenidos-edit'),
    path("get_contenidos_and_subcontenidos/<uuid:pk>", get_contenidos_and_subcontenidos, name='get_contenidos_and_subcontenidos')     
]
