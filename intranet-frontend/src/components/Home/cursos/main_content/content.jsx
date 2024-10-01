import React from "react";
import "./content.css";
import { useSelector } from "react-redux";

const content = () => {
  const { cursos } = useSelector((state) => state.modal);
  return (
    <>
      {cursos.map((e, i) => (
        <div key={i} className="note-container">
          Contenido {e}
        </div>
      ))}
    </>
  );
};

export default content;
