import { deleteContenidosTareas } from "../../../../redux/ObtenerDatosTareaSlice";
import { useDispatch } from "react-redux";
import { useFetch } from "../../../../services/llamados";
import "./tarea.css";

const Borrar_tarea = ({ id }) => {
  const accion = useDispatch();
  const token = sessionStorage.getItem("token");
  const { fetch_the_data } = useFetch();

  const borrarTarea = async () => {
    fetch_the_data(
      "http://localhost:8000/tareas/delete",
      token,
      "DELETE",
      null,
      id
    );
    accion(deleteContenidosTareas({ id: id }));
  };


  

  

  return (
    <div>
      <button id={id} onClick={borrarTarea} className="btn-delete">
        Eliminar
      </button>
    </div>
  );
};

export default Borrar_tarea;
