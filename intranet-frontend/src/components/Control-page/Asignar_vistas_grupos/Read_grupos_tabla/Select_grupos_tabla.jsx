import "./Read_grupos_tabla.css";
import { Switch } from "@mui/material";
import { FormGroup, FormControlLabel } from "@mui/material";
import { useFetch } from "../../../../services/llamados";
import { useEffect, useState } from "react";
import { getCookie } from "../../../../utils/Cookies";
import { useSelector } from "react-redux";
import {
  agregar_grupos_cursos,
  eliminar_grupos_cursos,
} from "../../../../redux/ControlUsuariosSlice";
import { useDispatch } from "react-redux";
import { Tooltip } from "@mui/material";
const Select_grupos_tabla = ({ nombre_grupo, id, sede_id }) => {
  const [checked, setChecked] = useState(false);
  const [time_out, setTime_out] = useState(false);
  const { fetch_the_data, fetching } = useFetch();
  const accion = useDispatch();
  const { curso_seleccionado, grupos_cursos, sedes } = useSelector(
    (e) => e.ControlUsuarios
  );
  const sede_nombre = sedes.find((x) => x.id == sede_id).nombre;

  const token = getCookie("token");

  useEffect(() => {
    const seleccionado =
      grupos_cursos.find(
        (e) => e.grupo_id == id && e.curso_id == curso_seleccionado
      ) ?? false;
    seleccionado != false ? setChecked(true) : setChecked(false);
  }, [curso_seleccionado]);

  const asignar_grupo = async () => {
    const data = await fetch_the_data(
      "http://localhost:8000/cursos/grupos_cursos",
      token,
      "POST",
      {
        grupo_id: id,
        curso_id: curso_seleccionado,
      }
    );
    accion(agregar_grupos_cursos(data[1]));
  };

  const eliminar_grupo = async () => {
    const el_grupo = grupos_cursos.find(
      (e) => e.curso_id == curso_seleccionado && e.grupo_id == id
    )?.id;
    console.log(el_grupo);

    const data = await fetch_the_data(
      "http://localhost:8000/cursos/grupos_cursos_edit",
      token,
      "DELETE",
      null,
      el_grupo
    );
    console.log(data);

    accion(eliminar_grupos_cursos({ id: el_grupo }));
  };

  const switch_event = (event) => {
    setChecked(event.target.checked);

    setTime_out(true);
    setTimeout(() => {
      setTime_out(false);
    }, 700);
    if (!checked) {
      console.log("subir la vara");
      asignar_grupo();
    } else {
      eliminar_grupo();
    }
  };

  return (
    <div className="select-grupo-tabla-cont">
      <div>
        <div className={checked ? "grupo-info-table-selected" : "grupo-info-table"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill={checked ? "var(--OnSecondary-color)" : "var(--OnsurfaceVariant)"}
          >
            <path d="M0-240v-63q0-43 44-70t116-27q13 0 25 .5t23 2.5q-14 21-21 44t-7 48v65H0Zm240 0v-65q0-32 17.5-58.5T307-410q32-20 76.5-30t96.5-10q53 0 97.5 10t76.5 30q32 20 49 46.5t17 58.5v65H240Zm540 0v-65q0-26-6.5-49T754-397q11-2 22.5-2.5t23.5-.5q72 0 116 26.5t44 70.5v63H780Zm-455-80h311q-10-20-55.5-35T480-370q-55 0-100.5 15T325-320ZM160-440q-33 0-56.5-23.5T80-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T160-440Zm640 0q-33 0-56.5-23.5T720-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T800-440Zm-320-40q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T600-600q0 50-34.5 85T480-480Zm0-80q17 0 28.5-11.5T520-600q0-17-11.5-28.5T480-640q-17 0-28.5 11.5T440-600q0 17 11.5 28.5T480-560Zm1 240Zm-1-280Z" />
          </svg>
          <strong style={{
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
              maxWidth: "65px",
            }}>{nombre_grupo}</strong>
        </div>
      </div>
      <div>
        <div className={checked ? "grupo-info-table-selected" : "grupo-info-table"}>
          <Tooltip title={sede_nombre} placement="top">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill={checked ? "var(--OnSecondary-color)" : "var(--OnsurfaceVariant)"}
            >
              <path d="M120-120v-560h160v-160h400v320h160v400H520v-160h-80v160H120Zm80-80h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 320h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 480h80v-80h-80v80Zm0-160h80v-80h-80v80Z" />
            </svg>
          </Tooltip>
          <strong
            style={{
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
              maxWidth: "60px",
            }}
          >
           
            {sede_nombre}
          </strong>
        </div>
      </div>
      <div className="switch-container">
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={checked}
                onChange={switch_event}
                disabled={time_out}
              />
            }
            label={
              <>
                {checked ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="30px"
                    viewBox="0 -960 960 960"
                    width="30px"
                    fill="var(--PrymaryContainer-color)"
                    style={{ marginTop: "6px" }}
                  >
                    <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-134 0-244.5-72T61-462q-5-9-7.5-18.5T51-500q0-10 2.5-19.5T61-538q64-118 174.5-190T480-800q134 0 244.5 72T899-538q5 9 7.5 18.5T909-500q0 10-2.5 19.5T899-462q-64 118-174.5 190T480-200Z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="30px"
                    viewBox="0 -960 960 960"
                    width="30px"
                    fill="#939498"
                    style={{ marginTop: "6px" }}
                  >
                    <path d="M764-84 624-222q-35 11-71 16.5t-73 5.5q-134 0-245-72T61-462q-5-9-7.5-18.5T51-500q0-10 2.5-19.5T61-538q22-39 47-76t58-66l-83-84q-11-11-11-27.5T84-820q11-11 28-11t28 11l680 680q11 11 11.5 27.5T820-84q-11 11-28 11t-28-11ZM480-320q11 0 21-1t20-4L305-541q-3 10-4 20t-1 21q0 75 52.5 127.5T480-320Zm0-480q134 0 245.5 72.5T900-537q5 8 7.5 17.5T910-500q0 10-2 19.5t-7 17.5q-19 37-42.5 70T806-331q-14 14-33 13t-33-15l-80-80q-7-7-9-16.5t1-19.5q4-13 6-25t2-26q0-75-52.5-127.5T480-680q-14 0-26 2t-25 6q-10 3-20 1t-17-9l-33-33q-19-19-12.5-44t31.5-32q25-5 50.5-8t51.5-3Zm79 226q11 13 18.5 28.5T587-513q1 8-6 11t-13-3l-82-82q-6-6-2.5-13t11.5-7q19 2 35 10.5t29 22.5Z" />
                  </svg>
                )}
              </>
            }
          />
        </FormGroup>
      </div>
    </div>
  );
};

export default Select_grupos_tabla;
