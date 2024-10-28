import React from "react";
import "./grupo.css";
import { Avatar } from "@mui/material";
import { stringAvatar } from "../../../../utils/Utils";

const Grupo = ({ integrantes, titulo }) => {
  return (
    <div className="profesores-container">
      <table className="profesores-table">
        <thead>
          <tr>
            <th  style={{backgroundColor: 'var(--SurfaceBrigth-color)', color: 'var(--OnsurfaceVariant)', border: 'none', fontSize: '25px'}}>{titulo}</th>
          </tr>
          <tr>
            <th>Perfil</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Cedula</th>
          </tr>
        </thead>

        <tbody>
          {integrantes.map((integrante, index) => (
            <tr key={index}>
              <td className="td-perfil-icon">
                <Avatar {...stringAvatar(`${integrante.first_name} ${integrante.last_name}`, {boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px;'})}/>
              </td>
              <td>{`${integrante.first_name} ${integrante.last_name}`}</td>
              <td>{integrante.email}</td>
              <td>{integrante.cedula}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Grupo;
