import {
  MenuItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useFetch } from "../../../../services/llamados";
import { getCookie } from "../../../../utils/Cookies";
import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { bloquear_o_desbloquear_contenido } from "../../../../redux/CursosContenidosSlice";
const BloquearContenido = ({
  contenido_id = null,
  bloqueado = false,
  setOpen,
  disabled = false
}) => {
  const token = getCookie("token");
  const accion = useDispatch();

  const { fetch_the_data, fetching } = useFetch();
  const [EstaBloqueado, setEstaBloqueado] = useState(bloqueado);

  useEffect(() => {
    setEstaBloqueado(!bloqueado);
  }, [bloqueado]);

  const bloquear_o_debloquear_carpeta = async () => {
    const data = await fetch_the_data(
      "http://localhost:8000/cursos_contenidos/contenidos_edit",
      token,
      "PATCH",
      {
        bloqueado: EstaBloqueado,
      },
      contenido_id
    );
    if (data[0] == 200) {
      accion(
        bloquear_o_desbloquear_contenido({
          id: contenido_id,
          bloqueado: EstaBloqueado,
        })
      );
      setOpen(!EstaBloqueado);
    }
  };

  return (
    <MenuItem onClick={bloquear_o_debloquear_carpeta} disabled={fetching || disabled}>
      {fetching ? (
        <>
          <ListItemIcon>
            <CircularProgress size={20} color="var(--OnsurfaceVariant)" />
          </ListItemIcon>
          <ListItemText
            primary={!EstaBloqueado ? "Desbloqueando..." : "Bloqueando..."}
          ></ListItemText>
        </>
      ) : (
        <>
          <ListItemIcon>
            {EstaBloqueado ? (
              <LockIcon sx={{ color: "var(--OnsurfaceVariant)" }} />
            ) : (
              <LockOpenIcon sx={{ color: "var(--OnsurfaceVariant)" }} />
            )}
          </ListItemIcon>
          <ListItemText
            primary={`${
              EstaBloqueado ? "Bloquear carpeta" : "Desbloquear carpeta"
            }`}
            sx={{ color: "var(--OnsurfaceVariant)" }}
          />
        </>
      )}
    </MenuItem>
  );
};

export default BloquearContenido;
