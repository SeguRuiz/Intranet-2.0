from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes, authentication_classes, api_view
from rest_framework.response import Response
from rest_framework import status

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
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]


class SedesDelete(RetrieveUpdateDestroyAPIView):
    queryset = Sedes.objects.all()
    serializer_class = SedesSerializer
    lookup_field = "pk"
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]


class GruposEdit(RetrieveUpdateDestroyAPIView):
    queryset = Grupos.objects.all()
    serializer_class = GruposSerializer
    lookup_field = "pk"
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]


class GruposCreate(ModelViewSet):
    queryset = Grupos.objects.all()
    serializer_class = GruposSerializer
    lookup_field = "pk"
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]


class IntengrantesGrupoCreate(ModelViewSet):
    queryset = Intengrantes_de_grupo.objects.all()
    serializer_class = IntengratesGruposSerializer
    lookup_field = "pk"
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]


class IntegrantesGrupoEdit(RetrieveUpdateDestroyAPIView):
    queryset = Intengrantes_de_grupo.objects.all()
    serializer_class = IntengratesGruposSerializer
    lookup_field = "pk"
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]


class CursosCreate(ModelViewSet):
    queryset = Cursos.objects.all()
    serializer_class = CursosSerializer
    lookup_field = "pk"
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    

class CursosEdit(RetrieveUpdateDestroyAPIView):
    queryset = Cursos.objects.all()
    serializer_class = CursosSerializer
    lookup_field = "pk"
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    

class GruposCursosCreate(ModelViewSet):
    queryset = Grupos_cursos_intermedia.objects.all()
    serializer_class = GruposCursosSerializer
    lookup_field = "pk"
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]


class GruposCursosEdit(RetrieveUpdateDestroyAPIView):
    queryset = Grupos_cursos_intermedia.objects.all()
    serializer_class = GruposCursosSerializer
    lookup_field = "pk"
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
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

