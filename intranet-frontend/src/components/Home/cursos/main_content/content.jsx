import "./content.css";
import React, { useRef, useEffect } from "react";
import { useState } from "react";
import { useFetch } from "../../../../services/llamados";
import { set_archivo_mostrandose } from "../../../../redux/CursosContenidosSlice";

import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { setData } from "../../../../redux/modalSlice";
import AddCurso from "./add/AddCurso";
// import Datosusuarios from "../../../../Luis/Datosusuarios";
import { useNavigate } from "react-router-dom";

const Content = () => {
  const { cursos } = useSelector((state) => state.modal);

  const { define_fetch, fetch_the_data_without_token } = useFetch();

  const accion = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    const data = async () => {
      define_fetch("http://localhost:8000/cursos/cursos", "", "GET");
      const datos = await fetch_the_data_without_token();
      console.log(datos[1]);

      accion(setData(datos[1]));
      accion(set_archivo_mostrandose(null))
    };
    data();
  }, []);

  return (
    <>
      <div className="container">
        <AddCurso />
        <div className="diseno_content">
          {cursos.map((e) => (
            <div key={e.id} id={e.id} className="note-container">
              <div
                onClick={() => {
                  navigate(`/cursos/${e.id}/contenidos`);
                }}
                className="icono"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="100%"
                  viewBox="0 -960 960 960"
                  width="100%"
                  fill="#00000"
                >
                  <path d="M40-120v-80h880v80H40Zm120-120q-33 0-56.5-23.5T80-320v-440q0-33 23.5-56.5T160-840h640q33 0 56.5 23.5T880-760v440q0 33-23.5 56.5T800-240H160Zm0-80h640v-440H160v440Zm0 0v-440 440Z" />
                </svg>
              </div>
              <div className="titulo">{e.nombre}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Content;
