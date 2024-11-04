from rest_framework.routers import DefaultRouter
from .views import  ArchivosCreate
router = DefaultRouter()
router.register(
    prefix=r'archivos', basename='archivos', viewset=ArchivosCreate
)