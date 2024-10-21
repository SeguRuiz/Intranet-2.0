from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
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
