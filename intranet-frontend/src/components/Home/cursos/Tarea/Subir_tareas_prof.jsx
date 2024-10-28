import React, { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import { useFetch } from "../../../../services/llamados";
import { useParams } from "react-router-dom";
import { getCookie } from "../../../../utils/Cookies";
import { useDispatch, useSelector } from "react-redux";
import uuid from "react-uuid";
import { subirArchivosTareas } from "../../../../redux/ObtenerDatosTareaSlice";
import BorrarArchivoTarea from "./BorrarArchivoTarea";

const Subir_tareas = ({ id, contenido_id, archivo }) => {
  const { fetch_the_data } = useFetch();
  const { id_tarea } = useParams();
  const token = getCookie("token");
  const file_ref = useRef();
  const dispatch = useDispatch();
  const [archivoAsinado, setArchivoAsignado] = useState(false);
  const [archivo_key, setArchivo_key] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [archivoSubido, setArchivoSubido] = useState(null); // Estado para almacenar los archivos subidos
  const [selectedArchivo, setSelectedArchivo] = useState(null); // Estado para seleccionar archivo
  const { tareas_asignadas } = useSelector((state) => state.datos_tarea);

  const subirArchivoTarea = async (archivo) => {
    const data = await fetch_the_data(
      "http://localhost:8000/info_tareas/guardar_archivo_tarea",
      token,
      "POST",
      { method: "POST", files_info: [archivo] }
    );
    console.log(archivo);
    dispatch(
      subirArchivosTareas({
        data: {
          id: data[1].archivo_creado[0].id,
          key: data[1].archivo_creado[0].key,
          archivo: archivo.data_archivo,
          nombre: archivo.nombre,
        },
      })
    );
    console.log(data[1]);
    obtenerArchivosSubidos(); // Volvemos a cargar la lista de archivos subidos
  };

  const handleUpload = () => {
    if (!archivoAsinado) {
      Swal.fire("Por favor selecciona al menos un archivo.");
      return;
    }

    selectedFiles.forEach((e) => {
      const reader = new FileReader();

      reader.readAsDataURL(e);

      reader.addEventListener("load", () => {
        const id_archivo = uuid();

        const archivo_objeto = {
          id: id_archivo,
          nombre: e.name,
          data_archivo: reader.result,
        };
        subirArchivoTarea(archivo_objeto);
      });
    });
  };

  const convertAnArrayArchives = (Archives) => {
    const file_array = Array.from(Archives);

    setSelectedFiles(file_array);

    if (file_array.length > 0) {
      setArchivoAsignado(true);
    }
  };

  // Función para obtener los archivos subidos de la tarea
  const obtenerArchivosSubidos = async () => {
    const data = await fetch_the_data(
      "http://localhost:8000/info_tareas/guardar_archivo_tarea",
      token,
      "GET"
    );
    setArchivoSubido(data[1][0]); // Guardamos los archivos en el estado
    console.log(data);
  };

  const obtenerTarea = async (archivo) => {
    try {
      const data = await fetch_the_data(
        "http://localhost:8000/info_tareas/obtener_archivo_tarea",
        token,
        "POST",
        { method: "GET", archivo: archivo }
      );

      if (data && data[1] && data[1].archivo) {
        console.log("Contenido del archivo:", data[1].archivo); // Verificar contenido
        setSelectedArchivo({
          ...archivo,
          contenido: data[1].archivo, // Aquí asumimos que el contenido está en `data.archivo`
        });
      } else {
        console.log("No se pudo obtener el contenido del archivo.");
      }
    } catch (error) {
      console.error("Error en obtenerTarea:", error);
    }
  };

  console.log("Selected archivo:", selectedArchivo);

  useEffect(() => {
    obtenerArchivosSubidos(); // Llamamos a la función para obtener los archivos subidos cuando se monta el componente

    tareas_asignadas.forEach((e) => {
      if (e.id == contenido_id) {
        setArchivo_key(e.archivo);
        setArchivoAsignado(true);
      }
    });
  }, [tareas_asignadas, contenido_id]);

  useEffect(() => {
    console.log("selectedArchivo:", selectedArchivo);
  }, [selectedArchivo]);

  return (
    <div>
      <input
        type="file"
        style={{ marginBottom: "10px" }}
        ref={file_ref}
        onChange={(e) => convertAnArrayArchives(e.target.files)}
        accept=".pdf"
      />
      <button onClick={handleUpload}>Subir archivo</button>

      {/* Mostrar solo el archivo más reciente */}
      <div style={{ marginTop: "20px" }}>
        <h3>Tarea Asignada</h3>
        {archivoSubido ? (
          <div
            onClick={(e) => {
              e.preventDefault();
              obtenerTarea(archivoSubido);
            }}
          >
            {archivoSubido.nombre}
            <BorrarArchivoTarea id={archivoSubido.id} />
          </div>
        ) : (
          <p>No hay archivos subidos.</p>
        )}
      </div>

      {/* Mostrar el contenido del archivo seleccionado */}
      {selectedArchivo && selectedArchivo.contenido && (
        <div style={{ marginTop: "20px" }}>
          <h4>Visualizando: {selectedArchivo.nombre}</h4>
          <iframe
            src={selectedArchivo.contenido}
            width="100%"
            height="600px"
            title={selectedArchivo.nombre}
          />
        </div>
      )}
    </div>
  );
};

export default Subir_tareas;
