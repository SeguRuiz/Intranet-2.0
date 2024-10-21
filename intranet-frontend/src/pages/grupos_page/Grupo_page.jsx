import React from "react";
import Header from "../../components/Home/header/Header_student.jsx";
import Grupo from "../../components/Home/cursos/grupo/Grupo.jsx";
import Navbar from "../../components/Home/navbar/NavBar.jsx";
import { useParams } from "react-router-dom";
import "./Grupos_page.css";

const Grupo_pagina = () => {
  const { id_curso } = useParams();
  console.log(id_curso);

  const cursosLinks = [
    { href: `/cursos/${id_curso}/contenidos`, label: "Contenidos" },
    { href: `/cursos/${id_curso}/grupos`, label: "Grupos" },
    { href: `/cursos/${id_curso}/tareas `, label: "Tareas" },
    { href: `/cursos/${id_curso}/comunicaciones`, label: "Comunicaciones" },
    { href: `/cursos/${id_curso}/cronograma`, label: "Cronograma" },
  ];

  const profesores = [
    { nombre: "Profesor 1", correo: "Profesor1@fwdcostarica.com" },
    { nombre: "Profesor 2", correo: "Profesor2@fwdcostarica.com" },
  ];

  const titulo_profesor = "Profesores" 

  const titulo_estudiantes = "Estudiantes" 

  const estudiante = [
    { nombre: "estudiante 1", correo: "estudiante1@fwdcostarica.com" },
    { nombre: "estudiante 2", correo: "estudiante2@fwdcostarica.com" },
    { nombre: "estudiante 2", correo: "estudiante2@fwdcostarica.com" },
    { nombre: "estudiante 2", correo: "estudiante2@fwdcostarica.com" },
  ];

  return (
    <div className="grupos-page-container">
      <div className="grupos-page-navbar">
        <Header />
        <Navbar links={cursosLinks} />
      </div>
      <div className="grupos-page-content">
        <Grupo integrantes={profesores} titulo={titulo_profesor} />
        <Grupo integrantes={estudiante} titulo={titulo_estudiantes} />
      </div>
    </div>
  );
};
export default Grupo_pagina;
