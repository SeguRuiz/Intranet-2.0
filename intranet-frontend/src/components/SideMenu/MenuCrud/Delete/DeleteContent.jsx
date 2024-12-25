import { useFetch } from "../../../../services/llamados";
import { deleteContenidos } from "../../../../redux/CursosContenidosSlice";
import { useDispatch } from "react-redux";
import { IconButton, ListItemIcon, ListItemText } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import "./DeleteContent.css";
import { getCookie } from "../../../../utils/Cookies";

import {MenuItem} from "@mui/material";
const DeleteContent = ({ id, open = false }) => {
  const accion = useDispatch();
  const token = getCookie("token");
  const { fetch_the_data } = useFetch();

  const deleteC = async () => {
    fetch_the_data(
      "http://localhost:8000/cursos_contenidos/contenidos_edit",
      token,
      "DELETE",
      null,
      id
    );
    accion(deleteContenidos({ id: id }));
  };
  return <MenuItem onClick={deleteC}>
     <ListItemIcon>
      <DeleteIcon sx={{color: 'var(--OnsurfaceVariant)', }}/>
     </ListItemIcon>
     <ListItemText primary="Eliminar"  sx={{color: 'var(--OnsurfaceVariant)'}}/>
    </MenuItem>;
};

export default DeleteContent;
