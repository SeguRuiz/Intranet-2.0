# Create your views here.
import json

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from django.core.serializers.json import DjangoJSONEncoder
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes, authentication_classes

from .models import Contenidos, SubContenidos
from .serializers import ContenidosSerializer, SubContenidosSerializer


class ContenidosCreate(ModelViewSet):
    queryset = Contenidos.objects.all()
    serializer_class = ContenidosSerializer
    lookup_field = "pk"
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]


class ContenidosEdit(RetrieveUpdateDestroyAPIView):
    queryset = Contenidos.objects.all()
    serializer_class = ContenidosSerializer
    lookup_field = "pk"
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]


class SubContenidosEdit(RetrieveUpdateDestroyAPIView):
    queryset = SubContenidos.objects.all()
    serializer_class = SubContenidosSerializer
    lookup_field = "pk"
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]


class SubContenidosCreate(ModelViewSet):
    queryset = SubContenidos.objects.all()
    serializer_class = SubContenidosSerializer
    lookup_field = "pk"
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]


#####


@api_view(["GET"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_contenidos_and_subcontenidos(request, pk=None):
    contenidos = Contenidos.objects.filter(curso=pk)
    contenidos_serializer = ContenidosSerializer(instance=contenidos, many=True)
    
    contenidos_list = contenidos_serializer.data

    for x in contenidos_list:
        SubCont = SubContenidos.objects.filter(contenido=x['id'])
        subContenidos_serializer = SubContenidosSerializer(instance=SubCont, many=True)
        SubCont_list = subContenidos_serializer.data
        x.update(subcontenidos=SubCont_list)


    return Response(contenidos_list, status=status.HTTP_200_OK)
