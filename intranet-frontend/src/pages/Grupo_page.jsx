import React from "react";
import Header from "../components/Home/header/Header_student.jsx";
import Grupo from "../components/Home/cursos/grupo/Grupo.jsx";
import Navbar from "../components/Home/navbar/NavBar.jsx";
import { useParams } from "react-router-dom";

const Grupo_pagina = () => {
   const {id_curso} = useParams()
   console.log(id_curso);
   

  const cursosLinks = [
    { href: `/cursos/${id_curso}/contenidos`, label: "Contenidos" },
    { href: `/cursos/${id_curso}/grupos`, label: "Grupos" },
    { href: "/cursos/curso/tareas ", label: "Tareas" },
    { href: "/cursos/curso/comunicaciones", label: "Comunicaciones" },
    { href: "/cursos/curso/cronograma", label: "Cronograma" },
  ];
  return (
    <div>
      <Header />
      <Navbar links={cursosLinks} />
      <Grupo />
    </div>
  );
};
export default Grupo_pagina;
