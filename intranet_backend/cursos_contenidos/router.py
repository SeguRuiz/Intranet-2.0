from rest_framework.routers import DefaultRouter

from .views import ContenidosCreate, SubContenidosCreate
router = DefaultRouter()
router.register(
    prefix=r'contenidos', basename='contenidos', viewset=ContenidosCreate
)
router.register(
    prefix=r'subcontenidos', basename='subcontenidos-create', viewset=SubContenidosCreate
)