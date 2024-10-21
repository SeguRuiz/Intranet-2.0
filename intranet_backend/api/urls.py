from django.urls import path, include
from .routers import router
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

from .views import (
    CustomTokenObtainPairView,
    aignar_rol_a,
    eliminar_lista_usuarios,
    login,
    register,
    roles,
    verificar_token,
    verify_token,
    get_user_info
)

urlpatterns = [
    path("register/", register, name="register"),
    path("login/", login, name="login"),
    path("roles/", roles, name="roles"),
    path("asignar_rol_a/<int:pk>", aignar_rol_a, name="asignar_rol_a"),
    path("verificar_token/", verificar_token, name="verificar_token"),
    path(
        "eliminar_lista_usuarios/",
        eliminar_lista_usuarios,
        name="eliminar-lista-usuarios",
    ),
    path("token/", CustomTokenObtainPairView.as_view(), name="token"),
    path("verify/", verify_token, name="verificar-token-1"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("get_user_info/<int:pk>", get_user_info, name='get-user-info'),
    path("", include(router.urls))
]
