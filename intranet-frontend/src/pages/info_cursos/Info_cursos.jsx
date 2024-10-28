import "./Info_cursos.css";
import { Sidemenu } from "../../components/SideMenu/Sidemenu";
import { useDispatch } from "react-redux";
import { useFetch } from "../../services/llamados";
import { useParams } from "react-router-dom";
import { setContenidos } from "../../redux/CursosContenidosSlice";
import { set_archivo_mostrandose } from "../../redux/CursosContenidosSlice";
import { useEffect } from "react";
import Header_student from "../../components/Home/header/Header_student";
import File_preview from "../../components/file_preview/File_preview";
import Navbar from "../../components/Home/navbar/NavBar";
import Admin_actions_cursos from "../../components/admin_actions_cursos/Admin_actions_cursos";
import Go_to_admin from "../../components/admin_actions_cursos/go_to_admin";
import MenuModal from "../../components/SideMenu/MenuCrud/Add/MenuModal";
const Info_cursos = () => {
  const { fetch_the_data } = useFetch();
  const accion = useDispatch();
  const { id_curso } = useParams();
  const ids = useParams()
  console.log(ids);
  
  const cursosLinks = [
    { href: `/cursos/${id_curso}/contenidos`, label: "Contenidos" },
    { href: `/cursos/${id_curso}/grupos`, label: "Grupos" },
    { href: `/cursos/${id_curso}/tareas `, label: "Tareas" },
    { href: `/cursos/${id_curso}/comunicaciones`, label: "Comunicaciones" },
    
  ];

  useEffect(() => {
    (async () => {
      accion(set_archivo_mostrandose(null));
      const data = await fetch_the_data(
        "http://localhost:8000/cursos_contenidos/get_contenidos_and_subcontenidos",
        null,
        "GET",
        null,
        id_curso
      );
      console.log(data);
      accion(setContenidos(data[1].reverse()));
      accion(set_archivo_mostrandose(null));
    })();
  }, [id_curso]);

  return (
    <>
      <div className="Info-page">
        <div className="Info-nav-container">
          <Header_student />
          <Navbar links={cursosLinks} />
        </div>
        <div className="Info-page-main">
          <div className="side-menu-page">
            <Sidemenu />
          </div>
          <div className="Info-page-file">
            <File_preview />
            <Admin_actions_cursos>
              <Go_to_admin/>
              <MenuModal/>
            </Admin_actions_cursos>
          </div>
        </div>
      </div>
    </>
  );
};

export default Info_cursos;
