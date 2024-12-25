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
    const data = await fetch_the_data(
      "http://localhost:8000/cursos_contenidos/subcontenidos_edit",
      token,
      "DELETE",
      null,
      id
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
