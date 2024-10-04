import React from "react";
import Header from "../components/Home/header/Header_student.jsx";
import Grupo from "../components/Home/cursos/grupo/Grupo.jsx";
import Navbar from "../components/Home/navbar/NavBar.jsx";

const Grupo_pagina = () => {
  const cursosLinks = [
    { href: "/cursos/curso/contenido", label: "Contenidos" },
    { href: "/cursos/curso/grupos ", label: "Grupos" },
    { href: "/cursos/curso/tareas ", label: "Tareas" },
    { href: "/cursos/curso/comunicaciones", label: "Comunicaciones" },
    { href: "/cursos/curso/cronograma", label: "Cronograma" },
  ];

  const profesores = [
    { nombre: "Profesor 1", correo: "Profesor1@fwdcostarica.com" },
    { nombre: "Profesor 2", correo: "Profesor2@fwdcostarica.com" },
  ];

  const titulo_profesor = [{ nombre: "Profesores" }];

  const titulo_estudiantes = [{ nombre: "Estudiantes" }];

  const estudiante = [
    { nombre: "estudiante 1", correo: "estudiante1@fwdcostarica.com" },
    { nombre: "estudiante 2", correo: "estudiante2@fwdcostarica.com" },
    { nombre: "estudiante 2", correo: "estudiante2@fwdcostarica.com" },
    { nombre: "estudiante 2", correo: "estudiante2@fwdcostarica.com" },
  ];

  return (
    <div>
      <Header />
      <Navbar links={cursosLinks} />
      <Grupo integrantes={profesores} titulo={titulo_profesor} />
      <Grupo integrantes={estudiante} titulo={titulo_estudiantes} />
    </div>
  );
};
export default Grupo_pagina;
