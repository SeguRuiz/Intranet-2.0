import "./Info_cursos.css";
import { Sidemenu } from "../../components/SideMenu/Sidemenu";
import { useDispatch, useSelector } from "react-redux";
import { useFetch } from "../../services/llamados";
import { useParams } from "react-router-dom";
import { setContenidos } from "../../redux/CursosContenidosSlice";
import { set_archivo_mostrandose } from "../../redux/CursosContenidosSlice";
import { use, useEffect } from "react";
import Header_student from "../../components/Home/header/Header_student";
import File_preview from "../../components/file_preview/File_preview";
import Navbar from "../../components/Home/navbar/NavBar";
import Admin_actions_cursos from "../../components/admin_actions_cursos/Admin_actions_cursos";
import Go_to_admin from "../../components/admin_actions_cursos/go_to_admin";
import MenuModal from "../../components/SideMenu/MenuCrud/Add/MenuModal";
import { getCookie } from "../../utils/Cookies";

const Info_cursos = () => {
  const { fetch_the_data } = useFetch();
  const { userInSession } = useSelector((x) => x.Auth);
  const accion = useDispatch();
  const { id_curso } = useParams();
  const token = getCookie("token");

  useEffect(() => {
    return () => {
      accion(setContenidos([]));
      accion(set_archivo_mostrandose(null));
    };
  }, []);

  useEffect(() => {
    (async () => {
      accion(set_archivo_mostrandose(null));
      const data = await fetch_the_data(
        "http://localhost:8000/cursos_contenidos/get_contenidos_and_subcontenidos",
        token,
        "GET",
        null,
        id_curso
      );

      accion(setContenidos(data[1].reverse()));
    

      return () => {
        console.log("unmounting");
      };
    })();
  }, [id_curso]);

  return (
    <>
      <div className="Info-page">
        <div className="Info-nav-container">
          <Header_student />
        </div>
        <div className="Info-page-main">
          <div className="side-menu-page">
            <Sidemenu />
          </div>
          <div className="Info-page-file">
            <File_preview />
            {userInSession?.is_staff && (
              <Admin_actions_cursos>
                <Go_to_admin />
                <MenuModal />
              </Admin_actions_cursos>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Info_cursos;
