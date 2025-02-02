import {
  MenuItem,
  ListItemText,
  ListItemIcon,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { getCookie } from "../../../../utils/Cookies";
import { useFetch } from "../../../../services/llamados";
import MuiModal from "../../../MuiModal/MuiModal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { eliminar_reporte } from "../../../../redux/ControlUsuariosSlice";
const Delete_reporte = ({ id = null }) => {
  const token = getCookie("token");
  const accion = useDispatch();
  const [open, setOpen] = useState(false);
  const { fetch_the_data, fetching } = useFetch();

  const eliminar_report = async () => {
    setOpen(false);
    const data = await fetch_the_data(
      "http://localhost:8000/reportes/reportes_edit",
      token,
      "DELETE",
      null,
      id
    );

    accion(eliminar_reporte({ id: id }));
  };

  return (
    <>
      <MenuItem
        onClick={() => {
          setOpen(true);
        }}
        disabled={fetching}
      >
        <ListItemIcon>
          {fetching ? (
            <CircularProgress
              size={15}
              sx={{ color: "var(--Onsurfacevariant)" }}
            />
          ) : (
            <DeleteIcon
              sx={{ color: "var(--OnsurfaceVariant)" }}
              fontSize="10px"
            />
          )}
        </ListItemIcon>
        <ListItemText primary="Eliminar" />
      </MenuItem>
      <MuiModal
        Title="¿Quiere eliminar el reporte?"
        body="Estas a punto de eliminar el reporte deseas continuar?"
        acceptFunction={eliminar_report}
        open={open}
        setOpen={setOpen}
        maxWidth={30}
      />
    </>
  );
};

export default Delete_reporte;
