from rest_framework.routers import DefaultRouter
from .views import UsersCreate
router = DefaultRouter()
router.register(prefix=r'user' , basename='user-create', viewset=UsersCreate )