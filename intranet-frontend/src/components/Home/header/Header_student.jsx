import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import flecha5 from "../../../assets/flechas/flechas5.png";
import "./header.css";

const Header_student = ({ imgSrc, buttonText }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Función que decide qué renderizar dentro del div circular
  const renderCircularContent = () => {
    if (true)  {
      return (
        <button className="btn-circular" onClick={() => navigate("/cursos")}>
          {buttonText || "Campus Virtual"}
        </button>
      );
    } else {
      return <img src={imgSrc || flecha5} alt="foto_estudiante" />;
    }
  };

  return (
    <div className="header_style">
      <div className="flechas_circulo">
        <div>
          <img className="flecha5" src={flecha5} alt="flecha5" />
        </div>
        <div className="div-circular">{renderCircularContent()}</div>
      </div>
    </div>
  );
};

export default Header_student;
