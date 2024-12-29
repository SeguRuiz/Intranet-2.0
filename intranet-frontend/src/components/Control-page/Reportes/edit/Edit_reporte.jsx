import {
  abrir_aside,
  set_editando_reporte,
} from "../../../../redux/ControlUsuariosSlice"; // Importa acciones de Redux para manejar el estado
import { useDispatch, useSelector } from "react-redux"; // Hooks de Redux para manejar acciones y acceder al estado
import { MenuItem } from "@mui/material"; // Componente para crear un elemento de menú
import { getCookie } from "../../../../utils/Cookies"; // Función para obtener cookies
import { useFetch } from "../../../../services/llamados"; // Hook para realizar solicitudes HTTP
import { MenuContext } from "../read/Menu_options_reportes"; // Contexto para manejar el menú
import { useContext } from "react"; // Hook para usar el contexto

function Edit_reporte({ reporte_id }) {
  const accion = useDispatch(); // Inicializa el despachador de Redux
  const { reportes } = useSelector((x) => x.ControlUsuarios); // Selecciona el estado de reportes desde Redux
  const { fetch_the_data } = useFetch(); // Hook para manejar solicitudes HTTP
  const { setMenu } = useContext(MenuContext); // Obtiene la función para manejar el menú desde el contexto
  const token = getCookie("token"); // Obtiene el token de autenticación del usuario

  const editando_reporte = async () => {
    // Función para manejar la edición de un reporte
    const reporte = reportes.find((x) => x.id == reporte_id); // Busca el reporte por su ID

    const data = await fetch_the_data(
      "http://localhost:8000/api/get_estudiante",
      token,
      "POST",
      {
        estudiante: reporte?.estudiante_id, // Envía el ID del estudiante asociado al reporte
      }
    );
    console.log(data); // Imprime los datos obtenidos para depuración

    // Manejo de la respuesta de la API
    if (data[0] == 200 && data != undefined) {
      // Si la respuesta es exitosa
      accion(
        set_editando_reporte({
          editando: true, // Marca que se está editando
          reporte_id: reporte_id, // ID del reporte a editar
          estudiante: data[1].nombre, // Nombre del estudiante obtenido de la respuesta
          grupo: data[1].grupo, // Grupo del estudiante obtenido de la respuesta
          sede: data[1].sede, // Sede del estudiante obtenido de la respuesta
        })
      );
      accion(abrir_aside()); // Abre el panel lateral para editar
      setMenu(null); // Restablece el menú a su estado inicial
    }
  };

  return <MenuItem onClick={editando_reporte}>Editar</MenuItem>; // Retorna un elemento de menú que ejecuta la función de edición al hacer clic
}

export default Edit_reporte; // Exporta el componente
