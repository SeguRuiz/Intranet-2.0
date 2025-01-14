import { Button, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFetch } from "../../../services/llamados";
import { getCookie } from "../../../utils/Cookies";
import { useCustomNotis } from "../../../utils/customHooks";
import { setInformeAsubir } from "../../../redux/Asistencias";
import { useDispatch } from "react-redux";
const SubirReporteAsistencia = ({ profesor_id = null }) => {
  const { fetch_the_data, fetching } = useFetch();
  const token = getCookie("token");
  const accion = useDispatch();
  const { informeAsubir, estudiantesDelDia } = useSelector(
    (x) => x.Asistencias
  );
  const [habilitado, setHabilitado] = useState(true);
  const { error_mensaje, ok_mensaje } = useCustomNotis(
    "Ocurrio un error subiendo las asistencias",
    "Las asistencias se subieron correctamente"
  );

  useEffect(() => {
    if (informeAsubir.length == estudiantesDelDia.length) {
      setHabilitado(false);
    } else {
      setHabilitado(true);
    }
  }, [informeAsubir, estudiantesDelDia]);

  const subirReporteDeAsistencia = async () => {
    const data = await fetch_the_data(
      "http://localhost:8000/asistencias/subir_reporte_de_asistencias",
      token,
      "POST",
      {
        reporte_de_asistencia_info: { profesor_id: profesor_id },
        asistencias_info: informeAsubir,
      }
    );

    if (data[0] == 200) {
      ok_mensaje();
      accion(setInformeAsubir([]));
      return;
    }
    error_mensaje();
  };

  return (
    <Button
      variant="outlined"
      disabled={habilitado || fetching}
      sx={{ backgroundColor: "var(--Surface-color)" }}
      onClick={subirReporteDeAsistencia}
    >
      {fetching ? (
        <CircularProgress size={20} sx={{ opacity: 0.5 }} />
      ) : (
        "Subir informes de asistencias"
      )}
    </Button>
  );
};

export default SubirReporteAsistencia;
