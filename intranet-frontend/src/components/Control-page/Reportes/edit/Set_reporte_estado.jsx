import { MenuItem } from "@mui/material";
import { useFetch } from "../../../../services/llamados";
import { getCookie } from "../../../../utils/Cookies";
import { set_reporte } from "../../../../redux/ControlUsuariosSlice";
import { useDispatch } from "react-redux";
import { MenuContext } from "../read/Menu_options_reportes";
import { useContext } from "react";
import { set_fetching } from "../../../../redux/FetchsSlice";
import { useCustomNotis } from "../../../../utils/customHooks";

export const Set_reporte_estado = ({ reporte_id, accion = "denegar" }) => {
  const { fetch_the_data } = useFetch();
  const dispatch = useDispatch();
  const { setMenu } = useContext(MenuContext);
  const { ok_mensaje } = useCustomNotis(
    "No se pudieron envier los correos",
    "Se le a enviado un correo al estudiante"
  );

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
    setMenu(null);
    const data = await fetch_the_data(
      "https://intranet-2-0-api.onrender.com/reportes/reporte_estado",
      token,
      "POST",
      {
        estado: set_accion(),
        reporte_id: reporte_id,
      }
    );
    console.log(data);

    if (data[0] == 200 && data != undefined) {
      ok_mensaje();
      dispatch(set_fetching(false));
      dispatch(set_reporte({ reporte_id: reporte_id, estado: set_accion() }));
    }
  };

  return <MenuItem onClick={set_estado}>{accion}</MenuItem>;
};
