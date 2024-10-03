import React from "react";
import "./grupo.css";

const Grupo = () => {
  return (
    <div className="container1">
      <div className="containe-hijo">
        <p>Profesores</p>

        <div className="container-profe">
          <div className="container-perfil">
            <p>Perfil</p>
          </div>
          <div className="contenido-nombre">
            <p>Nombre</p>
          </div>
          <div className="contenido-correo">
            <p>Correo</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grupo;
