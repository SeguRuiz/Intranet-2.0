import React from "react";
import "./content.css";

const content = () => {
  let array = ["hola", "hola", "hola", "hola"];
  return (
    <>
      {array.map((e, i) => (
        <div key={i} className="note-container">
          Contenido {e}
        </div>
      ))}
    </>
  );
};

export default content;
