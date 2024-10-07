import React from "react";
import Comunicaciones from "../components/Home/cursos/comunicaciones/comunicaciones";
import Header from "../components/Home/header/Header_student";
import Navbar from "../components/Home/navbar/NavBar";
import { useParams } from "react-router-dom";

const comunicaciones_page = () => {
  const { id_curso } = useParams();
 
  
  const cursosLinks = [
    { href: `/cursos/${id_curso}/contenidos`, label: "Contenidos" },
    { href: `/cursos/${id_curso}/grupos`, label: "Grupos" },
    { href: `/cursos/${id_curso}/tareas`, label: "Tareas" },
    { href: `/cursos/${id_curso}/comunicaciones`, label: "Comunicaciones" },
    { href: `/cursos/${id_curso}/cronograma`, label: "Cronograma" },
  ];

  return (
    <div>
      <Header />
      <Navbar links={cursosLinks} />
      <Comunicaciones />
    </div>
  );
};

export default comunicaciones_page;
