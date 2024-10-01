import React from "react";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";

const NavBar_Student = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="links_navbar">
        <a>Social</a>
        <a>Cursos</a>
        <a>Anuncios</a>
        <a>Demolab</a>
        <a>Inglés</a>
      </div>
      <div></div>
    </div>
  );
};

export default NavBar_Student;
