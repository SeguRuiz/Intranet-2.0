import {
  LinearProgress,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Skeleton,
} from "@mui/material";
import { useCustomModal } from "../../../../utils/customHooks";
import { useEffect, useRef, useState } from "react";
import { TextField } from "@mui/material";
import { useFetch } from "../../../../services/llamados";
import { getCookie } from "../../../../utils/Cookies";
import { toast } from "react-toastify";
import InfoIcon from "@mui/icons-material/Info";

const More_info_reports = ({ estudiante, usuario, reporte_id }) => {
  const modal_ref = useRef();
  const error_message = () =>
    toast.error("Ocurrio un error cargando el reporte");
  const { fetch_the_data } = useFetch();
  const { openModal, closeModalDlg, closeModal, isOPen } =
    useCustomModal(modal_ref);
  const token = getCookie("token");
  const [nombre_estudiante, set_nombre_estudiante] = useState("");
  const [grupo_nombre, set_grupo_nombre] = useState("");
  const [sede_nombre, set_sede_nombre] = useState("");
  const [detalles, setDetalles] = useState("");
  const [tipo_incidente, setIncidente] = useState("");
  const [dia_incidente, set_dia_incidente] = useState("");
  const [f, setF] = useState(false);
  const [errorReport, setError] = useState(false);

  useEffect(() => {
    (async () => {
      setF(true);
      if (isOPen) {
        setError(false);

        const [estudiante_info, reporte] = await Promise.all([
          fetch_the_data(
            "http://localhost:8000/api/get_estudiante",
            token,
            "POST",
            {
              estudiante: estudiante,
            }
          ),
          fetch_the_data(
            "http://localhost:8000/reportes/reportes",
            token,
            "GET",
            null,
            reporte_id + "/"
          ),
        ]);

        if (estudiante_info[0] == 200 && reporte[0] == 200) {
          set_nombre_estudiante(estudiante_info[1].nombre);
          set_grupo_nombre(estudiante_info[1].grupo);
          set_sede_nombre(estudiante_info[1].sede);
          ///////////////////////////////////
          setDetalles(reporte[1]?.detalles);
          setIncidente(reporte[1]?.tipo_incidente);
          set_dia_incidente(reporte[1]?.dia_incidente);
          setF(false);

          return;
        } else {
          setError(true);
          closeModal();
          error_message();
        }
      }
    })();
    return () => {
      setError(false);
      setF(true);
    };
  }, [isOPen]);

  return (
    <>
      <MenuItem onClick={openModal}>
        <ListItemIcon>
          <InfoIcon sx={{ color: "var(--OnsurfaceVariant)" }} fontSize="10px" />
        </ListItemIcon>
        <ListItemText primary="Más info" />
      </MenuItem>

      <dialog
        ref={modal_ref}
        onClick={closeModalDlg}
        className="report_info_modal"
      >
        <div className="report_info_modal_content">
          <div className="report-title">
            <h2>Reporte de incidente de asistencia</h2>
          </div>
          {f && <LinearProgress />}
          <div className="report-text">
            <div>
              {f ? (
                <Skeleton
                  animation="wave"
                  width={"100%"}
                  variant="text"
                  sx={{ fontSize: 25 }}
                />
              ) : (
                <>
                  <p style={{ marginTop: "6px" }}>Quien labora el reporte:</p>
                  <TextField
                    variant="standard"
                    value={usuario}
                    sx={{ width: "60%" }}
                    slotProps={{
                      inputLabel: { shrink: true },
                      input: { readOnly: true },
                    }}
                  />
                </>
              )}
            </div>

            <div>
              {f ? (
                <Skeleton
                  animation="wave"
                  width={"100%"}
                  variant="text"
                  sx={{ fontSize: 25 }}
                />
              ) : (
                <>
                  <p style={{ marginTop: "6px" }}>
                    {"Nombre del (a) estudiante:"}
                  </p>
                  <TextField
                    variant="standard"
                    value={nombre_estudiante}
                    sx={{ width: "55%" }}
                    slotProps={{
                      inputLabel: { shrink: true },
                      input: { readOnly: true },
                    }}
                  />
                </>
              )}
            </div>
            <div>
              {f ? (
                <Skeleton
                  animation="wave"
                  width={"100%"}
                  variant="text"
                  sx={{ fontSize: 25 }}
                />
              ) : (
                <>
                  <p style={{ marginTop: "6px" }}>{"Sede:"}</p>
                  <TextField
                    variant="standard"
                    value={sede_nombre}
                    sx={{ width: "85%" }}
                    slotProps={{
                      inputLabel: { shrink: true },
                      input: { readOnly: true },
                    }}
                  />
                </>
              )}
            </div>
            <div>
              {f ? (
                <Skeleton
                  animation="wave"
                  width={"100%"}
                  variant="text"
                  sx={{ fontSize: 25 }}
                />
              ) : (
                <>
                  <p style={{ marginTop: "6px" }}>{"Grupo:"}</p>
                  <TextField
                    variant="standard"
                    value={grupo_nombre}
                    sx={{ width: "83.5%" }}
                    slotProps={{
                      inputLabel: { shrink: true },
                      input: { readOnly: true },
                    }}
                  />
                </>
              )}
            </div>
            <div>
              {f ? (
                <Skeleton
                  animation="wave"
                  width={"100%"}
                  variant="text"
                  sx={{ fontSize: 25 }}
                />
              ) : (
                <>
                  <p style={{ marginTop: "6px" }}>{"Tipo incidente:"}</p>
                  <TextField
                    variant="standard"
                    value={tipo_incidente}
                    sx={{ width: "72.5%" }}
                    slotProps={{
                      inputLabel: { shrink: true },
                      input: { readOnly: true },
                    }}
                  />
                </>
              )}
            </div>
            <div>
              {f ? (
                <Skeleton
                  animation="wave"
                  width={"100%"}
                  variant="text"
                  sx={{ fontSize: 25 }}
                />
              ) : (
                <>
                  <p style={{ marginTop: "6px" }}>{"Dia incidente"}</p>
                  <TextField
                    variant="standard"
                    value={dia_incidente}
                    sx={{ width: "74.5%" }}
                    slotProps={{
                      inputLabel: { shrink: true },
                      input: { readOnly: true },
                    }}
                  />
                </>
              )}
            </div>
            <div>
              {f ? (
                <Skeleton
                  animation="wave"
                  width={"100%"}
                  variant="rounded"
                  sx={{ fontSize: 25 }}
                  height={155}
                />
              ) : (
                <>
                  <p style={{ marginTop: "6px" }}>{"Detalles:"}</p>
                  <TextField
                    value={detalles}
                    sx={{ width: "80.6%" }}
                    multiline
                    rows={5}
                    slotProps={{
                      inputLabel: { shrink: true },
                      input: { readOnly: true },
                    }}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default More_info_reports;
