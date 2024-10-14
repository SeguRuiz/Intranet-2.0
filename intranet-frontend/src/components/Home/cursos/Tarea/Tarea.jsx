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
import set_archivo_mostrandose from "../../../../redux/CursosContenidosSlice";

const Tarea = () => {
  const { define_fetch, fetch_the_data, fetch_the_data_without_token } =
    useFetch();
  const { id_curso } = useParams();
  const [isModalOpen, setIsModalOpen] = useState("");
  const [title, setTitle] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [date, setDate] = useState("");
  const [dateCheck, setDateCheck] = useState("");
  const accion = useDispatch();
  const { contenidos } = useSelector((state) => state.datos_tarea);
  // const ref_form = useRef();

  const modalAbierto = () => {
    setIsModalOpen(true);
  };

  const modalCerrado = () => {
    setIsModalOpen(false);
  };

  // const Cuerpo_Tarea = {
  //   titulo: title,
  //   descripcion: descripcion,
  //   fecha_entrega: date,
  //   fecha_revision: dateCheck,
  // };
  // const datos1 = async () => {
  const enviarDatos = async (evento) => {
    evento.preventDefault();
    define_fetch("http://localhost:8000/info_tareas/info", "", "POST", {
      titulo: title,
      descripcion: descripcion,
      fecha_entrega: date,
      fecha_revision: dateCheck,
      cursos: id_curso,
    });

    const status_fetch = await fetch_the_data_without_token();
    accion(pushContenidoTareas(status_fetch[1]));
    // ref_form.current.reset();
    console.log(contenidos, status_fetch);
  };

  useEffect(() => {
    const data = async () => {
      define_fetch("http://localhost:8000/info_tareas/info", "", "GET");
      const datos = await fetch_the_data_without_token();
      console.log(datos[1]);

      accion(setDatos(datos[1]));
      // accion(set_archivo_mostrandose(null));
    };
    data();
  }, []);

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
          <button>Subir Tarea</button>
        </form>
      </Modal>
      <div className="container_filter">
        <div>Atrasadas</div>
        <div>Revisadas</div>
        <div>Entregadas</div>
      </div>
      <div className="container_main">
        <div>
          <p>Nombre Tarea</p>
        </div>
        <div>
          <p>Descripción Tarea</p>
        </div>
        <div>
          <p>Fecha Entrega</p>
        </div>
        <div>
          <p>Fecha Revisión</p>
        </div>
      </div>
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
