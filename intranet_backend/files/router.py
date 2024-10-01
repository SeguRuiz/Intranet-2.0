from rest_framework.routers import DefaultRouter
from .views import TiposArchivosCreate, ArchivosCreate
router = DefaultRouter()
router.register(
    prefix=r'tipos', basename='tipos', viewset=TiposArchivosCreate
)
router.register(
    prefix=r'archivos', basename='archivos', viewset=ArchivosCreate
)