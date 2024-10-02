import React from "react";
import Header_student from "../components/Home/header/Header_student";
import NavBar from "../components/Home/navbar/NavBar";
import Content from "../components/Home/cursos/main_content/content";

const Cursos_page = () => {
  const cursosLinks = [
    { href: "/cursos/contenidos", label: "Contenidos" },
    { href: "/cursos/grupos ", label: "Grupos" },
    { href: "/cursos/tareas ", label: "Tareas" },
    { href: "/cursos/comunicaciones", label: "Comunicaciones" },
  ];

  return (
    <div>
      <Header_student />
      <NavBar links={cursosLinks} />
      <Content />
    </div>
  );
};

export default Cursos_page;
