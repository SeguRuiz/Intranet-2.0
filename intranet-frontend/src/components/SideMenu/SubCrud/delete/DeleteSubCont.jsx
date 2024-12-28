import { useFetch } from "../../../../services/llamados";
import { deleteSubcontenidos } from "../../../../redux/CursosContenidosSlice";
import { useDispatch } from "react-redux";
import { MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import { getCookie } from "../../../../utils/Cookies";
import DeleteIcon from "@mui/icons-material/Delete";
const DeleteSubCont = ({ id, contenido_id }) => {
  const { fetch_the_data } = useFetch();
  const token = getCookie("token");
  const accion = useDispatch();
  const deleteSubCont = async () => {
    fetch_the_data(
      "https://intranet-2-0-api.onrender.com/cursos_contenidos/eliminar_archivo_y_sub",
      token,
      "DELETE",
      {
        id: id,
      }
    );

    accion(
      deleteSubcontenidos({ contenidoId: contenido_id, subcontenidoId: id })
    );
  };
  return (
    <MenuItem onClick={deleteSubCont}>
      <ListItemIcon>
        <DeleteIcon sx={{ color: "var(--OnsurfaceVariant)" }} />
      </ListItemIcon>
      <ListItemText
        primary="Eliminar"
        sx={{ color: "var(--OnsurfaceVariant)" }}
      />
    </MenuItem>
  );
};

export default DeleteSubCont;
