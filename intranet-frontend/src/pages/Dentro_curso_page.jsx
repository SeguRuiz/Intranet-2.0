import React from "react";
import Curso from "../components/Home/cursos/curso";
import Header from "../components/Home/header/Header_student";
import Navbar from "../components/Home/navbar/NavBar";

export const Dentro_curso_page = () => {
  const cursosLinks = [
    { href: `/cursos/curso/contenidos`, label: "Contenidos" },
    { href: "/cursos/curso/grupos ", label: "Grupos" },
    { href: "/cursos/curso/tareas ", label: "Tareas" },
    { href: "/cursos/curso/comunicaciones", label: "Comunicaciones" },
    { href: "/cursos/curso/cronograma", label: "Crono" },
  ];
  return (
    <>
      <Header />
      <Navbar links={cursosLinks} />
      <Curso />
       
    </>
  );
};


