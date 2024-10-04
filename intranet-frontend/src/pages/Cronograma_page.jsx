import React from "react";
import Header from "../components/Home/header/Header_student";
import Navbar from "../components/Home/navbar/NavBar";
import Cronograma from "../components/Home/cursos/cronograma/Cronograma";

const Cronograma_page = () => {
  const cursosLinks = [
    { href: "/cursos/curso/contenido", label: "Contenidos" },
    { href: "/cursos/curso/grupos ", label: "Grupos" },
    { href: "/cursos/curso/tareas ", label: "Tareas" },
    { href: "/cursos/curso/comunicaciones", label: "Comunicaciones" },
    { href: "/cursos/curso/cronograma", label: "Cronograma" }
  ];
  
  return (
    <div>
      <Header />
      <Navbar links={cursosLinks}/>
      <Cronograma />
    </div>
  );
};

export default Cronograma_page;
