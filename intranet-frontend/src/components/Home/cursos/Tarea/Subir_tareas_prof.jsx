import React, { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import { useFetch } from "../../../../services/llamados";
import { useParams } from "react-router-dom";
import { getCookie } from "../../../../utils/Cookies";
import { useDispatch, useSelector } from "react-redux";
import uuid from "react-uuid";
import { subirArchivosTareas } from "../../../../redux/ObtenerDatosTareaSlice";
import BorrarArchivoTarea from "./BorrarArchivoTarea";
import { set_usuarios_del_grupo } from "../../../../redux/CursosContenidosSlice";
import { DecodeToken } from "../../../../services/llamados";
import "./Contenido_tarea.css";
import { IconButton } from "@mui/material";
import { Divider } from "@mui/material";
import { useCustomModal } from "../../../../utils/customHooks";
import { Backdrop, CircularProgress } from "@mui/material";

const Subir_tareas = ({ contenido_id }) => {
  const { fetch_the_data } = useFetch();
  const { id_tarea } = useParams();
  const modal_ref = useRef();
  const { estudiantes, grupo_mostrandose } = useSelector(
    (x) => x.CursosContenidos
  );
  const { userInSession } = useSelector((x) => x.Auth);
  const { openModal, closeModalDlg, closeModal } = useCustomModal(modal_ref);
  console.log(id_tarea);

  const token = getCookie("token");
  const file_ref = useRef();
  const dispatch = useDispatch();
  const [archivoAsinado, setArchivoAsignado] = useState(false);
  const [archivo_key, setArchivo_key] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [archivoSubido, setArchivoSubido] = useState(null); // Estado para almacenar los archivos subidos
  const [selectedArchivo, setSelectedArchivo] = useState(null); // Estado para seleccionar archivo
  const [fetching_file, set_fetching_file] = useState(false);
  const { tareas_asignadas } = useSelector((state) => state.datos_tarea);

  const subirArchivoTarea = async (archivo) => {
    set_fetching_file(true);
    const data = await fetch_the_data(
      "https://intranet-2-0-api.onrender.com/tareas/guardar_archivo_tarea",
      token,
      "POST",
      { method: "POST", files_info: [archivo], id: id_tarea }
    );

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

    obtenerArchivosSubidos(); // Volvemos a cargar la lista de archivos subido
    set_fetching_file(false);
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

    setSelectedFiles([]);
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
      "https://intranet-2-0-api.onrender.com/tareas/mostrar_archivo",
      token,
      "POST",
      { info_tarea_id: id_tarea }
    );
    setArchivoSubido(data[1][0]); // Guardamos los archivos en el estado
    console.log(data);
  };

  const obtenerTarea = async (archivo) => {
    set_fetching_file(true);
    try {
      const data = await fetch_the_data(
        "https://intranet-2-0-api.onrender.com/tareas/obtener_archivo_tarea",
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
        set_fetching_file(false);
        openModal();
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

  useEffect(() => {
    (async () => {
      const data = await fetch_the_data(
        "https://intranet-2-0-api.onrender.com/cursos/get_usuarios_grupo",
        token,
        "POST",
        {
          usuario_id: DecodeToken(token).user_id,
          grupo_id:
            grupo_mostrandose == null ? "sin definir" : grupo_mostrandose,
        }
      );
      console.log(data);

      if ((await data[0]) == 200) {
        dispatch(
          set_usuarios_del_grupo({
            rol: "estudiantes",
            data: data[1]?.estudiantes,
          })
        );
        dispatch(
          set_usuarios_del_grupo({
            rol: "profesores",
            data: data[1]?.profesores,
          })
        );
      }
    })();
  }, [grupo_mostrandose]);

  return (
    <div className="visualizar-archivo-tarea">
      <input
        type="file"
        style={{ display: "none" }}
        ref={file_ref}
        onChange={(e) => convertAnArrayArchives(e.target.files)}
        accept=".pdf"
      />

      {/* <button onClick={handleUpload}>Subir archivo</button> */}

      {/* Mostrar solo el archivo más reciente */}
      <div className="tarea-file-prev-cont">
        {archivoSubido ? (
          <>
            <div className="tarea-file-prev">
              <div
                onClick={(e) => {
                  e.preventDefault();
                  obtenerTarea(archivoSubido);
                }}
                className="file-submited"
              >
                <div className="pdf-file-prev">
                  <strong>PDF</strong>
                </div>
                <div className="tarea-file-text">
                  <p
                    style={{
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      maxWidth: "90%",
                    }}
                  >
                    {archivoSubido?.nombre}
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="tarea-file-prev">
            <div className="file-submited-emp">
              <div className="pdf-file-prev-emp">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="48px"
                  viewBox="0 -960 960 960"
                  width="48px"
                  fill="var(--OnSecondary-color)"
                >
                  <path d="M220-80q-24 0-42-18t-18-42v-680q0-24 18-42t42-18h361l219 219v521q0 24-18 42t-42 18H220Zm331-554v-186H220v680h520v-494H551ZM220-820v186-186 680-680Z" />
                </svg>
              </div>
              <div className="tarea-file-text">
                <strong
                  style={{
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    maxWidth: "90%",
                  }}
                >
                  Sin archivo
                </strong>
              </div>
            </div>
          </div>
        )}
        <div
          className="tarea-prev-opions"
          style={{ display: !userInSession?.is_staff ? "none" : "block" }}
        >
          <IconButton
            onClick={() => {
              file_ref.current.click();
            }}
            disabled={selectedFiles[0] != undefined || archivoSubido}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="25px"
              viewBox="0 -960 960 960"
              width="25px"
              fill="var(--OnsurfaceVariant)"
              style={{
                opacity:
                  selectedFiles[0] != undefined || archivoSubido ? 0.3 : 1,
              }}
            >
              <path d="M728-326q0 103-72.18 174.5-72.17 71.5-175 71.5Q378-80 305.5-151.5T233-326v-380q0-72.5 51.5-123.25T408-880q72 0 123.5 50.75T583-706v360q0 42-30 72t-72.5 30q-42.5 0-72.5-29.67-30-29.68-30-72.33v-370h60v370q0 17 12.5 29.5t30.64 12.5q18.14 0 30-12.5T523-346v-360q0-48-33.5-81t-81.71-33q-48.21 0-81.5 33.06T293-706v380q0 78 54.97 132T481-140q77.92 0 132.46-54Q668-248 668-326v-390h60v390Z" />
            </svg>
          </IconButton>

          <IconButton
            onClick={handleUpload}
            disabled={selectedFiles[0] == undefined || archivoSubido}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="25px"
              viewBox="0 -960 960 960"
              width="25px"
              fill="var(--OnsurfaceVariant)"
              style={{
                opacity:
                  selectedFiles[0] == undefined || archivoSubido ? 0.3 : 1,
              }}
            >
              <path d="M450-160v-371L330-411l-43-43 193-193 193 193-43 43-120-120v371h-60ZM160-597v-143q0-24 18-42t42-18h520q24 0 42 18t18 42v143h-60v-143H220v143h-60Z" />
            </svg>
          </IconButton>

          {archivoSubido && <BorrarArchivoTarea id={archivoSubido.id} />}
        </div>
      </div>

      {/* Mostrar el contenido del archivo seleccionado */}

      <dialog
        style={{ margin: "auto" }}
        ref={modal_ref}
        onClick={closeModalDlg}
        className="modal-info-tarea"
      >
        <iframe
          src={selectedArchivo?.contenido}
          width="100%"
          height="600px"
          title={selectedArchivo?.nombre}
        />
      </dialog>
      <Backdrop open={fetching_file}>
        <CircularProgress />
      </Backdrop>
    </div>
  );
};

export default Subir_tareas;
