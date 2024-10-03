import { useFetch } from "../../../../services/llamados";
import { deleteContenidos } from "../../../../redux/CursosContenidosSlice";
import { useDispatch } from "react-redux";

import "./DeleteContent.css";
const DeleteContent = ({ id }) => {
  const accion = useDispatch();
  const { define_fetch, fetch_the_data_without_token } = useFetch();

  const deleteC = async () => {
    define_fetch(
      "http://localhost:8000/cursos_contenidos/contenidos_edit",
      id,
      "DELETE"
    );
    fetch_the_data_without_token();
    accion(deleteContenidos({ id: id }));
  };
  return (
    <button id={id} onClick={deleteC}>
      Eliminar
    </button>
  );
};

export default DeleteContent;
