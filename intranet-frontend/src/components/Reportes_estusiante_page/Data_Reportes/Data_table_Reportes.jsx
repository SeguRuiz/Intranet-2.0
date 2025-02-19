import { useEffect, useState } from "react";
import { Paper, Box, Stack } from "@mui/material";
import ReporteCard from "./Reportes_Card";
import { useFetch } from "../../../services/llamados";
import { useParams } from "react-router-dom";
import { getCookie } from "../../../utils/Cookies";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { set_reportes } from "../../../redux/ControlUsuariosSlice";

const reportes_mock = [
  {
    id: "550e8400-e29b-41d4-a716-446655440000",
    estudiante_id: "12345",
    sede_id: "1",
    usuario_id: "98765",
    dia_incidente: "2025-02-01",
    tipo_incidente: "tardia",
    presento_comprobante: true,
    fecha_creado: "2025-02-01T10:30:00Z",
    detalles:
      "El estudiante se retiró antes de la última hora de clases sin autorización. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    estado: "aprobado",
    archivo_id: "abc123",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    estudiante_id: "67890",
    sede_id: "2",
    usuario_id: "54321",
    dia_incidente: "2025-02-02",
    tipo_incidente: "ausencia",
    presento_comprobante: false,
    fecha_creado: "2025-02-02T12:15:00Z",
    detalles:
      "El estudiante se retiró antes de la última hora de clases sin autorización. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    estado: "denegado",
    archivo_id: null,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    estudiante_id: "11223",
    sede_id: "3",
    usuario_id: "33445",
    dia_incidente: "2025-02-03",
    tipo_incidente: "permiso especial",
    presento_comprobante: true,
    fecha_creado: "2025-02-03T14:45:00Z",
    detalles:
      "El estudiante se retiró antes de la última hora de clases sin autorización. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    estado: "en espera",
    archivo_id: "def456",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    estudiante_id: "99887",
    sede_id: "4",
    usuario_id: "77665",
    dia_incidente: "2025-02-04",
    tipo_incidente: "retiro",
    presento_comprobante: false,
    fecha_creado: "2025-02-04T09:20:00Z",
    detalles:
      "El estudiante se retiró antes de la última hora de clases sin autorización. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    estado: "en espera",
    archivo_id: null,
  },
];

const Data_table_Reportes = ({id_usuario}) => {
  
  const accion = useDispatch();
  const { reportes } = useSelector((x) => x.ControlUsuarios);
  const { fetch_the_data } = useFetch();
  const token = getCookie("token");

  useEffect(()=>{
    return () => {
      accion(set_reportes([]))
    }
  },[])

  useEffect(() => {
    (async () => {
      const reportes = await fetch_the_data(
        "http://localhost:8000/reportes/reportes_estudiante",
        token,
        "GET",
        null,
        id_usuario
      );

      reportes == undefined &&
        toast.error("Ocurrio un error trayendo los reportes");

      if (reportes[0] == 200) {
        accion(set_reportes(reportes[1]));
        return;
      }

      switch (reportes[0]) {
        case 404:
          toast.error("No se encontro el estduiante ques estabas buscando.");
          break;

        case 500:
          toast.error("Ocurrio un error trayendo los reportes.");
          break;

        default:
          toast.error("Ocurrio un erorr trayendo los reportes.");
          break;
      }
    })();
  }, []);
  return (
    <Stack
      spacing={2.5}
      sx={{
        width: "70%",
      }}
    >
      {reportes.map((x) => (
        <ReporteCard key={x.id} reporte={x} />
      ))}
    </Stack>
  );
};

export default Data_table_Reportes;
