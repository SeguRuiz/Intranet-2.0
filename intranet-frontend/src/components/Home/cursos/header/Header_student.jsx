import React from "react";
import flecha5 from "../../../../assets/flechas/flechas5.png";
import "./header.css";

const Header_student = () => {
  return (
    <div className="header_style">
      <div className="flechas_circulo">
        <div>
          <img className="flecha5" src={flecha5} alt="flecha5" />
        </div>
        <div className="div-circular">
          <img src={flecha5} alt="foto_estudiante" />
        </div>
      </div>
    </div>
  );
};

export default Header_student;
