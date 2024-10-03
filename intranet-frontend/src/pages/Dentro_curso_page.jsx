import React from "react";
import Curso from "../components/Home/cursos/curso";
import Header from "../components/Home/header/Header_student";
import Navbar from "../components/Home/navbar/NavBar";

const dentro_curso_page = () => {
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
      <Curso />
    </div>
  );
};

export default dentro_curso_page;
