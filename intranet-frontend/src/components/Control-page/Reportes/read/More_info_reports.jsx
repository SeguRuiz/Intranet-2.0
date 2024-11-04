import { MenuItem } from "@mui/material";
import { useCustomModal } from "../../../../utils/customHooks";
import { useEffect, useRef, useState } from "react";
import { TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { useFetch } from "../../../../services/llamados";
import { getCookie } from "../../../../utils/Cookies";

const More_info_reports = ({
  estudiante,
  sede,
  grupo,
 
 
  comprobante,
  usuario,
  fecha_creado,
  reporte_id,
}) => {
  const modal_ref = useRef();
  const { fetch_the_data } = useFetch();
  const { openModal, closeModalDlg } = useCustomModal(modal_ref);
  const token = getCookie("token");
  const [nombre_estudiante, set_nombre_estudiante] = useState("");
  const [grupo_nombre, set_grupo_nombre] = useState("");
  const [sede_nombre, set_sede_nombre] = useState("");
  const [detalles, setDetalles] = useState('')
  const [tipo_incidente, setIncidente] = useState('')
  const [dia_incidente, set_dia_incidente] = useState('')

  
  
  
  useEffect(() => {
    (async () => {
      const data = await fetch_the_data(
        "http://localhost:8000/api/get_estudiante",
        token,
        "POST",
        {
          estudiante: estudiante,
        }
      );
      console.log(data);

      if (data[0] == 200 && data != undefined) {
        set_nombre_estudiante(data[1].nombre);
        set_grupo_nombre(data[1].grupo);
        set_sede_nombre(data[1].sede);
        console.log(data);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const data = await fetch_the_data(
        "http://localhost:8000/reportes/reportes",
        token,
        "GET",
        null,
        reporte_id + '/'
        
      );
      console.log(data);

      if (data[0] == 200 && data != undefined) {
        setDetalles(data[1]?.detalles)
        setIncidente(data[1]?.tipo_incidente)
        set_dia_incidente(data[1]?.dia_incidente)
      }
    })();
  }, []);


   
  return (
    <>
      <MenuItem onClick={openModal}>Más info</MenuItem>
      <dialog
        ref={modal_ref}
        onClick={closeModalDlg}
        className="report_info_modal"
      >
        <div className="report_info_modal_content">
          <div className="report-title">
            <h2>Reporte de incidente de asistencia</h2>
          </div>
          <div className="report-text">
            <div>
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
            </div>

            <div>
              <p style={{ marginTop: "6px" }}>{"Nombre del (a) estudiante:"}</p>
              <TextField
                variant="standard"
                value={nombre_estudiante}
                sx={{ width: "55%" }}
                slotProps={{
                  inputLabel: { shrink: true },
                  input: { readOnly: true },
                }}
              />
            </div>
            <div>
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
            </div>
            <div>
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
            </div>
            <div>
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
            </div>
            <div>
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
            </div>
            <div>
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
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default More_info_reports;
