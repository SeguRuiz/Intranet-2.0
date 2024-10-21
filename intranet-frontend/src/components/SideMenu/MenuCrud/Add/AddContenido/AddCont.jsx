import { useRef } from "react";
import { useCustomModal } from "../../../../../utils/customHooks";
import { pushContenidos } from "../../../../../redux/CursosContenidosSlice";
import { useDispatch } from "react-redux";
import { useFetch } from "../../../../../services/llamados";
import { useParams } from "react-router-dom";
import { getCookie } from "../../../../../utils/Cookies";



export const AddCont = () => {
  const modalRef = useRef();
  const inputNombre = useRef();
  const { id_curso } = useParams();
  const { openModal, closeModalDlg, closeModal } = useCustomModal(modalRef);
  const { fetch_the_data } = useFetch();
  const accion = useDispatch();
  const token = getCookie("token");

  const subirContenido = async (o) => {
    o.preventDefault();
    const nombre_value = inputNombre.current.value.trim();
    if (nombre_value != "") {
      const data = await fetch_the_data(
        "http://localhost:8000/cursos_contenidos/contenidos",
        token,
        "POST",
        {
          nombre: nombre_value,
          curso: id_curso,
        }
      );
      accion(pushContenidos({ ...data[1], subcontenidos: [] }));
      closeModal();
      inputNombre.current.value = "";
    }
  };
  return (
    <>
      <button onClick={openModal}>Agregar</button>
      <dialog ref={modalRef} onClick={closeModalDlg} style={{ margin: "auto" }}>
        <form onSubmit={subirContenido}>
          <input
            type="text"
            name=""
            placeholder="Nombre del contenido"
            ref={inputNombre}
          />
        </form>
      </dialog>
    </>
  );
};
