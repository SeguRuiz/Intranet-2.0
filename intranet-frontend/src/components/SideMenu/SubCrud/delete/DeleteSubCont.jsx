import { useFetch } from "../../../../services/llamados";
import { deleteSubcontenidos } from "../../../../redux/CursosContenidosSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
const DeleteSubCont = ({ id, contenido_id }) => {
  const { define_fetch, fetch_the_data_without_token } = useFetch();
  const { archivo_mostrandose } = useSelector(
    (state) => state.CursosContenidos
  );
  const accion = useDispatch();
  const deleteSubCont = async () => {
    define_fetch(
      "http://localhost:8000/cursos_contenidos/subcontenidos_edit",
      id,
      "DELETE"
    );
    const data = await fetch_the_data_without_token();
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
