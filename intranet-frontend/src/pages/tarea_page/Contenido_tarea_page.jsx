import React, { useEffect, useState } from "react";
import Contenido_tarea from "../../components/Home/cursos/Tarea/Contenido_tarea";
import Header from "../../components/Home/header/Header_student";
import { useSelector } from "react-redux";
import Navbar from "../../components/Home/navbar/NavBar";
import { useParams } from "react-router-dom";
import "./tarea.css";
import { Chip } from "@mui/material";
import { Divider, Avatar } from "@mui/material";
import { useFetch } from "../../services/llamados";
import { getCookie } from "../../utils/Cookies";
import { get_fecha_hora, stringAvatar } from "../../utils/Utils";
import { Tooltip } from "@mui/material";
import { TextareaAutosize } from "@mui/material";
import Subir_tareas from "../../components/Home/cursos/Tarea/Subir_tareas_prof";

const Contenido_tarea_page = () => {
  const [profesor, setProfesor] = useState("no definido");
  const [tarea, setTarea] = useState({});
  const { id_curso, id_tarea } = useParams();
  const token = getCookie("token");
  const { fetch_the_data } = useFetch();
  useEffect(() => {
    const data = async () => {
      const datos = await fetch_the_data(
        "https://intranet-2-0-api.onrender.com/tareas/info_tarea",
        token,
        "GET",
        null,
        id_tarea
      );
      if (datos != undefined) {
        setTarea(datos[1]);
        console.log(datos);
      }
    };
    data();
  }, []);

  useEffect(() => {
    (async () => {
      const data = await fetch_the_data(
        "https://intranet-2-0-api.onrender.com/api/get_user_info",
        token,
        "GET",
        null,
        tarea?.profesor_id
      );
      if (data != undefined) {
        setProfesor(`${data[1].nombre} ${data[1].apellidos}`);
      }
    })();
  }, [tarea]);

  console.log(tarea);

  const cursosLinks = [
    { href: `/cursos/${id_curso}/contenidos`, label: "Contenidos" },
    { href: `/cursos/${id_curso}/grupos`, label: "Grupos" },
    { href: `/cursos/${id_curso}/tareas`, label: "Tareas" },
    { href: `/cursos/${id_curso}/comunicaciones`, label: "Comunicaciones" },
  ];
  return (
    <div className="tarea-page-container">
      <div>
        <Header />
        <Navbar links={cursosLinks} />
      </div>
      <div className="tarea-content-page">
        <div></div>
        <div className="central-div-tarea">
          <div className="profesor-info">
            <p>{tarea?.titulo}</p>
            <Tooltip title={profesor} placement="left">
              <Avatar {...stringAvatar(profesor)} />
            </Tooltip>
          </div>
          <Divider variant="middle">
            <Chip
              label="Fecha entrega"
              size="small"
              sx={{ color: "var(--OnsurfaceVariant)" }}
            ></Chip>
          </Divider>
          <div className="fecha-entrega-info">
            <div className="fecha-info-tarea">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="23px"
                viewBox="0 -960 960 960"
                width="23px"
                fill="var(--OnsurfaceVariant)"
              >
                <path d="M306-394q-17 0-28.5-11.5T266-434q0-17 11.5-28.5T306-474q17 0 28.5 11.5T346-434q0 17-11.5 28.5T306-394Zm177 0q-17 0-28.5-11.5T443-434q0-17 11.5-28.5T483-474q17 0 28.5 11.5T523-434q0 17-11.5 28.5T483-394Zm170 0q-17 0-28.5-11.5T613-434q0-17 11.5-28.5T653-474q17 0 28.5 11.5T693-434q0 17-11.5 28.5T653-394ZM180-80q-24 0-42-18t-18-42v-620q0-24 18-42t42-18h65v-60h65v60h340v-60h65v60h65q24 0 42 18t18 42v620q0 24-18 42t-42 18H180Zm0-60h600v-430H180v430Zm0-490h600v-130H180v130Zm0 0v-130 130Z" />
              </svg>
              <p>{get_fecha_hora(tarea?.fecha_revision).dia}</p>
            </div>
            <div className="hora-info-tarea">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="23px"
                viewBox="0 -960 960 960"
                width="23px"
                fill="var(--OnsurfaceVariant)"
              >
                <path d="m627-287 45-45-159-160v-201h-60v225l174 181ZM480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-82 31.5-155t86-127.5Q252-817 325-848.5T480-880q82 0 155 31.5t127.5 86Q817-708 848.5-635T880-480q0 82-31.5 155t-86 127.5Q708-143 635-111.5T480-80Zm0-400Zm0 340q140 0 240-100t100-240q0-140-100-240T480-820q-140 0-240 100T140-480q0 140 100 240t240 100Z" />
              </svg>
              <p>{get_fecha_hora(tarea?.fecha_entrega).hora}</p>
            </div>
          </div>
          <Divider variant="middle">
            <Chip
              size="small"
              label="Descripcion"
              sx={{ color: "var(--OnsurfaceVariant)" }}
            ></Chip>
          </Divider>
          <div className="explicacion-info">
            <TextareaAutosize
              className="text-area-tarea"
              readOnly
              defaultValue={tarea?.descripcion}
            />
            <Subir_tareas />
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Contenido_tarea_page;
