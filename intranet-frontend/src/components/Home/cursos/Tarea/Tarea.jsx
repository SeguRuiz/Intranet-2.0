import React, { useState } from "react";
import "./tarea.css";
import Modal from "../../../modal/Modal";
import { useRef } from "react";
import { pushContenidoTareas } from "../../../../redux/ObtenerDatosTareaSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useFetch } from "../../../../services/llamados";
import { setDatos } from "../../../../redux/ObtenerDatosTareaSlice";
import { useEffect } from "react";
import Borrar_tarea from "./Borrar_tarea";
import { useNavigate } from "react-router-dom";

const Tarea = () => {
  const navigate = useNavigate();

  const {  fetch_the_data } =
    useFetch();
  const { id_curso } = useParams();
  const [isModalOpen, setIsModalOpen] = useState("");
  const [title, setTitle] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [date, setDate] = useState("");
  const [dateCheck, setDateCheck] = useState("");
  const accion = useDispatch();
  const { contenidos_tareas } = useSelector((state) => state.datos_tarea);
  // const ref_form = useRef();

  const modalAbierto = () => {
    setIsModalOpen(true);
  };

  const modalCerrado = () => {
    setIsModalOpen(false);
  };

  const enviarDatos = async (evento) => {
    evento.preventDefault();

    const status_fetch = await fetch_the_data(
      "http://localhost:8000/info_tareas/info",
      null,
      "POST",
      {
        titulo: title,
        descripcion: descripcion,
        fecha_entrega: date,
        fecha_revision: dateCheck,
        cursos: id_curso,
      }
    );
    accion(pushContenidoTareas(status_fetch[1]));
    // ref_form.current.reset();
    console.log(contenidos_tareas, status_fetch);
  };

  useEffect(() => {
    const data = async () => {
      const datos = await fetch_the_data(
        "http://localhost:8000/info_tareas/info",
        null,
        "GET"
      );
      console.log(datos);

      accion(setDatos(datos[1]));
    };
    data();
  }, []);

  return (
    <div className="main-container">
      <button className="btn-add-task" onClick={modalAbierto}>
        Agregar Tarea
      </button>
      <Modal isOpen={isModalOpen} onClose={modalCerrado}>
        <form className="task-form" onSubmit={enviarDatos}>
          <input
            type="text"
            placeholder="Titulo Contenido"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
         
          />
          <input
            type="text"
            placeholder="Descripcion"
            onChange={(e) => setDescripcion(e.target.value)}
            value={descripcion}
          />
          <input
            type="date"
            placeholder="Fecha entrega"
            onChange={(e) => setDate(e.target.value)}
            value={date}
          />
          <input
            type="date"
            placeholder="Fecha revision"
            onChange={(e) => setDateCheck(e.target.value)}
            value={dateCheck}
          />

          <button className="btn-submit-task">Subir Tarea</button>
        </form>
      </Modal>
      <div className="filter-container">
        <div className="filter-btn">Atrasadas</div>
        <div className="filter-btn">Revisadas</div>
        <div className="filter-btn">Entregadas</div>
      </div>

      {contenidos_tareas.map((contenido, index) => (
        <div key={index} className="task-container">
          <div className="task-name">Tarea: {contenido.titulo}</div>
          <div className="task-date">Entrega: {contenido.fecha_entrega}</div>
          <div
            className="task-info"
            onClick={() => {
              navigate(`/cursos/${id_curso}/${contenido.id}/contenido_tarea`);
            }}
          >
            Más información
          </div>
          <div className="task-status">Sin entregar</div>
          <Borrar_tarea id={contenido.id} />
        </div>
      ))}
    </div>
  );
};

export default Tarea;
