import "./AddCurso.css";
import { useFetch } from "../../../../../services/llamados";
import { useEffect, useState, useRef } from "react";
import { setCursos } from "../../../../../redux/modalSlice";
import { useDispatch } from "react-redux";
import Modal from "../../../../modal/Modal";

const AddCurso = () => {
  const { define_fetch, fetch_the_data_without_token } = useFetch();
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
    define_fetch("http://localhost:8000/cursos/cursos", "", "POST", {
      nombre: valor_input,
    });
    const data = await fetch_the_data_without_token();
    console.log(data);
    accion(setCursos(data[1]));
    
    
    modalCerrado();
  };

  useEffect(() => {
    const info_user = localStorage.getItem("rol");
    if (info_user === "admin") {
      setEsAdmin(true);
    } else {
      setEsAdmin(true);
    }
  }, []);

  return (
    <>
      <div>
        {esAdmin && <button onClick={modalAbierto} style={{marginLeft: '12px'}}>Crear</button>}
        <Modal isOpen={isModalOpen} onClose={modalCerrado}>
          <form onSubmit={subirDatosCursos}>
            <input
              type="text"
              placeholder="Nombre Curso"
              ref={ref_input}
            />
          </form>
        </Modal>
      </div>
    </>
  );
};

export default AddCurso;
