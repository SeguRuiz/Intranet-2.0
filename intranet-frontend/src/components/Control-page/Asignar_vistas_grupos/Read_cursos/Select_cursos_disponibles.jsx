import { useState } from "react";
import { set_curso } from "../../../../redux/ControlUsuariosSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const Select_cursos_disponibles = ({ nombre, id }) => {
  const { curso_seleccionado } = useSelector((e) => e.ControlUsuarios);

  const accion = useDispatch();

  return (
    <div
      className={"read-curso-disponible"}
      onClick={() => {
        curso_seleccionado != id
          ? accion(set_curso(id))
          : accion(set_curso(null));
      }}
      style={{
        gridTemplateRows: curso_seleccionado == id ? "20% auto" : "0% auto",
      }}
    >
      <div className="curso-header">{nombre}</div>

      <div className="eye-content">
        <div
          className={
            curso_seleccionado == id
              ? "read-curso-content-selected"
              : "read-curso-content"
          }
        >
          <div className={curso_seleccionado == id ? "iris" : "grid"}>
            {curso_seleccionado != id && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="80px"
                viewBox="0 -960 960 960"
                width="80px"
                fill="var(--OnSecondary-color)"
              >
                <path d="M220-80q-24 0-42-18t-18-42v-680q0-24 18-42t42-18h520q24 0 42 18t18 42v680q0 24-18 42t-42 18H220Zm0-60h520v-680h-60v266l-97-56-97 56v-266H220v680Zm0 0v-680 680Zm266-414 97-56 97 56-97-56-97 56Z" />
              </svg>
            )}
          </div>
          {curso_seleccionado != id && (
            <div className="nombre_curso">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="30px"
                viewBox="0 -960 960 960"
                width="30px"
                fill="var(--OnsurfaceVariant)"
              >
                <path d="M200-120v-665q0-24 18-42t42-18h440q24 0 42 18t18 42v665L480-240 200-120Z" />
              </svg>
              <p>{nombre}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Select_cursos_disponibles;
