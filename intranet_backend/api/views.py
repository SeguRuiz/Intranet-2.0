from cursos.models import Grupos, Intengrantes_de_grupo, Sedes
from cursos.serializers import GruposSerializer, IntengratesGruposSerializer
from cursos_contenidos.views import sendEmail
from django.shortcuts import get_object_or_404
from password_generator import PasswordGenerator
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import Estudiantes, Roles, Usuarios
from .serializers import (
    CustomJWTSerializer,
    EstudiantesSerializer,
    RolesSerializer,
    UsersSerializer,
)

# Create your views here.


class UsersCreate(ModelViewSet):
    model = Usuarios
    queryset = Usuarios.objects.all()
    serializer_class = UsersSerializer
    lookup_field = "id"
    permission_classes = [IsAdminUser]
    authentication_classes = [JWTAuthentication]


@api_view(["POST", "GET"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAdminUser])
def register(request):
    # Instancia para generar una contraseña aleatoria
    pw = PasswordGenerator()
    pw.minlen = 8  # Longitud mínima de la contraseña
    pw.maxlen = 8  # Longitud máxima de la contraseña
    
    # Obtener información del usuario desde la solicitud y generar contraseña
    user_info: dict = request.data
    user_info['password'] = pw.generate()  # Genera y asigna la contraseña al diccionario de información del usuario

    # Serializar los datos del usuario para validación y creación
    serializer = UsersSerializer(data=user_info)

    # Verificar si los datos son válidos
    if serializer.is_valid():
        serializer.save()  # Guardar el usuario si es válido

        # Obtener el objeto usuario creado en la base de datos
        user = Usuarios.objects.get(pk=serializer.data["id"])

        # Crear cuerpo del correo para notificar al usuario de su registro
        body = f"""
        Felicidades {user.first_name} {user.last_name}, has pasado a la primera etapa de evaluación.
        Aquí está la información de tu correo: {user.email} y tu respectiva contraseña: {user_info['password']}.
        Recuerda no compartirla con nadie más y suerte en este proceso.
        """
        
        # Enviar un correo electrónico al usuario con sus credenciales
        sendEmail(email_receiver=user.email, subject="Reenvío contraseña", body=body)

        # Guardar la contraseña cifrada en la base de datos
        user.set_password(serializer.data["password"])
        user.save()

        # Retornar la información del usuario creado con estado HTTP 201 (creado)
        return Response({"user": serializer.data}, status=status.HTTP_201_CREATED)

    # Si la solicitud es de tipo GET, retornar una lista de usuarios
    if request.method == "GET":
        usuarios = Usuarios.objects.all()
        usuarios_serializer = UsersSerializer(instance=usuarios, many=True)

        # Retornar lista de usuarios con estado HTTP 200 (OK)
        return Response(
            {"usuarios": usuarios_serializer.data}, status=status.HTTP_200_OK
        )

    # Retornar errores de validación con estado HTTP 400 (solicitud incorrecta)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Vista para manejar el inicio de sesión
@api_view(["POST"])
def login(request):
    try:
        # Obtener el usuario con el correo proporcionado o retornar un error 404
        user = get_object_or_404(Usuarios, email=request.data["email"])

        # Verificar si la contraseña es correcta
        if not user.check_password(request.data["password"]):
            return Response(
                {"info": "contraseña inválida"}, status=status.HTTP_400_BAD_REQUEST
            )

        # Crear o recuperar el token de autenticación del usuario
        token, created = Token.objects.get_or_create(user=user)
        serializer = UsersSerializer(instance=user)

        # Retornar el token y la información del usuario con estado HTTP 200 (OK)
        return Response(
            {
                "token_creado": created,
                "token_de_usuario": token.key,
                "info": serializer.data,
            },
            status=status.HTTP_200_OK,
        )
    except KeyError:
        # Retornar error si faltan campos requeridos en la solicitud
        return Response(
            {
                "info": "el objeto debe tener este formato:{correo:valor, password:valor}"
            },
            status=status.HTTP_400_BAD_REQUEST,
        )


@api_view(["POST", "GET"])
@authentication_classes([JWTAuthentication]) 
@permission_classes([IsAuthenticated])  
def roles(request):

    if request.method not in ["POST"]:
        roles = Roles.objects.all() 
        serializer = RolesSerializer(instance=roles, many=True) 

        return Response(serializer.data, status=status.HTTP_200_OK)  # Retorno los datos serializados con un código 200 (éxito)

    # Si el método de la solicitud es POST, crea un nuevo rol con los datos proporcionados
    rol = RolesSerializer(data=request.data)  

    # Verifica si los datos proporcionados son válidos
    if rol.is_valid():
        rol.save()  # Guarda el nuevo rol en la base de datos

        return Response(rol.data, status.HTTP_201_CREATED)  # Retorna los datos del rol creado con un código 201 (creado)

    # Si los datos no son válidos, retorna los errores de validación con un código 400 (solicitud incorrecta)
    return Response(rol.errors, status.HTTP_400_BAD_REQUEST)



@api_view(["PATCH"])
@authentication_classes([JWTAuthentication])  
@permission_classes([IsAdminUser])  
def aignar_rol_a(request, pk=None):
    # Obtiene el usuario especificado por el parámetro 'pk'
    user = get_object_or_404(Usuarios, pk=pk)  # Lanza un error 404 si no encuentra el usuario
    user_serializer = UsersSerializer(instance=user)  # Serializa la información del usuario

    try:
        # Obtiene el rol especificado en el cuerpo de la solicitud
        rol = get_object_or_404(Roles, tipo=request.data["rol"])  # Lanza un error 404 si no encuentra el rol
        rol_serializer = RolesSerializer(instance=rol)  # Serializa el rol
        user.rol_id = rol  # Asigna el rol al usuario
        user.is_staff = rol.tipo.upper() == "ADMIN"  # Marca al usuario como 'staff' si el rol es "ADMIN"
        user.save()  # Guarda los cambios del usuario

        # Si el rol asignado es "estudiante", activa o crea un registro de estudiante
        if rol.tipo in ["estudiante", "Estudiante"]:
            try:
                # Reactiva el perfil de estudiante si ya existe
                estudiante_existente = Estudiantes.objects.get(usuario_id=user.id)
                estudiante_existente.activo = True
                estudiante_existente.save()  # Guarda el estado activo del estudiante

                return Response(
                    {
                        "info": f"Estudiante {user.first_name} reactivado",
                        "rol_id": rol_serializer.data["id"],
                    },
                    status=status.HTTP_200_OK,
                )
            except Estudiantes.DoesNotExist:
                # Crea un nuevo perfil de estudiante si no existe
                nuevo_estudiante = Estudiantes(usuario_id=user)
                nuevo_estudiante.activo = True
                nuevo_estudiante.save()
                serializer_estudiante = EstudiantesSerializer(instance=nuevo_estudiante)

                return Response(
                    {
                        "Usuario": user_serializer.data["first_name"],
                        "nuevo_rol": rol_serializer.data["tipo"],
                        "rol_id": rol_serializer.data["id"],
                        "nuevo_estudiante": serializer_estudiante.data,
                    },
                    status=status.HTTP_200_OK,
                )

        # Si el rol no es "estudiante", desactiva el perfil de estudiante si existe
        try:
            estudiante_revocado = Estudiantes.objects.get(usuario_id=user.id)
            estudiante_revocado.activo = False  # Marca al estudiante como inactivo
            estudiante_revocado.save()
            return Response(
                {
                    "Usuario": user_serializer.data["first_name"],
                    "nuevo_rol": rol_serializer.data["tipo"],
                    "rol_id": rol_serializer.data["id"],
                    "info": "estudiante revocado",
                },
                status=status.HTTP_200_OK,
            )
        except Estudiantes.DoesNotExist:
            # Si el perfil de estudiante no existe, retorna la información del usuario con el nuevo rol
            return Response(
                {
                    "Usuario": user_serializer.data["first_name"],
                    "nuevo_rol": rol_serializer.data["tipo"],
                    "rol_id": rol_serializer.data["id"],
                },
                status=status.HTTP_200_OK,
            )

    # Captura el error de clave faltante en el diccionario de datos de la solicitud
    except KeyError:
        return Response(
            {
                "info": "el objeto debe tener esta forma {rol:rol_a_asignar}",  # Mensaje de error sobre el formato requerido
                "objeto": request.data,
            },
            status=status.HTTP_400_BAD_REQUEST,
        )


@api_view(["POST"])
def verificar_token(request):
    try:
        # Intento obtener el usuario asociado al token proporcionado en la solicitud
        user = Token.objects.get(key=request.data["token"]).user
        user_serializer = UsersSerializer(instance=user)  # Serializa la información del usuario

        # Retorno la información del usuario y una bandera de validez positiva si el token es válido
        return Response(
            {
                "id": user_serializer.data["id"],  
                "email": user_serializer.data["email"],  
                "rol_id": user_serializer.data["rol_id"], 
                "validez": True,  
            },
            status=status.HTTP_200_OK,
        )
    except KeyError:
        # Retorno un mensaje de error si la clave 'token' no está presente en el body
        return Response({"info": "El objeto está mal formulado"})
    except Token.DoesNotExist:
        # Retorno una respuesta 400 si el token no existe en la base de datos
        return Response({"validez": False}, status=status.HTTP_400_BAD_REQUEST)



@api_view(["DELETE"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAdminUser])
def eliminar_lista_usuarios(request):
    try:
        # Intenta eliminar cada usuario especificado en el array 'usuarios' proporcionado en la solicitud
        for n in request.data["usuarios"]:
            Usuarios.objects.get(pk=n).delete()  # Elimina al usuario por su ID

        # Retorna confirmación de éxito si se eliminan los usuarios
        return Response(
            {"info": "los usuarios han sido eliminados"}, status=status.HTTP_200_OK
        )
    except KeyError:
        # Retorna un error si la clave 'usuarios' no está en la solicitud
        return Response(
            {"info": "Se esperaba un array como respuesta"},
            status=status.HTTP_400_BAD_REQUEST,
        )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def verify_token(request):
    # Retorna confirmación de que el token es válido
    return Response({"info": "El token es vigente"}, status=status.HTTP_200_OK)


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomJWTSerializer  # Usa un serializer personalizado para obtener tokens JWT


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def get_user_info(request, pk):
    try:
        # Obtiene el usuario por su ID (pk) y lo serializa
        user = get_object_or_404(Usuarios, pk=pk)
        user_data = UsersSerializer(instance=user)
        
        # Obtiene el rol del usuario y los grupos a los que pertenece
        role = Roles.objects.get(pk=user_data.data["rol_id"])
        grupos = Intengrantes_de_grupo.objects.filter(
            usuario_id=user_data.data["id"]
        ).values("grupo_id")  # Filtra los grupos en los que el usuario es miembro

        # Serializa la información del rol
        role_data = RolesSerializer(instance=role)

        # Retorna la información detallada del usuario, rol, y grupos asociados
        return Response(
            {
                "id": user_data.data["id"],
                "rol": role_data.data["tipo"],
                "nombre": user_data.data["first_name"],
                "apellidos": user_data.data["last_name"],
                "is_staff": user_data.data["is_staff"],
                "is_socioemocional": user_data.data["is_socioemocional"],
                "grupos": grupos,
            },
            status=status.HTTP_200_OK,
        )
    except Roles.DoesNotExist:
        # Si el rol no existe, retorna un mensaje indicando que el rol no está definido
        return Response(
            {
                "id": user_data.data["id"],
                "rol": "no definido",
                "nombre": user_data.data["first_name"],
                "apellidos": user_data.data["last_name"],
                "is_staff": user_data.data["is_staff"],
            },
            status=status.HTTP_200_OK,
        )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def get_estudiantes_activos(request):
    # Obtiene el usuario basado en el ID proporcionado en la solicitud
    user = Usuarios.objects.get(pk=request.data["usuario_id"])

    # Si el usuario no es 'staff', obtiene el grupo al que pertenece; en caso contrario, asigna None
    grupo_user = (
        Intengrantes_de_grupo.objects.get(usuario_id=request.data["usuario_id"])
        if not user.is_staff
        else None
    )
    grupo_ser = IntengratesGruposSerializer(instance=grupo_user)

    # Filtra los usuarios en el grupo del usuario actual o todos si es 'staff'
    usuarios_filtered = (
        Intengrantes_de_grupo.objects.all().values("usuario_id")
        if user.is_staff
        else Intengrantes_de_grupo.objects.filter(
            grupo_id=grupo_ser.data["grupo_id"]
        ).values("usuario_id")
    )
    usuarios_en_grupo = [n["usuario_id"] for n in usuarios_filtered]

    # Obtiene estudiantes activos en el grupo filtrado
    estudiantes = Estudiantes.objects.filter(usuario_id__in=usuarios_en_grupo).exclude(
        activo=False
    )
    
    # Serializa la lista de estudiantes activos
    serializer = EstudiantesSerializer(instance=estudiantes, many=True)
    # Copia los datos básicos del estudiante para su procesamiento
    copy = [{"id": n["id"], "usuario_id": n["usuario_id"]} for n in serializer.data]

    # Agrega información detallada de cada estudiante en el grupo
    for x in copy:
        user = Usuarios.objects.get(pk=x["usuario_id"])
        integrante_id = Intengrantes_de_grupo.objects.get(usuario_id=x["usuario_id"])
        integrante_serializer = IntengratesGruposSerializer(instance=integrante_id)

        # Obtiene el grupo y la sede del estudiante
        grupo = Grupos.objects.get(pk=integrante_serializer.data["grupo_id"])
        grupo_serializer = GruposSerializer(instance=grupo)
        sede = Sedes.objects.get(pk=grupo_serializer.data["sede_id"])

        # Agrega detalles del grupo, sede y el nombre completo del estudiante
        x.update(grupo=grupo.nombre_grupo)
        x.update(grupo_id=grupo.id)
        x.update(label=f"{user.first_name} {user.last_name}")
        x.update(sede=sede.nombre)
        x.update(sede_id=sede.id)

    # Retorna la información detallada de los estudiantes activos
    return Response(copy, status=status.HTTP_200_OK)


@api_view(["POST"])
def get_estudiante(request):
    try:
        # Obtiene el estudiante y su información relacionada
        estudiante = get_object_or_404(Estudiantes, pk=request.data["estudiante"])
        estudiante_ser = EstudiantesSerializer(instance=estudiante)
        
        # Obtiene el usuario correspondiente al estudiante
        user = get_object_or_404(Usuarios, pk=estudiante_ser.data["usuario_id"])
        user_serializer = UsersSerializer(instance=user)
        
        # Obtiene el grupo del estudiante y su sede
        grupo_id = get_object_or_404(
            Intengrantes_de_grupo, usuario_id=user_serializer.data["id"]
        )
        integrante_ser = IntengratesGruposSerializer(instance=grupo_id)
        
        grupo = get_object_or_404(Grupos, pk=integrante_ser.data["grupo_id"])
        grupo_serializer = GruposSerializer(instance=grupo)
        
        sede = get_object_or_404(Sedes, pk=grupo_serializer.data["sede_id"])

        # Retorna información detallada del estudiante, incluyendo su grupo y sede
        return Response(
            {
                "nombre": f"{user_serializer.data['first_name']} {user_serializer.data['last_name']}",
                "id": user_serializer.data["id"],
                "grupo": grupo_serializer.data["nombre_grupo"],
                "sede": sede.nombre,
            },
            status=status.HTTP_200_OK,
        )
    except KeyError:
        # Retorna un mensaje de error si falta la clave esperada
        return Response(
            {"info": "Objeto mal formulado"}, status=status.HTTP_400_BAD_REQUEST
        )
