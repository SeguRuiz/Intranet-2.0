import Retractile_menu from "../../Retractile_menu/Retractile_menu";
import {
  set_usuario_a_reportar,
  set_escojiendo_usuario,
} from "../../../../redux/ControlUsuariosSlice";
import { useDispatch } from "react-redux";
import "./Add_report.css";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import {TextField} from "@mui/material";
const Add_Reportes = () => {
  const accion = useDispatch();
  const { usuario_a_reportar, escojiendo_usuario } = useSelector(
    (x) => x.ControlUsuarios
  );
 

  return (
    <Retractile_menu titulo="Agregar reportes" altura={20}>
      <div className="add_report_container">
        {escojiendo_usuario ? (
          <form className="add-report-form">
           <TextField/>
           <TextField/>
           <TextField/>
          </form>
        ) : (
          <Button
            onClick={() => {
              accion(set_escojiendo_usuario(!escojiendo_usuario));
            }}
            sx={{ marginBottom: 4.5 }}
            startIcon={
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="27px"
                  viewBox="0 -960 960 960"
                  width="27px"
                  fill="var(--OnPrymary-color)"
                >
                  <path d="M200-120v-680h343l19 86h238v370H544l-18.93-85H260v309h-60Zm300-452Zm95 168h145v-250H511l-19-86H260v251h316l19 85Z" />
                </svg>
              </>
            }
            variant="contained"
          >
            Agregar reporte
          </Button>
        )}
      </div>
    </Retractile_menu>
  );
};

export default Add_Reportes;
