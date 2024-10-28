import React from "react";
import Tarea from "../../components/Home/cursos/Tarea/Tarea";
import Header from "../../components/Home/header/Header_student";
import Navbar from "../../components/Home/navbar/NavBar";
import { useParams } from "react-router-dom";
import "./tarea.css";
// import InteractiveMap from "../../components/Home/cursos/cronograma/InteractiveMap";

const Tarea_page = () => {
  const { id_curso } = useParams();
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
      <div>
        <Tarea />
      </div>
      {/* <InteractiveMap /> */}
    </div>
  );
};

export default Tarea_page;
