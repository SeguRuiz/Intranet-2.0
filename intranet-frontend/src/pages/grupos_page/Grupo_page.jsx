import { useEffect, useLayoutEffect, useState } from "react";
import Header from "../../components/Home/header/Header_student.jsx";
import Grupo from "../../components/Home/cursos/grupo/Grupo.jsx";
import Navbar from "../../components/Home/navbar/NavBar.jsx";
import { useParams } from "react-router-dom";
import { useFetch } from "../../services/llamados.js";
import "./Grupos_page.css";
import { getCookie } from "../../utils/Cookies.js";
import { useDispatch, useSelector } from "react-redux";
import Admin_actions_cursos from "../../components/admin_actions_cursos/Admin_actions_cursos.jsx";
import { actualizar } from "../../redux/AuthSlice.js";
import { set_usuarios_del_grupo } from "../../redux/CursosContenidosSlice.js";
import Empty_grupos from "../../assets/Empty/Empty-grupos.svg";
import { DecodeToken } from "../../services/llamados.js";
import { useRef } from "react";
import { set_grupos } from "../../redux/ControlUsuariosSlice.js";
import Read_grupos_del_curso from "../../components/Seleccionar_grupos_del_curso/Read_grupos_del_curso.jsx";
import Go_to_admin from "../../components/admin_actions_cursos/go_to_admin.jsx";
import Grupo_card from "../../components/Info_grupo_seleccionado/Grupo_card.jsx";

const Grupo_pagina = () => {
  const { id_curso } = useParams();
  const { estudiantes, profesores, grupo_mostrandose } = useSelector(
    (x) => x.CursosContenidos
  );
  const token = getCookie("token");
  console.log(grupo_mostrandose);

  const { Es_admin } = useSelector((x) => x.IsAdmin);
  console.log(Es_admin);

  const { fetch_the_data } = useFetch();
  const cursosLinks = [
    { href: `/cursos/${id_curso}/contenidos`, label: "Contenidos" },
    { href: `/cursos/${id_curso}/grupos`, label: "Grupos" },
    { href: `/cursos/${id_curso}/tareas `, label: "Tareas" },
    { href: `/cursos/${id_curso}/comunicaciones`, label: "Comunicaciones" },
  ];

  const accion = useDispatch();

  useLayoutEffect(() => {
    (async () => {
      const data = await fetch_the_data(
        "https://intranet-2-0-api.onrender.com/cursos/get_grupos_integrantes",
        token,
        "GET"
      );

      accion(set_grupos(data[1]));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const data = await fetch_the_data(
        "https://intranet-2-0-api.onrender.com/cursos/get_usuarios_grupo",
        token,
        "POST",
        {
          usuario_id: DecodeToken(token).user_id,
          grupo_id:
            grupo_mostrandose == null ? "sin definir" : grupo_mostrandose,
        }
      );
      console.log(data);

      if ((await data[0]) == 200) {
        accion(
          set_usuarios_del_grupo({
            rol: "estudiantes",
            data: data[1]?.estudiantes,
          })
        );
        accion(
          set_usuarios_del_grupo({
            rol: "profesores",
            data: data[1]?.profesores,
          })
        );
      }
    })();
  }, [grupo_mostrandose]);

  return (
    <>
      <div className="grupos-page-container">
        <div className="grupos-page-navbar">
          <Header />
          <Navbar links={cursosLinks} />
        </div>
        <div
          className={
            profesores[0] == undefined || estudiantes[0] == undefined
              ? "grupos-page-content-center"
              : "grupos-page-content"
          }
        >
          {profesores[0] == undefined || estudiantes[0] == undefined ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="200px"
                viewBox="0 -960 960 960"
                width="200px"
                fill="var(--OnsurfaceVariant)"
              >
                <path d="M474-486q26-32 38.5-66t12.5-79q0-45-12.5-79T474-776q76-17 133.5 23T665-631q0 82-57.5 122T474-486Zm216 326v-94q0-51-26-95t-90-74q173 22 236.5 64T874-254v94H690Zm270-389H700v-60h260v60Zm-645 68q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42ZM0-160v-94q0-35 18.5-63.5T68-360q72-32 128.5-46T315-420q62 0 118 14t128 46q31 14 50 42.5t19 63.5v94H0Z" />
              </svg>
              <strong
                style={{ fontSize: "40px", color: "var(--OnsurfaceVariant)" }}
              >
                Hacen falta integrantes
              </strong>
            </>
          ) : (
            <>
              <Grupo integrantes={profesores} titulo={"Profesores"} />
              <Grupo integrantes={estudiantes} titulo={"Estudiantes"} />
            </>
          )}
        </div>
      </div>
      {Es_admin && (
        <Admin_actions_cursos>
          <Go_to_admin />
          <Read_grupos_del_curso />
        </Admin_actions_cursos>
      )}
      <Grupo_card />
    </>
  );
};
export default Grupo_pagina;
