import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useFetch } from "../../../../services/llamados";
import { useDispatch } from "react-redux";
import { setDatos } from "../../../../redux/ObtenerDatosTareaSlice";
import Cuadro_evaluacion from "./Cuadro_evaluacion";
import Requerimientos from "./Requerimientos";
import Obtener_tareas from "./Subir_tareas";
const Contenido_tarea = () => {
  const { id_curso, id_tarea } = useParams(); // con esto tenemos( capturamos ) el id del curso y de la tarea individual

  const accion = useDispatch();

  const { fetch_the_data } = useFetch();

  useEffect(() => {
    const data = async () => {
      const datos = await fetch_the_data(
        "http://localhost:8000/info_tareas/info",
        null,
        "GET"
      );
      console.log(datos[1]);
      accion(setDatos(datos[1]));
    };
    data();
  }, []);

  const { contenidos_tareas } = useSelector((state) => state.datos_tarea); // obtenemos el contenido de las tareas desde el estado global usando redux
  console.log(contenidos_tareas);

  const tareaSeleccionada = contenidos_tareas.find(
    (tarea) => tarea.id === id_tarea
  ); //aca se busca la tarea que coincide con el id enviada por la url
  console.log(tareaSeleccionada);

  if (!tareaSeleccionada) {
    return <div>No se encontró la tarea seleccionada.</div>;
  }

  return (
    <div>
      <h1>Detalles de la Tarea</h1>
      <div>
        <h2>{tareaSeleccionada.titulo}</h2>
        <p>Descripción: {tareaSeleccionada.descripcion}</p>
      </div>
      <div>
        <Requerimientos />
        <Cuadro_evaluacion />
        <div>
          <p>Fecha limite de entrega:{tareaSeleccionada.fecha_entrega}</p>
          <p>Sin entregar</p>
        </div>
        <Obtener_tareas />
      </div>
    </div>
  );
};

export default Contenido_tarea;
