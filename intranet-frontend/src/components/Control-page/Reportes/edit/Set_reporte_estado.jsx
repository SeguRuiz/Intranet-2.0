import {
  CircularProgress,
  Dialog,
  ListItemIcon,
  ListItemText,
  MenuItem,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  DialogContentText,
  TextField,
} from "@mui/material";
import { useFetch } from "../../../../services/llamados";
import { getCookie } from "../../../../utils/Cookies";
import { set_reporte } from "../../../../redux/ControlUsuariosSlice";
import { useDispatch, useSelector } from "react-redux";
import { MenuContext } from "../read/Menu_options_reportes";
import { useContext, useState } from "react";
import { set_fetching } from "../../../../redux/FetchsSlice";
import { useCustomNotis } from "../../../../utils/customHooks";
import BlockIcon from "@mui/icons-material/Block";
import CheckIcon from "@mui/icons-material/Check";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export const Set_reporte_estado = ({ reporte_id, accion = "denegar" }) => {
  const { fetch_the_data, fetching } = useFetch();
  const { userInSession } = useSelector((x) => x.Auth);
  const dispatch = useDispatch();
  const { setMenu } = useContext(MenuContext);
  const { ok_mensaje } = useCustomNotis(
    "No se pudieron envier los correos",
    "Se le a enviado un correo al estudiante"
  );
  const [open, setOpen] = useState(false);
  const [detalles, setDetalles] = useState("");
  const [error, setError] = useState("");

  const set_accion = () => {
    switch (accion.toLowerCase()) {
      case "denegar":
        return "denegado";
      case "aprobar":
        return "aprobado";
      case "dejar en espera":
        return "en espera";
      default:
        break;
    }
  };

  const token = getCookie("token");
  const set_estado = async () => {
    dispatch(set_fetching(true));
   

    if (accion == 'denegar'&&detalles.trim() == "") {
      setError("No puedes subir detalles en blanco");
      return;
    }

    const data = await fetch_the_data(
      "http://localhost:8000/reportes/reporte_estado",
      token,
      "POST",
      {
        estado: set_accion(),
        reporte_id: reporte_id,
        usuario_id: userInSession?.id,
        detalles: detalles
      }
    );

    if (data[0] == 200 && data != undefined) {
      ok_mensaje();
      dispatch(set_fetching(false));
      dispatch(set_reporte({ reporte_id: reporte_id, estado: set_accion() }));
      setOpen(false)
      setMenu(null);
      setDetalles("")
    }
  };

  return (
    <>
      <MenuItem
        onClick={() => {
          if (accion == 'denegar') {
            setOpen(true)
            return
          }
          set_estado()
        }}
        disabled={fetching}
      >
        <ListItemIcon>
          {accion.toLowerCase() == "denegar" && (
            <BlockIcon sx={{ color: "var(--OnsurfaceVariant)" }} />
          )}
          {accion.toLowerCase() == "aprobar" && (
            <CheckIcon sx={{ color: "var(--OnsurfaceVariant)" }} />
          )}
          {accion.toLowerCase() == "dejar en espera" && (
            <AccessTimeIcon sx={{ color: "var(--OnsurfaceVariant)" }} />
          )}
        </ListItemIcon>
        <ListItemText primary={accion.toLocaleLowerCase()} />

        {fetching && (
          <ListItemIcon
            sx={{
              ml: 2,
            }}
          >
            <CircularProgress size={15} />
          </ListItemIcon>
        )}
      </MenuItem>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        
      >
        {fetching && <CircularProgress size={15} sx={{
              position: 'absolute',
              right: 3,
              margin: 1,
              mt: 1.3
            }}/>}
        <DialogTitle>Cambiar estado del reporte  </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Por favor indica la razon, porque quieres <strong>{accion}</strong> el reporte?
           
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="detalles"
            name="detalles"
            label="Detalles"
            type="text"
            fullWidth
            multiline
            disabled={fetching}
            helperText={error}
            error={Boolean(error)}
            value={detalles}
            onChange={(o) => {
              setDetalles(o.target.value);
              setError("")
            }}
            minRows={1}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancelar
          </Button>
          <Button onClick={set_estado}>Subir</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
