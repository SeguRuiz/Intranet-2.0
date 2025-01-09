import { useFetch } from "../../../../services/llamados"; // Hook personalizado para realizar llamadas a la API
import { useSelector } from "react-redux"; // Hook para acceder al estado de Redux
import { useDispatch } from "react-redux"; // Hook para enviar acciones a Redux
import { set_sedes } from "../../../../redux/ControlUsuariosSlice"; // Acción para actualizar la lista de sedes
import { vaciar_ids_temporales } from "../../../../redux/ControlUsuariosSlice"; // Acción para vaciar IDs temporales
import { useCustomNotis } from "../../../../utils/customHooks"; // Hook personalizado para notificaciones
import { getCookie } from "../../../../utils/Cookies"; // Función para obtener cookies
import { set_grupos } from "../../../../redux/ControlUsuariosSlice"; // Acción para actualizar la lista de grupos
import { set_fetching } from "../../../../redux/FetchsSlice";
const Delete_sedes = () => {
  // Hook para manejar las notificaciones
  const { ok_mensaje, error_mensaje } = useCustomNotis(
    "ocurrio un error",
    "La sede se elimino correctamente"
  );

  // Obtiene el estado de sedes y la selección actual desde Redux
  const { seleccion_multiple_sedes, sedes, grupos } = useSelector(
    (e) => e.ControlUsuarios
  );

  const accion = useDispatch(); // Obtiene la función de despacho de Redux
  const { fetch_the_data } = useFetch(); // Obtiene la función de llamada a la API
  const token = getCookie("token"); // Obtiene el token de autenticación de las cookies

  // Función para eliminar la lista de sedes seleccionadas
  const eliminar_lista_sedes = async () => {
    accion(set_fetching(true))
    const data = await fetch_the_data(
      "http://localhost:8000/cursos/eliminar_lista_sedes",
      token,
      "DELETE",
      {
        sedes: seleccion_multiple_sedes, // Envía las sedes seleccionadas para eliminar
      }
    );

    // Si no hay datos, muestra un mensaje de error
    data == undefined && error_mensaje();

    // Si la respuesta es exitosa, actualiza el estado
    if (data[0] == 200) {
      console.log(data); // Muestra los datos en consola para depuración

      // Crea copias de las sedes y grupos actuales para modificarlos
      let sedes_copia = [...sedes];
      let grupos_copia = [...grupos];

      // Filtra las sedes y grupos que no están en la selección para eliminar
      seleccion_multiple_sedes.forEach((e) => {
        const sedes_filtered = sedes_copia.filter((x) => x.id != e.sede_id);
        const grupos_filtered = grupos_copia.filter(
          (x) => x.sede_id != e.sede_id
        );
        sedes_copia = sedes_filtered;
        grupos_copia = grupos_filtered;
      });

      // Actualiza el estado de Redux con las sedes y grupos filtrados
      accion(set_sedes(sedes_copia));
      accion(set_grupos(grupos_copia));
      accion(vaciar_ids_temporales("sedes")); // Vacía los IDs temporales
    } else {
      error_mensaje(); // Muestra un mensaje de error si la eliminación falla
    }
    accion(set_fetching(false))
  };

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="30px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="var(--OnSecondary-color)" // Color del icono
        onClick={eliminar_lista_sedes} // Llama a la función al hacer clic
      >
        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
      </svg>
    </>
  );
};

export default Delete_sedes; // Exporta el componente
