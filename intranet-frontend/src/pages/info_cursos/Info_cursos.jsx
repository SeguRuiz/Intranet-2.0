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
const Info_cursos = () => {
  const { define_fetch, fetch_the_data_without_token } = useFetch();
  const accion = useDispatch();
  const { id_curso } = useParams();
  const cursosLinks = [
    { href: `/cursos/${id_curso}/contenidos`, label: "Contenidos" },
    { href: `/cursos/${id_curso}/grupos`, label: "Grupos" },
  ];

  useEffect(() => {
    (async () => {
      accion(set_archivo_mostrandose(null));
      define_fetch(
        "http://localhost:8000/cursos_contenidos/get_contenidos_and_subcontenidos",
        id_curso,
        "GET"
      );
      const data = await fetch_the_data_without_token();
      console.log(data);
      accion(setContenidos(data[1]));
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Info_cursos;
