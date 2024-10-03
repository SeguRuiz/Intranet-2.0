import React from "react";
import Header from "../components/Home/header/Header_student.jsx";
import Grupo from "../components/Home/cursos/grupo/Grupo.jsx";
import Navbar from "../components/Home/navbar/NavBar.jsx";

const Grupo_pagina = () => {
  const cursosLinks = [
    { href: "/cursos/curso/contenidos", label: "Contenidos" },
    { href: "/cursos/curso/grupos ", label: "Grupos" },
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
