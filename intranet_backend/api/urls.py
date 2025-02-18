from django.urls import include, path
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

from .routers import router
from .views import (
    CustomTokenObtainPairView,
    UsersEditPrivate,
    aignar_rol_a,
    eliminar_lista_usuarios,
    get_estudiante,
    get_estudiantes_activos,
    get_user_info,
    login,
    register,
    roles,
    verificar_token,
    verify_token,
    get_estudiante_info,
    EstudiantesListViewUnion
)

urlpatterns = [
    path("register/", register, name="register"),
    path("login/", login, name="login"),
    path("roles/", roles, name="roles"),
    path("asignar_rol_a/<int:pk>", aignar_rol_a, name="asignar_rol_a"),
    path("editar-user/<int:pk>", UsersEditPrivate.as_view(), name="editar-user"),
    
    path("verificar_token/", verificar_token, name="verificar_token"),
    path(
        "eliminar_lista_usuarios/",
        eliminar_lista_usuarios,
        name="eliminar-lista-usuarios",
    ),
    path("token/", CustomTokenObtainPairView.as_view(), name="token"),
    path("verify/", verify_token, name="verificar-token-1"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("get_user_info/<int:pk>", get_user_info, name="get-user-info"),
    path("", include(router.urls)),
    path(
        "estudiantes_activos/", get_estudiantes_activos, name="get_estudiantes_activos"
    ),
    path("get_estudiante/", get_estudiante, name="get_estudiante"),
    path("get_estudiante_info/<int:pk>", get_estudiante_info, name="get_estudiante_info"),
    path("get_all_estudiantes_info/", EstudiantesListViewUnion.as_view(), name="get_all_estudiantes_info"),
    
    
]
