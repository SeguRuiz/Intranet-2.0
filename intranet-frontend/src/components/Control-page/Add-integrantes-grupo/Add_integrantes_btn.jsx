import { useFetch } from "../../../services/llamados";
import { useSelector } from "react-redux";
import {
  set_seleccion_integrantes,
  desactivar_seleccion_multiple,
  set_grupo_seleccionado,
  agregar_integrantes_de_grupo,
} from "../../../redux/ControlUsuariosSlice";
import { useDispatch } from "react-redux";
import { useCustomNotis } from "../../../utils/customHooks";
import { getCookie } from "../../../utils/Cookies";
import { agregar_usuarios_en_grupo } from "../../../redux/ControlUsuariosSlice";

const Add_integrantes_btn = () => {
  const { grupo_seleccionado, seleccion_multiple } = useSelector(
    (e) => e.ControlUsuarios // Obtiene los grupos seleccionados y los usuarios seleccionados
  );
  const token = getCookie("token"); // Obtiene el token de la cookie
  const { ok_mensaje, error_mensaje } = useCustomNotis(
    "Ocurrió un error",
    "Los integrantes se agregaron correctamente"
  ); // Mensajes personalizados para notificaciones
  const accion = useDispatch(); // Hook para despachar acciones de Redux

  const { fetch_the_data } = useFetch(); // Hook para realizar peticiones

  // Función para agregar integrantes al grupo seleccionado
  const agregar_integrante = async () => {
    if (grupo_seleccionado != null) {
      const data = await fetch_the_data(
        "https://intranet-2-0-api.onrender.com/cursos/agregar_lista_integrantes", // Endpoint de la API
        token,
        "POST",
        {
          grupo_id: grupo_seleccionado, // ID del grupo
          usuarios: seleccion_multiple, // Usuarios seleccionados
        }
      );
      data == undefined && error_mensaje(); // Muestra error si la respuesta es indefinida

      console.log(data);
      if (data[0] == 200) {
        console.log(data[0]);

        ok_mensaje(); // Notificación de éxito
        accion(
          agregar_integrantes_de_grupo({
            grupo_id: grupo_seleccionado,
            usuarios: seleccion_multiple,
          })
        ); // Agrega los integrantes al estado de Redux
        accion(
          agregar_usuarios_en_grupo({
            grupo_id: grupo_seleccionado,
            usuarios: seleccion_multiple,
          })
        ); // Actualiza la lista de usuarios en el grupo
        accion(set_grupo_seleccionado(null)); // Resetea el grupo seleccionado
        accion(desactivar_seleccion_multiple()); // Desactiva la selección múltiple
        accion(set_seleccion_integrantes(false)); // Resetea la selección de integrantes
      } else {
        error_mensaje(); // Muestra mensaje de error si no es exitoso
      }
    }
  };

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="30px"
        fill="#9AA0A6"
        onClick={agregar_integrante} // Llama a la función al hacer clic
      >
        <path d="M440-320v-326L336-542l-56-58 200-200 200 200-56 58-104-104v326h-80ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
      </svg>
    </>
  );
};

export default Add_integrantes_btn;
