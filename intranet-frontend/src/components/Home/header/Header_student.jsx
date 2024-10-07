import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import flecha5 from "../../../assets/flechas/flechas5.png";
import { useParams } from "react-router-dom";
import "./header.css";

const Header_student = ({ imgSrc, buttonText }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const {id_curso} = useParams()

  console.log(id_curso);
  
  
 
  // Función que decide qué renderizar dentro del div circular
  const renderCircularContent = () => {
    if (id_curso != undefined) {
      return (
        <button className="btn-circular" onClick={() => navigate("/cursos")}>
          {buttonText || "Campus Virtual"}
        </button>
      );
    } 
      return <div className="div-circular"></div>;
    
  };

  return (
    <div className="header_style">
      <div className="flecha-container">
        <img className="flecha5" src={flecha5} alt="flecha5" />
      </div>
      {renderCircularContent()}
    </div>
  );
};

export default Header_student;
