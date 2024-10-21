import React from "react";
import "./cuadro_evaluacion.css";

const Cuadro_evaluacion = () => {
  return (
    <div className="div-padre">
      <table className="tabla-padre">
        <thead>
          <tr>
            <th>Requerimientos a evaluar</th>
            <th>Excelente</th>
            <th>Normal</th>
            <th>Deficiente</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Req 1</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Cuadro_evaluacion;
