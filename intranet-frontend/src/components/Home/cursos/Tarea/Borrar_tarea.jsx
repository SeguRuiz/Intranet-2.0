import { deleteContenidosTareas } from "../../../../redux/ObtenerDatosTareaSlice";
import { useDispatch } from "react-redux";
import { useFetch } from "../../../../services/llamados";

const Borrar_tarea = ({ id }) => {
  const accion = useDispatch();
  const token = sessionStorage.getItem("token");
  const { fetch_the_data } = useFetch();
  console.log(id);

  const deleteC = async () => {
    
    fetch_the_data("http://localhost:8000/info_tareas/delete", token, "DELETE", null, id );
    accion(deleteContenidosTareas({ id: id }));
  };

  return (
    <div>
      <button id={id} onClick={deleteC}>
        Eliminar
      </button>
    </div>
  );
};

export default Borrar_tarea;
