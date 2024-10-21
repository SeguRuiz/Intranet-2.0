import "./AddCurso.css";
import { useFetch } from "../../../../../services/llamados";
import { useEffect, useState, useRef } from "react";
import { setCursos } from "../../../../../redux/modalSlice";
import { useDispatch } from "react-redux";
import Modal from "../../../../modal/Modal";
import { getCookie } from "../../../../../utils/Cookies";

const AddCurso = () => {
  const { fetch_the_data } = useFetch();
  const token = getCookie('token')
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ref_input = useRef();
  const [esAdmin, setEsAdmin] = useState(true);
  const accion = useDispatch();

  const modalAbierto = () => {
    setIsModalOpen(true);
  };

  const modalCerrado = () => {
    setIsModalOpen(false);
  };

  const subirDatosCursos = async (evento) => {
    evento.preventDefault();
    const valor_input = ref_input.current.value;

    const data = await fetch_the_data(
      "http://localhost:8000/cursos/cursos",
      token,
      "POST",
      { nombre: valor_input }
    );
    console.log(data);
    accion(setCursos(data[1]));
    modalCerrado();
  };

  return (
    <>
      <div>
        {esAdmin && (
          <button onClick={modalAbierto} style={{ marginLeft: "12px" }}>
            Crear
          </button>
        )}
        <Modal isOpen={isModalOpen} onClose={modalCerrado}>
          <form onSubmit={subirDatosCursos}>
            <input type="text" placeholder="Nombre Curso" ref={ref_input} />
          </form>
        </Modal>
      </div>
    </>
  );
};

export default AddCurso;
