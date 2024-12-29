import { useFetch } from "../../../../services/llamados"; // Hook para manejar solicitudes HTTP
import { useSelector } from "react-redux"; // Hook para acceder al estado de Redux
import { useDispatch } from "react-redux"; // Hook para despachar acciones a Redux
import { vaciar_ids_temporales } from "../../../../redux/ControlUsuariosSlice"; // Acción para vaciar IDs temporales
import { set_grupos } from "../../../../redux/ControlUsuariosSlice"; // Acción para establecer grupos en Redux
import { set_fetching } from "../../../../redux/FetchsSlice"; // Acción para gestionar el estado de carga
import { useCustomNotis } from "../../../../utils/customHooks"; // Hook para manejar notificaciones personalizadas
import { getCookie } from "../../../../utils/Cookies"; // Función para obtener cookies
import { set_usuarios_en_grupos } from "../../../../redux/ControlUsuariosSlice"; // Acción para establecer usuarios en grupos

const Delete_grupos = () => {
  // Extrae datos del estado de Redux
  const { seleccion_multiple_grupos, grupos, usuarios_en_grupos } = useSelector(
    (e) => e.ControlUsuarios
  );

  const { ok_mensaje, error_mensaje } = useCustomNotis(
    "ocurrio un error",
    "Se eliminaron correctamente" // Mensajes para notificaciones de éxito y error
  );

  const accion = useDispatch(); // Inicializa el despachador de Redux
  const { fetch_the_data } = useFetch(); // Hook para realizar solicitudes HTTP
  const token = getCookie("token"); // Obtiene el token de autenticación

  const eliminar_lista_usuarios = async () => {
    // Función para eliminar grupos
    accion(set_fetching(true)); // Indica que se está cargando

    const data = await fetch_the_data(
      "http://localhost:8000/cursos/eliminar_lista_grupos",
      token,
      "DELETE",
      {
        grupos: seleccion_multiple_grupos, // Envía los grupos seleccionados para eliminar
      }
    );

    if (data == undefined) {
      error_mensaje(); // Muestra mensaje de error si no hay respuesta
    } else if (data[0] == 200) {
      // Verifica si la respuesta es exitosa
      ok_mensaje(); // Mensaje de éxito
      let grupos_copia = [...grupos]; // Crea una copia del estado de grupos
      let usuarios_copia = [...usuarios_en_grupos]; // Crea una copia del estado de usuarios en grupos

      // Filtra los grupos y usuarios eliminados
      seleccion_multiple_grupos.forEach((e) => {
        const grupos_filtrados = grupos_copia.filter((x) => x.id != e);
        const usuarios_filtrados = usuarios_copia.filter(
          (x) => x.grupo_id != e
        );
        usuarios_copia = usuarios_filtrados;
        grupos_copia = grupos_filtrados;
      });

      // Actualiza el estado de Redux con los nuevos grupos y usuarios
      accion(set_grupos(grupos_copia));
      accion(set_usuarios_en_grupos(usuarios_copia));
      accion(vaciar_ids_temporales("grupos")); // Limpia los IDs temporales de grupos
      accion(set_fetching(false)); // Finaliza el estado de carga
    } else {
      error_mensaje(); // Muestra mensaje de error si la eliminación falla
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
        onClick={eliminar_lista_usuarios} // Maneja el clic para eliminar grupos
      >
        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
      </svg>
    </>
  );
};

export default Delete_grupos;
