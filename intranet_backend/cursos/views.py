from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404, get_list_or_404
from rest_framework.response import Response
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import Sedes, Grupos, Intengrantes_de_grupo, Cursos, Grupos_cursos_intermedia
from rest_framework.viewsets import ModelViewSet
from .serializers import SedesSerializer, GruposSerializer, IntengratesGruposSerializer, CursosSerializer, GruposCursosSerializer


# Create your views here.

class SedesCreate(ModelViewSet):
    queryset = Sedes.objects.all()
    serializer_class = SedesSerializer
    lookup_field = 'pk'


class SedesDelete(RetrieveUpdateDestroyAPIView):
    queryset = Sedes.objects.all()
    serializer_class = SedesSerializer
    lookup_field = 'pk'


class GruposEdit(RetrieveUpdateDestroyAPIView):
    queryset = Grupos.objects.all()
    serializer_class = GruposSerializer
    lookup_field = 'pk'
    
class GruposCreate(ModelViewSet):
    queryset = Grupos.objects.all()
    serializer_class = GruposSerializer
    lookup_field = 'pk'

class IntengrantesGrupoCreate(ModelViewSet):
    queryset = Intengrantes_de_grupo.objects.all()
    serializer_class = IntengratesGruposSerializer
    lookup_field = 'pk'

class IntegrantesGrupoEdit(RetrieveUpdateDestroyAPIView):
    queryset = Intengrantes_de_grupo.objects.all()
    serializer_class = IntengratesGruposSerializer
    lookup_field = 'pk'

class CursosCreate(ModelViewSet):
    queryset = Cursos.objects.all()
    serializer_class = CursosSerializer
    lookup_field = 'pk'

class CursosEdit(RetrieveUpdateDestroyAPIView):
    queryset = Cursos.objects.all()
    serializer_class = CursosSerializer
    lookup_field = 'pk'
    
class GruposCursosCreate(ModelViewSet):
    queryset = Grupos_cursos_intermedia.objects.all()
    serializer_class = GruposCursosSerializer
    lookup_field = 'pk'
    
class GruposCursosEdit(RetrieveUpdateDestroyAPIView):
    queryset = Grupos_cursos_intermedia.objects.all()
    serializer_class = GruposCursosSerializer
    lookup_field = 'pk'
    