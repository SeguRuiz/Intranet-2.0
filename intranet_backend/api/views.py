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

from .models import Roles, Usuarios
from .serializers import RolesSerializer, UsersSerializer

# Create your views here.


@api_view(["POST"])
def register(request):
    serializer = UsersSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

        user = Usuarios.objects.get(username=serializer.data["username"])
        user.set_password(serializer.data["password"])
        user.save()

        return Response({"user": serializer.data}, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def login(request):
    user = get_object_or_404(Usuarios, username=request.data["username"])

    if not user.check_password(request.data["password"]):
        return Response(
            {"error": "contraseña invalida"}, status=status.HTTP_400_BAD_REQUEST
        )

    token, created = Token.objects.get_or_create(user=user)
    serializer = UsersSerializer(instance=user)

    return Response(
        {
            "fue_creado": created,
            "token_de_usuario": token.key,
            "username": serializer.data["username"],
            "nombre": serializer.data["nombre"],
            "cedula": serializer.data["cedula"],
        },
        status=status.HTTP_200_OK,
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
        rol = get_object_or_404(Roles,tipo=request.data["rol"])
        user.rol_id = rol
        user.save()

        rol_serializer = RolesSerializer(instance=rol)

        return Response(
            {
                "Usuario": user_serializer.data['nombre'],
                "nuevo_rol": rol_serializer.data['tipo'],
            },
            status=status.HTTP_200_OK
        )

    except KeyError:
        return Response(
            {"error": "el objeto debe tener esta forma {rol:rol_a_buscar}"},
            status=status.HTTP_400_BAD_REQUEST,
        )
