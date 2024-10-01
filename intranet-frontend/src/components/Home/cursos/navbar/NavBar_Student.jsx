import React from "react";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";

const NavBar_Student = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="links_navbar">
        <a
          onClick={() => {
            navigate("/social");
          }}
        >
          Social
        </a>
        <a
          onClick={() => {
            navigate("/cursos");
          }}
        >
          Cursos
        </a>
        <a
          onClick={() => {
            navigate("/anuncios");
          }}
        >
          Anuncios
        </a>
        <a
          onClick={() => {
            navigate("/demolab");
          }}
        >
          Demolab
        </a>
        <a
          onClick={() => {
            navigate("/ingles");
          }}
        >
          Inglés
        </a>
      </div>
    </div>
  );
};

export default NavBar_Student;
