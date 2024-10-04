# Create your views here.
import json

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from django.core.serializers.json import DjangoJSONEncoder

from .models import Contenidos, SubContenidos
from .serializers import ContenidosSerializer, SubContenidosSerializer


class ContenidosCreate(ModelViewSet):
    queryset = Contenidos.objects.all()
    serializer_class = ContenidosSerializer
    lookup_field = "pk"


class ContenidosEdit(RetrieveUpdateDestroyAPIView):
    queryset = Contenidos.objects.all()
    serializer_class = ContenidosSerializer
    lookup_field = "pk"


class SubContenidosEdit(RetrieveUpdateDestroyAPIView):
    queryset = SubContenidos.objects.all()
    serializer_class = SubContenidosSerializer
    lookup_field = "pk"


class SubContenidosCreate(ModelViewSet):
    queryset = SubContenidos.objects.all()
    serializer_class = SubContenidosSerializer
    lookup_field = "pk"


#####


@api_view(["GET"])
def get_contenidos_and_subcontenidos(request, pk=None):
    contenidos = Contenidos.objects.filter(curso=pk).values()
    
    contenidos_list = [n for n in contenidos]

    for x in contenidos_list:
        SubCont = list(SubContenidos.objects.filter(contenido=x['id']).values())
        SubCont_list = [x for x in SubCont]
        x.update(subcontenidos=SubCont_list)

    
    contenidos_and_subcontenidos = json.dumps(contenidos_list, cls=DjangoJSONEncoder)

    return Response(contenidos_and_subcontenidos, status=status.HTTP_200_OK)
