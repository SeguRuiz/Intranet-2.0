import React, { useState } from "react";
import "./tarea.css";
import Modal from "../../../modal/Modal";
import { pushContenidoTareas } from "../../../../redux/ObtenerDatosTareaSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useFetch } from "../../../../services/llamados";
import { setDatos } from "../../../../redux/ObtenerDatosTareaSlice";
import { useEffect } from "react";
import Borrar_tarea from "./Borrar_tarea";
import { useNavigate } from "react-router-dom";
import { pushTareasAsignadas } from "../../../../redux/ObtenerDatosTareaSlice";
import Swal from "sweetalert2";

const Tarea = () => {
  const hola = 'hola'
  console.log(hola);
  
  const navigate = useNavigate();
  const { estudiantes } = useSelector((e) => e.CursosContenidos);
  console.log(estudiantes);

  const { fetch_the_data } = useFetch();
  const { id_curso } = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [date, setDate] = useState("");
  const [dateCheck, setDateCheck] = useState("");
  const accion = useDispatch();
  const { contenidos_tareas } = useSelector((state) => state.datos_tarea);
  const { userInSession } = useSelector((state) => state.Auth);
  const hoy = new Date().toISOString().split("T")[0];
  const modalAbierto = () => {
    setIsModalOpen(true);
  };
  const modalCerrado = () => {
    setIsModalOpen(false);
  };
  const subirTareaProfesor = async (evento) => {
    evento.preventDefault();
    if (estudiantes[0] != undefined) {
      const datos_post = await fetch_the_data(
        "http://localhost:8000/tareas/info_tarea",
        null,
        "POST",
        {
          titulo: title,
          descripcion: descripcion,
          fecha_revision: dateCheck,
          cursos: id_curso,
          profesor_id: userInSession.id,
        }
      );
      accion(pushContenidoTareas(datos_post[1]));
      asignarTarea(datos_post[1]?.id);
      console.log(contenidos_tareas);
      setTitle("");
      setDescripcion("");
      setDate("");
      setDateCheck("");
    }
    if (estudiantes[0] == undefined) {
      Swal.fire("No se puede subir una tarea sino se ha seleccionado un grupo");
    }
  };

  const asignarTarea = async (id) => {
    console.log(id);

    if (estudiantes[0] != undefined) {
      const taskAsigned = await fetch_the_data(
        "http://localhost:8000/tareas/asignar_tareas_estudiantes",
        null,
        "POST",
        {
          tarea_info: {
            curso_id: id_curso,
            entregada: false,
            revisada: false,
            profesor_id: userInSession.id,
            calificacion: 0,
            info_tarea_id: id,
          },
          estudiantes: estudiantes,
        }
      );
      accion(pushTareasAsignadas(taskAsigned[1]));
    }
  };

  useEffect(() => {
    const data = async () => {
      const datos = await fetch_the_data(
        "http://localhost:8000/tareas/info_tarea",
        null,
        "GET"
      );
      accion(setDatos(datos[1]));
    };
    data();
  }, []);

  return (
    <div className="main-container">
      {userInSession.is_staff && (
        <button className="btn-add-task" onClick={modalAbierto}>
          Agregar Tarea
        </button>
      )}
      <Modal isOpen={isModalOpen} onClose={modalCerrado}>
        <form className="task-form" onSubmit={subirTareaProfesor}>
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
          <label>Fecha limite</label>
          <input
            type="date"
            placeholder="Fecha revision"
            onChange={(e) => setDateCheck(e.target.value)}
            value={dateCheck}
            min={hoy}
          />
          <button>Subir Tarea</button>
        </form>
      </Modal>
      {contenidos_tareas.map((contenido, index) => (
        <div key={index} className="task-container">
          <div className="task-name">Tarea: {contenido.titulo}</div>
          <div className="task-date">
            Entrega: {new Date(contenido.fecha_entrega).toLocaleDateString()}
          </div>
          <div
            className="task-info"
            onClick={() => {
              navigate(`/cursos/${id_curso}/${contenido.id}/contenido_tarea`);
            }}
          >
            Más información
          </div>
          {userInSession?.is_staff && <Borrar_tarea id={contenido.id} />}
        </div>
      ))}
    </div>
  );
};
export default Tarea;
