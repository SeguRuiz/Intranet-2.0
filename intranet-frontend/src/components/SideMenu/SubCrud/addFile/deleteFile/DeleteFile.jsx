import { useFetch } from "../../../../../services/llamados";
import { delete_archivos_subcontenidos } from "../../../../../redux/CursosContenidosSlice";
import { useDispatch } from "react-redux";
import { useCustomNotis } from "../../../../../utils/customHooks";
import "./Delete_file.css";
import { getCookie } from "../../../../../utils/Cookies";
import {
  MenuItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
const DeleteFile = ({ id, contenido_id, archivo_key, set }) => {
  const { fetching, fetch_the_data } = useFetch();
  const token = getCookie("token");
  const accion = useDispatch();
  const { error_mensaje } = useCustomNotis();
  console.log(archivo_key);

  const DeleteFile = async () => {
    const data = await fetch_the_data(
      "https://intranet-2-0-api.onrender.com/files/eliminar_archivo_from_google_cloud_and_subcont",
      token,
      "DELETE",
      {
        file_id: archivo_key,
      }
    );
    if (data[0] == 200) {
      accion(
        delete_archivos_subcontenidos({
          contenido_id: contenido_id,
          subcontenido_id: id,
          key: archivo_key,
        })
      );
      set(false);
    } else {
      error_mensaje("Ocurrio un error al eliminar el archivo");
    }
  };

  return (
    <>
      <MenuItem
        onClick={() => {
          !fetching && DeleteFile();
        }}
        disabled={fetching}
      >
        <ListItemIcon>
          {fetching ? (
            <CircularProgress size={20} color="var(--OnsurfaceVariant)" />
          ) : (
            <ClearIcon sx={{ color: "var(--OnsurfaceVariant)" }} />
          )}
        </ListItemIcon>
        <ListItemText
          primary={fetching ? "Eliminando.." : "Desligar archivo actual"}
        />
      </MenuItem>
    </>
  );
};

export default DeleteFile;
