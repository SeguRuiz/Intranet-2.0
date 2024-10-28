import React from "react";
import "./grupo.css";

const Grupo = ({ titulo, integrantes }) => {
  return (
    <div className="profesores-container">
      <table className="profesores-table">
        <thead>
          <tr>
            <th className="encabezado">{titulo}</th>
          </tr>
          <tr>
            <th>Perfil</th>
            <th>Nombre</th>
            <th>Correo</th>
          </tr>
        </thead>

        <tbody>
          {integrantes.map((integrante, index) => (
            <tr key={index}>
              <td>
                <div className="perfil-icon"></div>
              </td>
              <td>{integrante.nombre}</td>
              <td>{integrante.correo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Grupo;
