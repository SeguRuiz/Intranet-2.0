import { useFetch } from "../../services/llamados";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "../../utils/Cookies";
import { set_grupos_cursos } from "../../redux/ControlUsuariosSlice";
import { useEffect, useRef, useState } from "react";
import Select_grupos_del_curso from "./Select_grupos_del_curso";
import { useCustomModal } from "../../utils/customHooks";
import "./Read_grupos_del_curso.css";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { Tooltip } from "@mui/material";
const Read_grupos_del_curso = () => {
  const { id_curso } = useParams();
  const { grupos_cursos } = useSelector((x) => x.ControlUsuarios);
  const { userInSession } = useSelector((x) => x.Auth);
  const dlgRef = useRef();
  const { openModal, closeModalDlg, closeModal } = useCustomModal(dlgRef);
  const { fetch_the_data } = useFetch();
  const token = getCookie("token");
  const accion = useDispatch();
  useEffect(() => {
    (async () => {
      const data = await fetch_the_data(
        "http://localhost:8000/cursos/grupos_cursos",
        token,
        "GET"
      );
      const datos_filtrados = data[1].filter((x) => x.curso_id == id_curso);
      accion(set_grupos_cursos(datos_filtrados));
    })();
  }, []);

  return (
    <>
      {userInSession?.is_staff ? (
        <Tooltip title="Seleccionar grupos del curso">
          <Button onClick={openModal}>
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="30px"
                viewBox="0 -960 960 960"
                width="30px"
                fill="var(--OnPrymary-color)"
                style={{ cursor: "pointer" }}
              >
                <path d="M38.67-160v-100q0-34.67 17.83-63.17T105.33-366q69.34-31.67 129.67-46.17 60.33-14.5 123.67-14.5 63.33 0 123.33 14.5T611.33-366q31 14.33 49.17 42.83T678.67-260v100h-640Zm706.66 0v-102.67q0-56.66-29.5-97.16t-79.16-66.84q63 7.34 118.66 22.5 55.67 15.17 94 35.5 34 19.34 53 46.17 19 26.83 19 59.83V-160h-176ZM358.67-480.67q-66 0-109.67-43.66Q205.33-568 205.33-634T249-743.67q43.67-43.66 109.67-43.66t109.66 43.66Q512-700 512-634t-43.67 109.67q-43.66 43.66-109.66 43.66ZM732-634q0 66-43.67 109.67-43.66 43.66-109.66 43.66-11 0-25.67-1.83-14.67-1.83-25.67-5.5 25-27.33 38.17-64.67Q578.67-590 578.67-634t-13.17-80q-13.17-36-38.17-66 12-3.67 25.67-5.5 13.67-1.83 25.67-1.83 66 0 109.66 43.66Q732-700 732-634Z" />
              </svg>
            </>
          </Button>
        </Tooltip>
      ) : (
        <></>
      )}
      <dialog
        ref={dlgRef}
        onClick={closeModalDlg}
        className="read-grupos-del-curso-dlg"
      >
        <div
          className={
            grupos_cursos[0] == undefined
              ? "read-grupos-del-cursos-content-vacio"
              : "read-grupos-del-cursos-content"
          }
        >
          {grupos_cursos[0] == undefined ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="100px"
                viewBox="0 -960 960 960"
                width="100px"
                fill="var(--OnsurfaceVariant)"
              >
                <path d="m150-400 82-80-82-82-80 82 80 80Zm573-10 87-140 88 140H723Zm-243-70q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T600-600q0 50-34.5 85T480-480ZM0-240v-53q0-39.46 42-63.23Q84-380 150.4-380q12.16 0 23.38.5 11.22.5 22.22 2.23-8 17.27-12 34.84-4 17.57-4 37.43v65H0Zm240 0v-65q0-65 66.5-105T480-450q108 0 174 40t66 105v65H240Zm570-140q67.5 0 108.75 23.77T960-293v53H780v-65q0-19.86-3.5-37.43T765-377.27q11-1.73 22.17-2.23 11.17-.5 22.83-.5Z" />
              </svg>
              <strong
                style={{ fontSize: "20px", color: "var(--OnsurfaceVariant)" }}
              >
                No hay grupos asignados
              </strong>
            </>
          ) : (
            <>
              {grupos_cursos.map((grupos_cursos) => (
                <Select_grupos_del_curso
                  key={grupos_cursos?.id}
                  grupo_id={grupos_cursos.grupo_id}
                />
              ))}
            </>
          )}
        </div>
      </dialog>
    </>
  );
};

export default Read_grupos_del_curso;
