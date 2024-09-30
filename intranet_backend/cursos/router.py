from rest_framework.routers import DefaultRouter

from .views import GruposCreate, IntengrantesGrupoCreate, SedesCreate, CursosCreate, GruposCursosCreate

router = DefaultRouter()
router.register(prefix=r"sedes", basename="sedes-create", viewset=SedesCreate)
router.register(prefix=r"grupos", basename="grupos-create", viewset=GruposCreate)
router.register(
    prefix=r"integrantes_de_grupo",
    basename="Intengrantes-de-grupo-create",
    viewset=IntengrantesGrupoCreate,
)
router.register(
    prefix=r'cursos',
    basename='cursos-create',
    viewset=CursosCreate
)
router.register(
    prefix=r'grupos_cursos',
    basename='grupos-cursos-create',
    viewset=GruposCursosCreate
)