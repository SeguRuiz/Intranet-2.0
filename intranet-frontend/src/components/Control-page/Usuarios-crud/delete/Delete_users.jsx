import { useSelector } from "react-redux"; // Hook para acceder al estado de Redux
import { useFetch } from "../../../../services/llamados"; // Hook personalizado para realizar solicitudes
import { set_usuarios } from "../../../../redux/ControlUsuariosSlice"; // Acción para establecer usuarios
import { vaciar_ids_temporales } from "../../../../redux/ControlUsuariosSlice"; // Acción para vaciar IDs temporales
import { useDispatch } from "react-redux"; // Hook para despachar acciones de Redux
import { set_fetching } from "../../../../redux/FetchsSlice"; // Acción para establecer el estado de fetching
import { useCustomNotis } from "../../../../utils/customHooks"; // Hook personalizado para notificaciones
import { useEffect } from "react"; // Hook de efecto de React
import { getCookie } from "../../../../utils/Cookies"; // Función para obtener cookies

const Delete_users = () => {
  // Obtiene la selección múltiple y los usuarios del estado de Redux
  const { seleccion_multiple, usuarios } = useSelector(
    (e) => e.ControlUsuarios
  );
  const accion = useDispatch(); // Hook para despachar acciones
  const token = getCookie("token"); // Obtiene el token de la cookie

  // Configura las notificaciones de éxito y error
  const { ok_mensaje, error_mensaje } = useCustomNotis(
    "Ocurrio un error",
    "Se eliminaron correctamente"
  );

  const { fetch_the_data, fetching, ok } = useFetch(); // Hook para realizar solicitudes y obtener estado de fetching

  // Efecto que se ejecuta al cambiar el estado de fetching
  useEffect(() => {
    accion(set_fetching(fetching)); // Actualiza el estado de fetching en Redux
  }, [fetching]);

  // Función para eliminar la lista de usuarios seleccionados
  const eliminar_lista_usuarios = async () => {
    const data = await fetch_the_data(
      "https://intranet-2-0-api.onrender.com/api/eliminar_lista_usuarios",
      token,
      "DELETE", // Realiza una solicitud DELETE para eliminar usuarios
      {
        usuarios: seleccion_multiple, // Envía la lista de usuarios seleccionados
      }
    );

    // Manejo de respuestas
    data == undefined && error_mensaje(); // Notificación de error si no hay respuesta
    if (data[0] == 200) {
      let usuarios_copia = [...usuarios]; // Crea una copia del estado de usuarios
      seleccion_multiple.forEach((e) => {
        const usuarios_filtered = usuarios_copia.filter((x) => x.id != e); // Filtra los usuarios que no están en la selección
        usuarios_copia = usuarios_filtered; // Actualiza la copia de usuarios
      });
      accion(set_usuarios(usuarios_copia)); // Actualiza el estado de usuarios en Redux
      accion(vaciar_ids_temporales("usuarios")); // Limpia los IDs temporales
    } else {
      error_mensaje(); // Notificación de error en caso de fallo
    }
  };

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="30px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="var(--OnSecondary-color)"
        onClick={eliminar_lista_usuarios} // Llama a la función de eliminación al hacer clic
      >
        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
      </svg>
    </>
  );
};

export default Delete_users;
