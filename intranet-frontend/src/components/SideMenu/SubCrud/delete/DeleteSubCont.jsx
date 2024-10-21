import { useFetch } from "../../../../services/llamados";
import { deleteSubcontenidos } from "../../../../redux/CursosContenidosSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getCookie } from "../../../../utils/Cookies";
const DeleteSubCont = ({ id, contenido_id }) => {
  const { fetch_the_data } = useFetch();
  const token = getCookie("token");
  const accion = useDispatch();
  const deleteSubCont = async () => {
    const data = await fetch_the_data(
      "http://localhost:8000/cursos_contenidos/subcontenidos_edit",
      token,
      "DELETE",
      null,
      id
    );
    console.log(data);
    accion(
      deleteSubcontenidos({ contenidoId: contenido_id, subcontenidoId: id })
    );
  };
  return (
    <button id={id} onClick={deleteSubCont}>
      Eliminar
    </button>
  );
};

export default DeleteSubCont;
