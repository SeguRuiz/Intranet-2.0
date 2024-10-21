import React from "react";
import { deleteContenidosTareas } from "../../../../redux/ObtenerDatosTareaSlice";
import { useDispatch } from "react-redux";
import { useFetch } from "../../../../services/llamados";

const Borrar_tarea = ({ id }) => {
  const accion = useDispatch();
  const token = sessionStorage.getItem("token");
  const { define_fetch, fetch_the_data } = useFetch();
  console.log(id);

  const deleteC = async () => {
    define_fetch("http://localhost:8000/info_tareas/delete", id, "DELETE");
    fetch_the_data(token);
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
