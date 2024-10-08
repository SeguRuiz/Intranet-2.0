import React, { useState } from "react";
import "./tarea.css";
import Modal from "../../../modal/Modal";
import { useRef } from "react";
import { pushContenidoTareas } from "../../../../redux/ObtenerDatosTareaSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Tarea = () => {
  const [isModalOpen, setIsModalOpen] = useState("");
  const [title, setTitle] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [date, setDate] = useState("");
  const [dateCheck, setDateCheck] = useState("");
  const accion = useDispatch();
  const { contenidos } = useSelector(
    (ObtenerTareas) => ObtenerTareas.datos_tarea
  );

  const modalAbierto = () => {
    setIsModalOpen(true);
  };

  const modalCerrado = () => {
    setIsModalOpen(false);
  };

  // titulo, descripcion, fecha_entrega,
  // fecha_revision, profesor_asignado_id.

  const Cuerpo_Tarea = {
    titulo: title,
    descripcion: descripcion,
    fecha_entrega: date,
    fecha_revision: dateCheck,
  };

  const enviarDatos = (evento) => {
    evento.preventDefault();
    accion(pushContenidoTareas(Cuerpo_Tarea));
    console.log(contenidos);
  };
  return (
    <div>
      <button className="b-t-n" onClick={modalAbierto}>
        Agregar Tarea
      </button>
      <Modal isOpen={isModalOpen} onClose={modalCerrado}>
        <form onSubmit={enviarDatos}>
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
          <button style={{ display: "none" }}>Subir Datos</button>
        </form>
      </Modal>
      {contenidos.map((contenido, index) => (
        <div key={index} className="container_main">
          <div className="content_name_HW">{contenido.titulo}</div>
          <div className="content_description">{contenido.descripcion}</div>
          <div className="content_date">{contenido.fecha_entrega}</div>
          <div className="content_date_check">{contenido.fecha_revision}</div>
        </div>
      ))}
    </div>
  );
};

export default Tarea;
