from rest_framework.routers import DefaultRouter
from .views import UsersCreate, UsersCreatePrivate
router = DefaultRouter()
router.register(prefix=r'user' , basename='user-create', viewset=UsersCreate )
router.register(prefix=r'user-private', basename='user-private-create', viewset=UsersCreatePrivate)