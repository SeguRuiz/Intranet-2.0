from api.models import Estudiantes, Roles, Usuarios
from api.serializers import EstudiantesSerializer
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAdminUser, IsAuthenticated
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

# Create your views here.


class SedesCreate(ModelViewSet):
    queryset = Sedes.objects.all()
    serializer_class = SedesSerializer
    lookup_field = "pk"
    permission_classes = [IsAdminUser]
    authentication_classes = [JWTAuthentication]


class SedesDelete(RetrieveUpdateDestroyAPIView):
    queryset = Sedes.objects.all()
    serializer_class = SedesSerializer
    lookup_field = "pk"
    permission_classes = [IsAdminUser]
    authentication_classes = [JWTAuthentication]


class GruposEdit(RetrieveUpdateDestroyAPIView):
    queryset = Grupos.objects.all()
    serializer_class = GruposSerializer
    lookup_field = "pk"
    permission_classes = [IsAdminUser]
    permission_classes = [JWTAuthentication]


class GruposCreate(ModelViewSet):
    queryset = Grupos.objects.all()
    serializer_class = GruposSerializer
    lookup_field = "pk"
    permission_classes = [IsAdminUser]
    authentication_classes = [JWTAuthentication]


class IntengrantesGrupoCreate(ModelViewSet):
    queryset = Intengrantes_de_grupo.objects.all()
    serializer_class = IntengratesGruposSerializer
    lookup_field = "pk"
    permission_classes = [IsAdminUser]
    authentication_classes = [JWTAuthentication]


class IntegrantesGrupoEdit(RetrieveUpdateDestroyAPIView):
    queryset = Intengrantes_de_grupo.objects.all()
    serializer_class = IntengratesGruposSerializer
    lookup_field = "pk"
    permission_classes = [IsAdminUser]
    authentication_classes = [JWTAuthentication]


class CursosCreate(ModelViewSet):
    queryset = Cursos.objects.all()
    serializer_class = CursosSerializer
    lookup_field = "pk"


class CursosEdit(RetrieveUpdateDestroyAPIView):
    queryset = Cursos.objects.all()
    serializer_class = CursosSerializer
    lookup_field = "pk"
    permission_classes = [IsAdminUser]
    authentication_classes = [JWTAuthentication]


class GruposCursosCreate(ModelViewSet):
    queryset = Grupos_cursos_intermedia.objects.all()
    serializer_class = GruposCursosSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    lookup_field = "pk"


class GruposCursosEdit(RetrieveUpdateDestroyAPIView):
    queryset = Grupos_cursos_intermedia.objects.all()
    serializer_class = GruposCursosSerializer
    permission_classes = [IsAdminUser]
    authentication_classes = [JWTAuthentication]
    lookup_field = "pk"


@api_view(["DELETE"])
@permission_classes([IsAdminUser])
@authentication_classes([JWTAuthentication])
def eliminar_lista_sedes(request):
    try:
        # Itera a través de la lista de IDs de sedes proporcionada en el request
        for n in request.data["sedes"]:
            # Busca y elimina cada sede por su 'sede_id'
            Sedes.objects.get(pk=n["sede_id"]).delete()

        # Retorna un mensaje de éxito si todas las sedes fueron eliminadas correctamente
        return Response(
            {"info": "las sedes han sido eliminadas"}, status=status.HTTP_200_OK
        )
    except KeyError:
        # Retorna un mensaje de error si falta la clave 'sedes' en la solicitud
        return Response(
            {"info": "Se esperaba un array como respuesta"},
            status=status.HTTP_400_BAD_REQUEST,
        )


@api_view(["POST"])
@permission_classes([IsAdminUser])
@authentication_classes([JWTAuthentication])
def agregar_lista_integrantes(request):
    try:
        # Itera a través de la lista de usuarios proporcionada en el request
        for n in request.data["usuarios"]:
            # Crea una instancia del serializer para cada usuario con el grupo especificado
            serializer = IntengratesGruposSerializer(
                data={"usuario_id": n, "grupo_id": request.data["grupo_id"]}
            )

            # Si la data es válida, guarda la instancia en la base de datos
            if serializer.is_valid():
                serializer.save()

        # Retorna un mensaje de éxito si todos los usuarios fueron agregados correctamente al grupo
        return Response(
            {"info": "Los usuarios han sido creados"}, status=status.HTTP_200_OK
        )
    except KeyError:
        # Retorna un mensaje de error si falta la clave 'usuarios' o 'grupo_id' en la solicitud
        return Response(
            {"info": "El objeto está mal formulado"}, status=status.HTTP_400_BAD_REQUEST
        )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def get_grupos_y_integrantes(request):
    # Obtiene todos los grupos de la base de datos
    grupos = Grupos.objects.all()

    # Serializa todos los grupos y los convierte a un diccionario de datos
    grupos_data = GruposSerializer(instance=grupos, many=True).data

    # Para cada grupo, agrega los integrantes (IDs de usuarios) asociados al grupo
    for n in grupos_data:
        # Filtra los integrantes del grupo actual por 'grupo_id'
        integrantes = Intengrantes_de_grupo.objects.filter(grupo_id=n["id"]).values(
            "grupo_id", "usuario_id"
        )
        # Extrae solo los 'usuario_id' de los integrantes y los almacena en una lista
        user_ids = [n["usuario_id"] for n in integrantes]

        # Agrega la lista de 'user_ids' al grupo actual
        n.update(integrantes=user_ids)

    # Retorna los datos de todos los grupos junto con sus integrantes
    return Response(grupos_data, status=status.HTTP_200_OK)


@api_view(["DELETE"])
@permission_classes([IsAdminUser])
@authentication_classes([JWTAuthentication])
def eliminar_lista_grupos(request):
    try:
        # Itera a través de la lista de IDs de grupos proporcionada en el request
        for n in request.data["grupos"]:
            # Elimina cada grupo por su ID
            Grupos.objects.get(pk=n).delete()

        # Retorna un mensaje de éxito si todos los grupos fueron eliminados correctamente
        return Response(
            {"info": "los grupos han sido eliminados"}, status=status.HTTP_200_OK
        )
    except KeyError:
        # Retorna un mensaje de error si falta la clave 'grupos' en la solicitud
        return Response(
            {"info": "Se esperaba un array como respuesta"},
            status=status.HTTP_400_BAD_REQUEST,
        )


@api_view(["DELETE"])
@permission_classes([IsAdminUser])
@authentication_classes([JWTAuthentication])
def eliminar_integrantes(request):
    try:
        # Busca un integrante específico en el grupo por 'grupo_id' y 'usuario_id'
        Integrante = get_object_or_404(
            Intengrantes_de_grupo,
            grupo_id=request.data["grupo_id"],
            usuario_id=request.data["integrante_id"],
        )

        # Elimina el integrante encontrado
        Integrante.delete()

        # Retorna un mensaje de éxito
        return Response(
            {"info": "El integrante ha sido eliminado"}, status=status.HTTP_200_OK
        )
    except KeyError:
        # Retorna un mensaje de error si falta la clave 'grupo_id' o 'integrante_id'
        return Response(
            {"info": "El objeto está mal formulado"},
            status=status.HTTP_400_BAD_REQUEST,
        )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def usuarios_en_grupos(request):
    # Obtiene todos los IDs de usuarios en los grupos y los convierte en una lista de diccionarios
    integrantes = Intengrantes_de_grupo.objects.all().values("usuario_id")

    # Retorna la lista de IDs de usuarios en grupos
    return Response(integrantes, status=status.HTTP_200_OK)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def get_usurios_de_grupo(request):
    try:
        # Obtiene el usuario usando el ID proporcionado en la solicitud
        user = Usuarios.objects.get(pk=request.data["usuario_id"])

        # Si el grupo es "sin definir" y el usuario es staff, retorna una lista vacía para profesores y estudiantes
        if request.data["grupo_id"] == "sin definir" and user.is_staff:
            return Response(
                {"profesores": [], "estudiantes": []}, status=status.HTTP_200_OK
            )

        # Si el usuario no es staff, obtiene el grupo del usuario; si es staff, define 'grupo_id' como 'none'
        grupo_id = (
            Intengrantes_de_grupo.objects.get(usuario_id=request.data["usuario_id"])
            if not user.is_staff
            else "none"
        )

        # Filtra los integrantes en base al grupo del usuario o el 'grupo_id' en la solicitud
        Integrantes = Intengrantes_de_grupo.objects.filter(
            grupo_id=grupo_id.grupo_id
            if not user.is_staff
            else request.data["grupo_id"]
        ).values("usuario_id")

        # Crea una lista de IDs de usuarios en el grupo
        integrantes_array = [n["usuario_id"] for n in Integrantes]
        # Filtra los usuarios en base a los IDs de la lista y selecciona los campos especificados
        usuarios = Usuarios.objects.filter(id__in=integrantes_array).values(
            "id", "first_name", "last_name", "username", "cedula", "email", "rol_id_id"
        )

        # Para cada usuario en el grupo, se busca su rol y si es un estudiante
        for n in usuarios:
            try:
                # Intenta obtener el rol del usuario y el ID del estudiante
                rol = Roles.objects.get(id=n["rol_id_id"])
                estudiante = Estudiantes.objects.get(usuario_id=n["id"])
                estudiante_ser = EstudiantesSerializer(instance=estudiante)
                n.update(rol=rol.tipo)
                n.update(estu_id=estudiante_ser.data["id"])
            except Roles.DoesNotExist:
                # Si el rol no existe, asigna "No definido"
                n.update(rol="No definido")
            except Estudiantes.DoesNotExist:
                # Si el usuario no es estudiante, agrega "no definido" para 'estu_id'
                rol = Roles.objects.get(id=n["rol_id_id"])
                n.update(rol=rol.tipo)
                n.update(estu_id="no definido")

        # Clasifica los usuarios en 'profesores' y 'estudiantes' según su rol
        profesores = [n for n in usuarios if n["rol"].upper() == "PROFESOR"]
        estudiantes = [n for n in usuarios if n["rol"].upper() == "ESTUDIANTE"]

        # Retorna listas separadas de profesores y estudiantes
        return Response(
            {"profesores": profesores, "estudiantes": estudiantes},
            status=status.HTTP_200_OK,
        )

    except KeyError:
        # Maneja el error cuando falta una clave en el request
        return Response(
            {"info": "el objeto está mal formulado"}, status=status.HTTP_400_BAD_REQUEST
        )
    except Intengrantes_de_grupo.DoesNotExist:
        # Maneja el caso en el que el usuario no pertenece a ningún grupo
        return Response(
            {"info": "El usuario no está en ningún grupo"},
            status=status.HTTP_204_NO_CONTENT,
        )
