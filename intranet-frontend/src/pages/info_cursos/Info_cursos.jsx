import "./Info_cursos.css";
import { Sidemenu } from "../../components/SideMenu/Sidemenu";
import { useDispatch } from "react-redux";
import { useFetch } from "../../services/llamados";
import { useParams } from "react-router-dom";
import { setContenidos } from "../../redux/CursosContenidosSlice";
import { useEffect } from "react";
import Header_student from "../../components/Home/header/Header_student";
import Navbar from "../../components/Home/navbar/NavBar";
const Info_cursos = () => {
const accion = useDispatch()
const {define_fetch, fetch_the_data_without_token} = useFetch()
const {id_curso} = useParams()
const cursosLinks = [
  { href: `/cursos/${id_curso}/contenidos`, label: "Contenidos" },
  { href: `/cursos/${id_curso}/grupos`, label: "Grupos" },
];
useEffect(() => {
  (async () => {
    define_fetch(
      "http://localhost:8000/cursos_contenidos/get_contenidos_and_subcontenidos",
      id_curso,
      "GET"
    );
    const data = await fetch_the_data_without_token();
    accion(setContenidos(JSON.parse(data[1])));
  })();
}, [id_curso]);

  return (
    <>
      <div className="Info-page">
        <div className="Info-nav-container">
         <Header_student/>
         <Navbar links={cursosLinks}/>
        </div>
        <div className="Info-page-main">
          <Sidemenu/>
          <div className="Info-page-file"></div>
        </div>
      </div>
    </>
  );
};

export default Info_cursos;
