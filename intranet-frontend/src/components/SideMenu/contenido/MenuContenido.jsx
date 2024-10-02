import React from "react";
import { useState } from "react";
import SubCont from "../subContenidos/SubCont";
import "./MenuCon.css";
const MenuContenido = ({ key }) => {
  const [abrir, setAbrir] = useState(false);

  const abrirCerrar = () => {
    abrir ? setAbrir(false) : setAbrir(true);
  };

  return (
    <div
      key={key}
      className="menu-contenido"
      style={{ height: abrir ? "auto" : "50px"}}
    >
      <div className="menu-contenido-titulo" onClick={abrirCerrar}>
        <p style={{marginLeft: "10px"}}>Contenido</p>
        {abrir ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="40px"
            viewBox="0 -960 960 960"
            width="35px"
            fill="#ffff"
          >
            <path d="m280-400 200-200.67L680-400H280Z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="40px"
            viewBox="0 -960 960 960"
            width="35px"
            fill="#ffff"
          >
            <path d="M480-360 280-559.33h400L480-360Z" />
          </svg>
        )}
      </div>

      <SubCont />
    </div>
  );
};

export default MenuContenido;
