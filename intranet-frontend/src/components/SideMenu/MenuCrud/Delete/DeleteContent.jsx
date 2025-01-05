"componente deprecado"
import { useFetch } from "../../../../services/llamados";
import { deleteContenidos } from "../../../../redux/CursosContenidosSlice";
import { useDispatch } from "react-redux";
import { IconButton, ListItemIcon, ListItemText } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "./DeleteContent.css";
import { getCookie } from "../../../../utils/Cookies";
import MuiModal from "../../../MuiModal/MuiModal";

import { MenuItem } from "@mui/material";
import { useState } from "react";
const DeleteContent = ({ id, subcontenidos = [], nombreCarpeta = "" }) => {
  const accion = useDispatch();
  const [open, setOpen] = useState(false);
  const token = getCookie("token");
  const { fetch_the_data } = useFetch();

  const deleteC = async () => {
    fetch_the_data(
      "http://localhost:8000/cursos_contenidos/eliminar_contenidos_files",
      token,
      "DELETE",
      {
        contenido_id: id,
      }
    );
    accion(deleteContenidos({ id: id }));
  };
  return (
    <>
      <MenuItem
        onClick={() => {
          subcontenidos.length == 0 ? deleteC() : setOpen(true);
        }}
      >
        <ListItemIcon>
          <DeleteIcon sx={{ color: "var(--OnsurfaceVariant)" }} />
        </ListItemIcon>
        <ListItemText
          primary="Eliminar"
          sx={{ color: "var(--OnsurfaceVariant)" }}
        />
      </MenuItem>
      <MuiModal
        setOpen={setOpen}
        open={open}
        acceptFunction={deleteC}
        Title="¿Borrar carpeta?"
        body={`Parece que la carpeta ${nombreCarpeta} contiene archivos dentro, ¿quieres eliminarla de todas formas?`}
      />
    </>
  );
};

export default DeleteContent;
