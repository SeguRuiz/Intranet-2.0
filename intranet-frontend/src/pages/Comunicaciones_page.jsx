import React from "react";
import Comunicaciones from "../components/Home/cursos/comunicaciones/comunicaciones";
import Header from "../components/Home/header/Header_student";
import Navbar from "../components/Home/navbar/NavBar";
const comunicaciones_page = () => {
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
      <Comunicaciones />
    </div>
  );
};

export default comunicaciones_page;
