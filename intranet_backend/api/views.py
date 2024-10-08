from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Estudiantes, Roles, Usuarios
from .serializers import EstudiantesSerializer, RolesSerializer, UsersSerializer

# Create your views here.


@api_view(["POST", "GET"])
def register(request):
    serializer = UsersSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

        user = Usuarios.objects.get(correo=serializer.data["email"])
        user.set_password(serializer.data["password"])
        user.save()

        return Response({"user": serializer.data}, status=status.HTTP_201_CREATED)

    if request.method == "GET":
        usuarios = Usuarios.objects.all()
        usuarios_serializer = UsersSerializer(instance=usuarios, many=True)

        return Response(
            {"usuarios": usuarios_serializer.data}, status=status.HTTP_200_OK
        )

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def login(request):
    try:
        user = get_object_or_404(Usuarios, correo=request.data["correo"])

        if not user.check_password(request.data["password"]):
            return Response(
                {"info": "contraseña invalida"}, status=status.HTTP_400_BAD_REQUEST
            )

        token, created = Token.objects.get_or_create(user=user)
        serializer = UsersSerializer(instance=user)

        return Response(
            {
                "token_creado": created,
                "token_de_usuario": token.key,
                "info":{
                "username": serializer.data["username"],
                "nombre": serializer.data["nombre"],
                "correo": serializer.data["correo"],
                "cedula": serializer.data["cedula"]
                }
            },
            status=status.HTTP_200_OK,
        )
    except KeyError:
        return Response(
            {
                "info": "el objeto debe tener este formato:{correo:valor, password:valor}"
            },
            status=status.HTTP_400_BAD_REQUEST,
        )


@api_view(["POST", "GET"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def roles(request):
    if request.method not in ["POST"]:
        roles = Roles.objects.all()
        serializer = RolesSerializer(instance=roles, many=True)

        return Response({"roles": serializer.data}, status=status.HTTP_200_OK)

    rol = RolesSerializer(data=request.data)

    if rol.is_valid():
        rol.save()

        return Response({"rol_creado": rol.data}, status.HTTP_201_CREATED)

    return Response(rol.errors, status.HTTP_400_BAD_REQUEST)


@api_view(["PATCH"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def aignar_rol_a(request, pk=None):
    user = get_object_or_404(Usuarios, pk=pk)
    user_serializer = UsersSerializer(instance=user)

    try:
        rol = get_object_or_404(Roles, tipo=request.data["rol"])
        rol_serializer = RolesSerializer(instance=rol)
        user.rol_id = rol
        user.save()

        if rol.tipo in ["estudiante", "Estudiante"]:
            try:
                estudiante_existente = Estudiantes.objects.get(usuario_id=user.id)
                estudiante_existente.activo = True
                estudiante_existente.save()

                return Response(
                    {"info": f"Estudiante {user.nombre} reactivado"},
                    status=status.HTTP_200_OK,
                )
            except Estudiantes.DoesNotExist:
                nuevo_estudiante = Estudiantes(usuario_id=user)
                nuevo_estudiante.save()
                serializer_estudiante = EstudiantesSerializer(instance=nuevo_estudiante)

                return Response(
                    {
                        "Usuario": user_serializer.data["nombre"],
                        "nuevo_rol": rol_serializer.data["tipo"],
                        "nuevo_estudiante": serializer_estudiante.data,
                    },
                    status=status.HTTP_200_OK,
                )

        try:
            estudiante_revocado = Estudiantes.objects.get(usuario_id=user.id)
            estudiante_revocado.activo = False
            estudiante_revocado.save()
            return Response(
                {
                    "Usuario": user_serializer.data["nombre"],
                    "nuevo_rol": rol_serializer.data["tipo"],
                    "info": "estudiante revocado",
                },
                status=status.HTTP_200_OK,
            )
        except Estudiantes.DoesNotExist:
            return Response(
                {
                    "Usuario": user_serializer.data["nombre"],
                    "nuevo_rol": rol_serializer.data["tipo"],
                },
                status=status.HTTP_200_OK,
            )

    except KeyError:
        return Response(
            {"info": "el objeto debe tener esta forma {rol:rol_a_asignar}"},
            status=status.HTTP_400_BAD_REQUEST,
        )
