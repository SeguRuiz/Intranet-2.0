from rest_framework.routers import DefaultRouter
from .views import Info_tareasCreate, Info_tareasDelete

router = DefaultRouter()
router.register(
    prefix=r'info', basename='info-tareas', viewset=Info_tareasCreate
)
# router.register(
#     prefix=r'info', basename='info', viewset=Info_tareasDelete
# )