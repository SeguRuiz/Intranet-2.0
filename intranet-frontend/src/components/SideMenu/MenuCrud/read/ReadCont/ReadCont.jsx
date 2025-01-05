"componente deprecado"

import "./ReadCont.css";
import DeleteContent from "../../Delete/DeleteContent";
import ReadSubConts from "../../../SubCrud/read/ReadSubConts";
import AddSubConts from "../../../SubCrud/add/AddSubConts";

import { useState } from "react";
export const ReadCont = ({ nombre, id, subContenidos }) => {
  const [abrir, setAbrir] = useState(false);
  const abrirCerrar = () => {
    abrir ? setAbrir(false) : setAbrir(true);
  };

  return (
    <>
      <div
        className="subCont-container"
        style={{ height: abrir ? "auto" : "10.5vh" }}
      >
        <div
          key={id}
          className={
            abrir ? "read-container-modal-open" : "read-container-modal-"
          }
          style={{ border: "none" }}
          onClick={abrirCerrar}
        >
          <div className="read-nombre-modal">
            {abrir ? <strong>{nombre}</strong> : <p>{nombre}</p>}
          </div>
          <div className="read-contenidos-modal"></div>
          <div className="read-opciones-modal">
            <DeleteContent id={id} open={abrir}/>
            {abrir ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="50px"
                viewBox="0 -960 960 960"
                width="50px"
                fill="var(--OnSecondary-color)"
              >
                <path d="m280-400 200-200.67L680-400H280Z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="50px"
                viewBox="0 -960 960 960"
                width="50px"
                fill="var(--OnsurfaceVariant)"
              >
                <path d="M480-360 280-559.33h400L480-360Z" />
              </svg>
            )}
          </div>
        </div>
        <AddSubConts Contenido_id={id} />
        <ReadSubConts subContenidos={subContenidos} />
      </div>
    </>
  );
};
