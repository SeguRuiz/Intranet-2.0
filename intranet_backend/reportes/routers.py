from rest_framework.routers import DefaultRouter
from .views import ReportesCreate
router = DefaultRouter()
router.register(prefix='reportes', basename='reportes-create', viewset=ReportesCreate)