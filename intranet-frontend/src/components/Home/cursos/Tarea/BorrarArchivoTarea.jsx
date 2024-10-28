import { useDispatch } from "react-redux";
import { useFetch } from "../../../../services/llamados";
import { deleteContenidosTareas } from "../../../../redux/ObtenerDatosTareaSlice";

const BorrarArchivoTarea = ({ id }) => {
  const token = sessionStorage.getItem("token");
  const accion = useDispatch();
  const { fetch_the_data } = useFetch();

  const borrarTarea = async () => {
    if (!id) {
      console.log("ID no válido:", id);
      return;
    }

    const archivo_id = id; // Convertir a entero
    console.log(id);

    try {
      const response = await fetch_the_data(
        `http://localhost:8000/info_tareas/borrar_archivo_tarea/${archivo_id}`,
        token,
        "DELETE"
      );
      if (response[0] === 200) {
        accion(deleteContenidosTareas({ id: archivo_id }));
      } else {
        console.log("Error al eliminar el archivo:", response[1]);
      }
    } catch (error) {
      console.error("Error en la solicitud de eliminación:", error);
    }
  };

  return (
    <div>
      <button id={id} onClick={borrarTarea}>
        Eliminar
      </button>
    </div>
  );
};

export default BorrarArchivoTarea;
