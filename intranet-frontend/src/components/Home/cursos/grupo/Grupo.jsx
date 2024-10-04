import React from "react";
import "./grupo.css";

const Grupo = ({ integrantes, titulo = [] }) => {
  return (
    <div className="profesores-container">
      <table className="profesores-table">
        {titulo.map((nombre_titulo, index) => (
          <thead key={index}>
            {nombre_titulo.nombre}
            <tr key={index}>
              <th>Perfil</th>
              <th>Nombre</th>
              <th>Correo</th>
            </tr>
          </thead>
        ))}
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
