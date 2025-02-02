import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import EditOffIcon from "@mui/icons-material/EditOff";

const EditSubCont = ({ id = null, setEditando, editando = false }) => {
  return (
    <MenuItem
      onClick={() => {
        setEditando((prev) => !prev);
      }}
    >
      <ListItemIcon>
        {editando ? (
          <EditOffIcon sx={{ color: "var(--OnsurfaceVariant)" }} />
        ) : (
          <EditIcon sx={{ color: "var(--OnsurfaceVariant)" }} />
        )}
      </ListItemIcon>
      <ListItemText>
        {editando ? "Dejar de editar" : "Editar nombre"}
      </ListItemText>
    </MenuItem>
  );
};

export default EditSubCont;
