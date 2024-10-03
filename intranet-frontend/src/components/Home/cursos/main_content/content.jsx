import "./content.css";
import React, { useRef, useEffect } from "react";
import { useState } from "react";
import { useFetch } from "../../../../services/llamados";
import { useSelector } from "react-redux";
import { openModal } from "../../../../redux/modalSlice";
import { useDispatch } from "react-redux";
import { setCursos, setData } from "../../../../redux/modalSlice";
import Modal from "../../../modal/Modal";
// import Datosusuarios from "../../../../Luis/Datosusuarios";
import { useNavigate } from "react-router-dom";

const content = () => {
  const { cursos } = useSelector((state) => state.modal);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, define_fetch, fetch_the_data_without_token } = useFetch();
  const { nombre, URL } = useSelector((state) => state.modal);
  const accion = useDispatch();
  const ref_input = useRef();
  const [esAdmin, setEsAdmin] = useState(false);
  const navigate = useNavigate();
  // const info = Datosusuarios();
  // console.log(info);
  // console.log(info_user);

  const cambioValor = (evento) => {
    accion(
      openModal({ nombre: evento.target.value, URL: evento.target.value })
    );
  };

  const modalAbierto = () => {
    setIsModalOpen(true);
  };

  const modalCerrado = () => {
    setIsModalOpen(false);
  };

  const subirDatosCursos = async (evento) => {
    evento.preventDefault();
    const valor_input = ref_input.current.value;
    accion(
      setCursos({
        nombre: valor_input,
      })
    );
    define_fetch("http://localhost:8000/cursos/cursos", "", "POST", {
      nombre: valor_input,
    });
    fetch_the_data_without_token();
    modalCerrado();
  };

  useEffect(() => {
    const data = async () => {
      define_fetch("http://localhost:8000/cursos/cursos", "", "GET");
      const datos = await fetch_the_data_without_token();
      console.log(datos[1]);

      accion(setData(datos[1]));
    };
    data();
  }, []);

  useEffect(() => {
    const info_user = localStorage.getItem("rol");
    if (info_user === "admin") {
      setEsAdmin(true);
    } else {
      setEsAdmin(false);
    }
  }, []);

  return (
    <>
      <div className="container">
        <div>
          {esAdmin && <button onClick={modalAbierto}>Crear</button>}
          <Modal isOpen={isModalOpen} onClose={modalCerrado}>
            <form onSubmit={subirDatosCursos}>
              <input
                type="text"
                placeholder="Nombre Curso"
                onChange={cambioValor}
                ref={ref_input}
              />
            </form>
          </Modal>
        </div>
        <div className="diseno_content">
          {cursos.map((e, i) => (
            <div key={i} className="note-container">
              <div
                onClick={() => {
                  navigate("/cursos/curso");
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

export default content;
