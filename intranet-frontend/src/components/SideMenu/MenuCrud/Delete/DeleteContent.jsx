import { useFetch } from "../../../../services/llamados";
import { deleteContenidos } from "../../../../redux/CursosContenidosSlice";
import { useDispatch } from "react-redux";

import "./DeleteContent.css";
import { getCookie } from "../../../../utils/Cookies";
const DeleteContent = ({ id }) => {
  const accion = useDispatch();
  const token = getCookie("token");
  const { fetch_the_data } = useFetch();

  const deleteC = async () => {
    fetch_the_data(
      "http://localhost:8000/cursos_contenidos/contenidos_edit",
      token,
      "DELETE",
      null,
      id
    );
    accion(deleteContenidos({ id: id }));
  };
  return (
    <button id={id} onClick={deleteC}>
      Eliminar
    </button>
  );
};

export default DeleteContent;
