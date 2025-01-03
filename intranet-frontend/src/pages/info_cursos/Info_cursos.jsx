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

const Info_cursos = () => {
  const { userInSession } = useSelector((x) => x.Auth);
  const accion = useDispatch();
  const { id_curso } = useParams();
  useEffect(() => {
    return () => {
      accion(setContenidos([]));
      accion(set_archivo_mostrandose(null));
    };
  }, []);

  return (
    <>
      <div className="Info-page">
        <div className="Info-nav-container">
          <Header_student />
        </div>
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
      </div>
    </>
  );
};

export default Info_cursos;
