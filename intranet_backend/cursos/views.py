from api.models import Roles, Usuarios
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import (
    api_view,
)
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import (
    Cursos,
    Grupos,
    Grupos_cursos_intermedia,
    Intengrantes_de_grupo,
    Sedes,
)
from .serializers import (
    CursosSerializer,
    GruposCursosSerializer,
    GruposSerializer,
    IntengratesGruposSerializer,
    SedesSerializer,
)
from api.models import Estudiantes
from api.serializers import EstudiantesSerializer

# Create your views here.


class SedesCreate(ModelViewSet):
    queryset = Sedes.objects.all()
    serializer_class = SedesSerializer
    lookup_field = "pk"


class SedesDelete(RetrieveUpdateDestroyAPIView):
    queryset = Sedes.objects.all()
    serializer_class = SedesSerializer
    lookup_field = "pk"


class GruposEdit(RetrieveUpdateDestroyAPIView):
    queryset = Grupos.objects.all()
    serializer_class = GruposSerializer
    lookup_field = "pk"


class GruposCreate(ModelViewSet):
    queryset = Grupos.objects.all()
    serializer_class = GruposSerializer
    lookup_field = "pk"


class IntengrantesGrupoCreate(ModelViewSet):
    queryset = Intengrantes_de_grupo.objects.all()
    serializer_class = IntengratesGruposSerializer
    lookup_field = "pk"


class IntegrantesGrupoEdit(RetrieveUpdateDestroyAPIView):
    queryset = Intengrantes_de_grupo.objects.all()
    serializer_class = IntengratesGruposSerializer
    lookup_field = "pk"


class CursosCreate(ModelViewSet):
    queryset = Cursos.objects.all()
    serializer_class = CursosSerializer
    lookup_field = "pk"


class CursosEdit(RetrieveUpdateDestroyAPIView):
    queryset = Cursos.objects.all()
    serializer_class = CursosSerializer
    lookup_field = "pk"


class GruposCursosCreate(ModelViewSet):
    queryset = Grupos_cursos_intermedia.objects.all()
    serializer_class = GruposCursosSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    lookup_field = "pk"


class GruposCursosEdit(RetrieveUpdateDestroyAPIView):
    queryset = Grupos_cursos_intermedia.objects.all()
    serializer_class = GruposCursosSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    lookup_field = "pk"


@api_view(["DELETE"])
# @permission_classes([IsAuthenticated])
# @authentication_classes([TokenAuthentication])
def eliminar_lista_sedes(request):
    try:
        for n in request.data["sedes"]:
            Sedes.objects.get(pk=n["sede_id"]).delete()

        return Response(
            {"info": "las sedes han sido eliminados"}, status=status.HTTP_200_OK
        )
    except KeyError:
        return Response(
            {"info": "Se esperaba un array como respuesta"},
            status=status.HTTP_400_BAD_REQUEST,
        )


@api_view(["POST"])
# @permission_classes([IsAuthenticated])
# @authentication_classes([TokenAuthentication])
def agregar_lista_integrantes(request):
    try:
        for n in request.data["usuarios"]:
            serializer = IntengratesGruposSerializer(
                data={"usuario_id": n, "grupo_id": request.data["grupo_id"]}
            )

            if serializer.is_valid():
                serializer.save()

        return Response(
            {"info": "Los usuarios an sido creados"}, status=status.HTTP_200_OK
        )
    except KeyError:
        return Response(
            {"info": "El objeto esta mal formulado"}, status=status.HTTP_400_BAD_REQUEST
        )


@api_view(["GET"])
# @permission_classes([IsAuthenticated])
# @authentication_classes([TokenAuthentication])
def get_grupos_y_integrantes(request):
    grupos = Grupos.objects.all()

    grupos_data = GruposSerializer(instance=grupos, many=True).data

    for n in grupos_data:
        integrantes = Intengrantes_de_grupo.objects.filter(grupo_id=n["id"]).values(
            "grupo_id", "usuario_id"
        )
        user_ids = [n["usuario_id"] for n in integrantes]

        n.update(integrantes=user_ids)

    return Response(grupos_data, status=status.HTTP_200_OK)


@api_view(["DELETE"])
# @permission_classes([IsAuthenticated])
# @authentication_classes([TokenAuthentication])
def eliminar_lista_grupos(request):
    try:
        for n in request.data["grupos"]:
            Grupos.objects.get(pk=n).delete()

        return Response(
            {"info": "los grupos han sido eliminados"}, status=status.HTTP_200_OK
        )
    except KeyError:
        return Response(
            {"info": "Se esperaba un array como respuesta"},
            status=status.HTTP_400_BAD_REQUEST,
        )


@api_view(["DELETE"])
# @permission_classes([IsAuthenticated])
# @authentication_classes([TokenAuthentication])
def eliminar_integrantes(request):
    try:
        Integrante = get_object_or_404(
            Intengrantes_de_grupo,
            grupo_id=request.data["grupo_id"],
            usuario_id=request.data["integrante_id"],
        )

        Integrante.delete()

        return Response(
            {"info": "El integrante a sido eliminado"}, status=status.HTTP_200_OK
        )
    except KeyError:
        return Response(
            {"info": "El objeto esta mal formulado"},
            status=status.HTTP_400_BAD_REQUEST,
        )


@api_view(["GET"])
def usuarios_en_grupos(request):
    integrantes = Intengrantes_de_grupo.objects.all().values("usuario_id")

    return Response(integrantes, status=status.HTTP_200_OK)


@api_view(["POST"])
def get_usurios_de_grupo(request):
    try:
        user = Usuarios.objects.get(pk=request.data["usuario_id"])

        if request.data["grupo_id"] == "sin definir" and user.is_staff:
            return Response(
                {"profesores": [], "estudiantes": []}, status=status.HTTP_200_OK
            )

        grupo_id = (
            Intengrantes_de_grupo.objects.get(usuario_id=request.data["usuario_id"])
            if not user.is_staff
            else "none"
        )

        Integrantes = Intengrantes_de_grupo.objects.filter(
            grupo_id=grupo_id.grupo_id
            if not user.is_staff
            else request.data["grupo_id"]
        ).values("usuario_id")

        integrantes_array = [n["usuario_id"] for n in Integrantes]
        usuarios = Usuarios.objects.filter(id__in=integrantes_array).values(
            "id", "first_name", "last_name", "username", "cedula", "email", "rol_id_id"
        )

        for n in usuarios:
            try:
                rol = Roles.objects.get(id=n["rol_id_id"])
                estudiante= Estudiantes.objects.get(usuario_id=n['id'])
                estudiante_ser = EstudiantesSerializer(instance=estudiante)
                n.update(rol=rol.tipo)
                n.update(estu_id=estudiante_ser.data['id'])
            except Roles.DoesNotExist:
                n.update(rol="No definido")
                
            except Estudiantes.DoesNotExist:
                
                rol = Roles.objects.get(id=n["rol_id_id"])
                
                n.update(rol=rol.tipo)
                n.update(estu_id='no definido')
                
        profesores = [n for n in usuarios if n["rol"].upper() == "PROFESOR"]
        
        estudiantes = [n for n in usuarios if n["rol"].upper() == "ESTUDIANTE"]

        return Response(
            {"profesores": profesores, "estudiantes": estudiantes},
            status=status.HTTP_200_OK,
        )

    except KeyError:
        return Response(
            {"info": "el objeto esta mal formulado"}, status=status.HTTP_400_BAD_REQUEST
        )
    except Intengrantes_de_grupo.DoesNotExist:
        return Response(
            {"info": "El uusario no esta en ningun grupo"},
            status=status.HTTP_204_NO_CONTENT,
        )
