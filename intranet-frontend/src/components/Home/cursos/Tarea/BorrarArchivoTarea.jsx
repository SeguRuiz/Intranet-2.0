import { useDispatch } from "react-redux";
import { useFetch } from "../../../../services/llamados";
import { borrarArchivos } from "../../../../redux/ObtenerDatosTareaSlice";
import { IconButton } from "@mui/material";
import { Backdrop, CircularProgress } from "@mui/material";

const BorrarArchivoTarea = ({ id }) => {
  const token = sessionStorage.getItem("token");
  const accion = useDispatch();
  const { fetch_the_data, fetching } = useFetch();

  const borrarTarea = async () => {
    if (!id) {
      console.log("ID no válido:", id);
      return;
    }

    const archivo_id = id;

    try {
      const response = await fetch_the_data(
        `http://localhost:8000/tareas/borrar_archivo_tarea/${archivo_id}`,
        token,
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
    <>
      <IconButton id={id} onClick={borrarTarea}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="25px"
          viewBox="0 -960 960 960"
          width="25px"
          fill="var(--OnsurfaceVariant)"
        >
          <path d="M261-120q-24.75 0-42.37-17.63Q201-155.25 201-180v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570ZM367-266h60v-399h-60v399Zm166 0h60v-399h-60v399ZM261-750v570-570Z" />
        </svg>
      </IconButton>
      <Backdrop open={fetching}>
        <CircularProgress />
      </Backdrop>
    </>
  );
};

export default BorrarArchivoTarea;
