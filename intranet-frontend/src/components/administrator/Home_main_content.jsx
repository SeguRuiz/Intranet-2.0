import { useRef } from "react";
import Header_student from "../Home/cursos/header/Header_student";
import NavBar from "../Home/cursos/navbar/NavBar_Student";
import Modal from "../../components/modal/Modal";
import "./Home_main_content.css";
import { useState } from "react";
import { useFetch } from "../../services/llamados";
import { useSelector } from "react-redux";
import { openModal } from "../../redux/modalSlice";

import { useDispatch } from "react-redux";
import { setCursos } from "../../redux/modalSlice";

const Home_main_content = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, define_fetch, fetch_the_data_without_token } = useFetch();
  const { nombre, URL } = useSelector((state) => state.modal);
  const accion = useDispatch();
  const ref_input = useRef();

  const cambioValor = (evento) => {
    accion(
      openModal({ nombre: evento.target.value, URL: evento.target.value })
    );
  };

  define_fetch("http://localhost:8001/cursos", "", "POST", {
    nombre: "Front-end",
    activo: true,
  });

  const modalAbierto = () => {
    setIsModalOpen(true);
  };

  const modalCerrado = () => {
    setIsModalOpen(false);
  };

  const subirDatosCursos = (evento) => {
    evento.preventDefault();
    const valor_input = ref_input.current.value;
    accion(setCursos(valor_input));
    modalCerrado();
  };
  return (
    <div>
      <Header_student />
      <NavBar />
      <button onClick={modalAbierto}>Crear</button>
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
  );
};

export default Home_main_content;
