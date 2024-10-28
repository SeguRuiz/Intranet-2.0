import React from "react";
import Contenido_tarea from "../../components/Home/cursos/Tarea/Contenido_tarea";
import Header from "../../components/Home/header/Header_student";
import Navbar from "../../components/Home/navbar/NavBar";
import { useParams } from "react-router-dom";
const Contenido_tarea_page = () => {
  const { id_curso } = useParams();
  
  console.log(ids);
  
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
        <Contenido_tarea />
      </div>
    </div>
  );
};

export default Contenido_tarea_page;
