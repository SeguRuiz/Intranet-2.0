import { useSelector } from "react-redux"; // Hook para acceder al estado de Redux
import { useFetch } from "../../services/llamados"; // Hook personalizado para realizar llamadas a servicios
import { useEffect, useLayoutEffect, useState } from "react"; // Hooks de React para efectos y estado
import { CircularProgress } from "@mui/material"; // Componente de carga de Material-UI
import { useDispatch } from "react-redux"; // Hook para despachar acciones de Redux
import { add_archivos_subcontenidos } from "../../redux/CursosContenidosSlice"; // Acción para agregar archivos a subcontendidos
import { useParams } from "react-router-dom"; // Hook para acceder a los parámetros de la URL
import Select_file from "../../assets/Empty/Select_file.svg"; // Imagen de archivo vacío

import "./File_preview.css"; // Importa estilos CSS
import { getCookie } from "../../utils/Cookies"; // Función para obtener cookies

function File_preview() {
  const [archivo, setArchivo] = useState(null); // Estado para almacenar el archivo a mostrar
  const token = getCookie('token'); // Obtiene el token de autenticación de las cookies
  const accion = useDispatch(); // Hook para despachar acciones

  // Obtiene el archivo actualmente mostrado desde el estado de Redux
  const { archivo_mostrandose } = useSelector(
    (state) => state.CursosContenidos
  );
  
  // Hook personalizado para manejar la obtención de datos
  const { fetch_the_data, fetching } = useFetch();
  
  // Obtiene los subcontenidos y contenidos del estado de Redux
  const { Arhivos_subcontenidos, Contenidos } = useSelector(
    (state) => state.CursosContenidos
  );

  // Función para obtener el archivo desde el servidor
  const fetch_archivo = async () => {
    const data = await fetch_the_data(
      "http://localhost:8000/files/get_archivo",
      token,
      "POST",
      {
        archivo: archivo_mostrandose.archivo, // Envía el archivo a buscar
      }
    );
    console.log(data);
    setArchivo(data[1].archivo); // Establece el archivo obtenido en el estado
    accion(
      add_archivos_subcontenidos({
        subcontenido_id: archivo_mostrandose.subcontenido,
        contenido_id: archivo_mostrandose.contenido,
        data: {
          id: archivo_mostrandose.archivo,
          archivo: data[1].archivo,
        },
      })
    ); // Agrega el archivo a los subcontenidos en el estado de Redux
  };

  // Efecto para buscar el archivo cuando el archivo mostrado cambia
  useLayoutEffect(() => {
    (async () => {
      const archivo_encontrado =
        Arhivos_subcontenidos.find(
          (e) => e.id == archivo_mostrandose?.archivo
        ) ?? false; // Verifica si el archivo ya se encuentra en los subcontenidos

      archivo_encontrado != false
        ? setArchivo(archivo_encontrado?.archivo) // Si se encuentra, establece el archivo
        : setArchivo(null); // De lo contrario, establece archivo como null

      // Si hay un archivo seleccionado que no se ha encontrado, lo busca
      if (archivo_mostrandose?.archivo != null && archivo_encontrado == false) {
        fetch_archivo();
      }
    })();
  }, [archivo_mostrandose]); // Efecto se ejecuta cuando cambia archivo_mostrandose

  // Efecto para establecer archivo como null si no está disponible en el contenido
  useLayoutEffect(() => {
    if (archivo_mostrandose != null) {
      Contenidos.forEach((e) => {
        if (e.id == archivo_mostrandose.contenido) {
          e.subcontenidos.forEach((e) => {
            if (e.id == archivo_mostrandose.subcontenido && e.archivo == null) {
              setArchivo(null); // Establece archivo como null si no existe
            }
          });
        }
      });
    }
  }, [Contenidos, archivo_mostrandose]); // Efecto se ejecuta cuando cambian Contenidos o archivo_mostrandose

  return (
    <>
      {!fetching && archivo == null ? ( // Muestra imagen si no hay archivo y no se está cargando
        <>
          <img src={Select_file} alt="" className="empty-file-content" />
        </>
      ) : fetching ? ( // Muestra cargador mientras se obtiene el archivo
        <CircularProgress />
      ) : (
        <div className="file-container">
          <iframe src={archivo} className="file-iframe"></iframe> {/* Muestra el archivo en un iframe */}
        </div>
      )}
    </>
  );
}

export default File_preview; // Exporta el componente para su uso en otras partes de la aplicación
