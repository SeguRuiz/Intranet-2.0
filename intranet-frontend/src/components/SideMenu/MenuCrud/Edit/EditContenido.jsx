import { ListItemIcon, MenuItem, ListItemText } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { MenuContext } from "../../../Control-page/Reportes/read/Menu_options_reportes";
import { useContext } from "react";
import EditOffIcon from "@mui/icons-material/EditOff";

const EditContenido = ({
  id = null,
  setEditando,
  editando = false,
  setOpen,
}) => {
  const { setMenu } = useContext(MenuContext);

  const setEditandoHandler = () => {
    setEditando(!editando);
    setOpen(false);
   
  };
  return (
    <MenuItem onClick={setEditandoHandler}>
      <ListItemIcon>
        {editando ? (
          <EditOffIcon sx={{ color: "var(--OnsurfaceVariant)" }} />
        ) : (
          <EditIcon sx={{ color: "var(--OnsurfaceVariant)" }} />
        )}
      </ListItemIcon>
      <ListItemText
        primary={editando ? "Dejar de editar" : "Editar nombre"}
        sx={{ color: "var(--OnsurfaceVariant)" }}
      />
    </MenuItem>
  );
};

export default EditContenido;
