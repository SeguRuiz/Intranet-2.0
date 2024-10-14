import React from "react";
import Header from "../../components/Home/header/Header_student";
import Navbar from "../../components/Home/navbar/NavBar";
import { useParams } from "react-router-dom";
import Cronograma from "../../components/Home/cursos/cronograma/Cronograma";
import "./cronograma.css";

const Cronograma_page = () => {
  const { id_curso } = useParams();
  const cursosLinks = [
    { href: `/cursos/${id_curso}/contenidos`, label: "Contenidos" },
    { href: `/cursos/${id_curso}/grupos`, label: "Grupos" },
    { href: `/cursos/${id_curso}/tareas`, label: "Tareas" },
    { href: `/cursos/${id_curso}/comunicaciones`, label: "Comunicaciones" },
    { href: `/cursos/${id_curso}/cronograma`, label: "Cronograma" },
  ];

  return (
    <div className="cronograma">
      <div>
        <Header />
        <Navbar links={cursosLinks} />
      </div>
      <div>
        <Cronograma />
      </div>
    </div>
  );
};

export default Cronograma_page;
