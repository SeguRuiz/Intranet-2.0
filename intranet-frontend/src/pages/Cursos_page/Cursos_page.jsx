import React from "react";
import Header from "../../components/Home/header/Header_student";
import NavBar from "../../components/Home/navbar/NavBar";
import Content from "../../components/Home/cursos/main_content/content";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { set_grupos_cursos } from "../../redux/ControlUsuariosSlice";
import { useFetch } from "../../services/llamados";
import { set_grupos } from "../../redux/ControlUsuariosSlice";
import "./Cursos_page.css";
import { getCookie } from "../../utils/Cookies";

const Cursos_page = () => {
  const studentLinks = [
    { href: "/social", label: "Social" },
    { href: "/anuncios ", label: "Anuncios" },
    { href: "/cursos ", label: "Cursos" },
    { href: "/demolab", label: "Demolab" },
    { href: "/ingles ", label: "Ingles" },
  ];
  const accion = useDispatch();
  const { fetch_the_data } = useFetch();
  const token = getCookie("token");
  
  useEffect(() => {
    (async () => {
      const data = await fetch_the_data(
        "http://localhost:8000/cursos/grupos_cursos",
        token,
        "GET"
      );

      accion(set_grupos_cursos(data[1]));
    })();
  }, []);
  useEffect(() => {
    (async () => {
      const data = await fetch_the_data(
        "http://localhost:8000/cursos/get_grupos_integrantes",
        token,
        "GET"
      );

      accion(set_grupos(data[1]));
    })();
  }, []);

  return (
    <div className="cursos-page-container">
      <div className="cursos-page-navbar-area">
        <Header />
        <NavBar links={studentLinks} />
      </div>
      <div className="cursos-page-content-area">
        <Content />
      </div>
    </div>
  );
};

export default Cursos_page;
