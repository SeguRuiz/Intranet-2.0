import "./Contenido_tarea.css";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useFetch } from "../../../../services/llamados";
import {
  setDatos,
  subirArchivosTareasEstudiantes,
} from "../../../../redux/ObtenerDatosTareaSlice";
import Subir_tareas from "./Subir_tareas_prof";
import uuid from "react-uuid";
import { getCookie } from "../../../../utils/Cookies";

{
  /*Componente encargado de mostrar el contenido especifico de cada tarea, junto con su archivo especifico*/
}
const Contenido_tarea = () => {
  const { estudiantes } = useSelector((state) => state.CursosContenidos);
  const { userInSession } = useSelector((state) => state.Auth);
  const { id_tarea } = useParams();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [archivoAsignado, setArchivoAsignado] = useState(false);

  const dispatch = useDispatch();
  const { fetch_the_data } = useFetch();

  useEffect(() => {
    const data = async () => {
      const datos = await fetch_the_data(
        "http://localhost:8000/tareas/info_tarea",
        null,
        "GET"
      );
      dispatch(setDatos(datos[1]));
    };
    data();
  }, []);
  {
    /*Acá, buscamos el id dentro del reducer, y sí este concide con el id de la tarea obtenido del useParams, entonces mostrará datos especificos de ese contenido */
  }
  const { contenidos_tareas } = useSelector((state) => state.datos_tarea);
  const tareaSeleccionada = contenidos_tareas.find(
    (tarea) => tarea.id === id_tarea
  );

  if (!tareaSeleccionada) {
    return <div>No se encontró la tarea seleccionada.</div>;
  }
  {
    /*FUncion encargada de subir el archivo a la tabla de intermedia de archivos entregables */
  }
  const subir_Archivo_Tarea_estudiante = async (archivo) => {
    const token = sessionStorage.getItem("token");
    const estudiante_id = estudiantes.find((x) => x.id == userInSession.id);
    console.log(estudiante_id);
    const data = await fetch_the_data(
      "http://localhost:8000/tareas/subir_tarea_estudiante",
      token,
      "POST",
      {
        method: "POST",
        files_info: [archivo],
        info_tarea_id: id_tarea,
        estudiante_id: estudiante_id?.estu_id,
      }
    );
    console.log(data);

    dispatch(
      subirArchivosTareasEstudiantes({
        data: {
          id: data[1].archivo_creado[0].id,
          key: data[1].archivo_creado[0].key,
          archivo: archivo.data_archivo,
          nombre: archivo.nombre,
        },
      })
    );
  };
  {
    /*Funcion encargada de leer cada archivo haciendo una instancia del filereader */
  }
  const handleUpload = () => {
    if (!archivoAsignado) {
      Swal.fire("Por favor selecciona al menos un archivo.");
      return;
    }

    selectedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        const archivo_objeto = {
          id: uuid(),
          nombre: file.name,
          data_archivo: reader.result,
        };
        subir_Archivo_Tarea_estudiante(archivo_objeto);
      };
    });
  };
  {
    /*Funcion que se encarga de convertido de tomar el archivo y convertirlo en array  */
  }
  const convertAnArrayArchives = (archives) => {
    const file_array = Array.from(archives);
    setSelectedFiles(file_array);
    setArchivoAsignado(file_array.length > 0);
  };

  return (
    <div className="outer-container">
      <div className="container-c-task">
        <h1 className="title-c-task">Detalles de la Tarea</h1>

        <div>
          <h1 className="section-title">Nombre: {tareaSeleccionada.titulo}</h1>
  
          <p className="section-title">
            Descripción: {tareaSeleccionada.descripcion}
          </p>
        </div>
        <div>
          <p className="section-title">
            Fecha limite de entrega:
            {new Date(tareaSeleccionada.fecha_entrega).toLocaleDateString()}
          </p>
          <Subir_tareas />
        </div>
      </div>
      <div className="tu-trabajo">
        <p className="section-title">Tu trabajo</p>
        <input
          className="upload-section"
          type="file"
          onChange={(e) => convertAnArrayArchives(e.target.files)}
          accept=".pdf"
        />
        <button className="b-t-n-taskUp" onClick={handleUpload}>
          Subir Tarea
        </button>
      </div>
    </div>
  );
};

export default Contenido_tarea;
