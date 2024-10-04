import React from "react";
import Tarea from "../components/Home/cursos/Tarea/Tarea";
import Header from "../components/Home/header/Header_student";
import Navbar from "../components/Home/navbar/NavBar";

const Tarea_page = () => {
  const cursosLinks = [
    { href: "/cursos/curso/contenido", label: "Contenidos" },
    { href: "/cursos/curso/grupos ", label: "Grupos" },
    { href: "/cursos/curso/tareas ", label: "Tareas" },
    { href: "/cursos/curso/comunicaciones", label: "Comunicaciones" },
    { href: "/cursos/curso/cronograma", label: "Cronograma" },
  ];

  return (
    <div>
      <Header />
      <Navbar links={cursosLinks} />
      <Tarea />
    </div>
  );
};

export default Tarea_page;
