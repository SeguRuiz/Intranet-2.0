from django.contrib import admin
from .models import Sedes, Grupos, Intengrantes_de_grupo, Cursos, Grupos_cursos_intermedia

admin.site.register(Sedes)
admin.site.register(Grupos)
admin.site.register(Intengrantes_de_grupo)
admin.site.register(Cursos)
admin.site.register(Grupos_cursos_intermedia)