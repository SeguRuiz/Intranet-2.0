import "./Info_cursos.css";
import { Sidemenu } from "../../components/SideMenu/Sidemenu";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setContenidos } from "../../redux/CursosContenidosSlice";
import { set_archivo_mostrandose } from "../../redux/CursosContenidosSlice";
import { useEffect } from "react";
import Header_student from "../../components/Home/header/Header_student";
import File_preview from "../../components/file_preview/File_preview";
import Admin_actions_cursos from "../../components/admin_actions_cursos/Admin_actions_cursos";
import Go_to_admin from "../../components/admin_actions_cursos/go_to_admin";
import { useFetch } from "../../services/llamados";
import { getCookie } from "../../utils/Cookies";
import { useState } from "react";
import { LinearProgress } from "@mui/material";
import Info_cursos_404 from "./Info_cursos_404";

const Info_cursos = () => {
  const { userInSession } = useSelector((x) => x.Auth);
  const [idValido, setIdValido] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const accion = useDispatch();

  const { id_curso } = useParams();
  const token = getCookie("token");
  const { fetch_the_data, fetching } = useFetch();

  useEffect(() => {
    return () => {
      accion(setContenidos([]));
      accion(set_archivo_mostrandose(null));
      setNotFound(false);
    };
  }, []);

  useEffect(() => {
    (async () => {
      const data = await fetch_the_data(
        "http://localhost:8000/cursos/cursos",
        token,
        "GET",
        null,
        id_curso
      );

      setIdValido(data[0] == 200);
      setNotFound(data[0] != 200);
    })();
  }, [id_curso]);
  return (
    <>
      <div className="Info-page">
        <div className="Info-nav-container">
          <Header_student />
        </div>
        {fetching && <LinearProgress />}

        {idValido && !fetching ? (
          <div className="Info-page-main">
            <div className="side-menu-page">
              <Sidemenu id_curso={id_curso} />
            </div>
            <div className="Info-page-file">
              <File_preview />
              {userInSession?.is_staff && (
                <Admin_actions_cursos>
                  <Go_to_admin />
                </Admin_actions_cursos>
              )}
            </div>
          </div>
        ) : (
          notFound && !fetching && <Info_cursos_404 />
        )}
      </div>
    </>
  );
};

export default Info_cursos;
