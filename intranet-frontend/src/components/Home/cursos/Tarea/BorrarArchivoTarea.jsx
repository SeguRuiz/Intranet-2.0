import { useDispatch } from "react-redux";
import { useFetch } from "../../../../services/llamados";
import { borrarArchivos } from "../../../../redux/ObtenerDatosTareaSlice";

const BorrarArchivoTarea = ({ id }) => {
  const token = sessionStorage.getItem("token");
  const accion = useDispatch();
  const { fetch_the_data } = useFetch();

  const borrarTarea = async () => {
    if (!id) {
      console.log("ID no válido:", id);
      return;
    }

    const archivo_id = id;
    console.log(id);

    try {
      const response = await fetch_the_data(
        `http://localhost:8000/tareas/borrar_archivo_tarea/${archivo_id}`,
        null,
        "DELETE"
      );

      // Verifica response[0]
      if (response[0] === 200) {
        accion(borrarArchivos({ id: archivo_id }));
        console.log("Archivo eliminado exitosamente.");
      } else {
        console.log("Error al eliminar el archivo:", response.data);
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
