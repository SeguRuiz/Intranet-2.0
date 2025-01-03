import { useSelector } from "react-redux"; // Hook para acceder al estado de Redux
import { useFetch } from "../../services/llamados"; // Hook personalizado para realizar llamadas a servicios
import { useEffect, useLayoutEffect, useState } from "react"; // Hooks de React para efectos y estado
import { Paper } from "@mui/material"; // Componente de carga de Material-UI
import { useDispatch } from "react-redux"; // Hook para despachar acciones de Redux
import {
  add_archivos_subcontenidos,
  set_fetching_archivo,
} from "../../redux/CursosContenidosSlice"; // Acción para agregar archivos a subcontendidos
import Select_file from "../../assets/Empty/Select_file.svg"; // Imagen de archivo vacío
import { useCustomNotis } from "../../utils/customHooks";
import "./File_preview.css"; // Importa estilos CSS
import { getCookie } from "../../utils/Cookies"; // Función para obtener cookies
import { Skeleton, LinearProgress } from "@mui/material";

function File_preview() {
  const [archivo, setArchivo] = useState(null); // Estado para almacenar el archivo a mostrar
  const token = getCookie("token"); // Obtiene el token de autenticación de las cookies
  const accion = useDispatch(); // Hook para despachar acciones
  const { error_mensaje } = useCustomNotis();
  const { userInSession } = useSelector((x) => x.Auth);

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
  const fetch_archivo = async (action = "add", archivo_id) => {
    accion(set_fetching_archivo(true));
    const data = await fetch_the_data(
      "http://localhost:8000/files/obtener_archivo_from_google_cloud",
      token,
      "POST",
      {
        archivo_id: archivo_id, // Envía el archivo a buscar
      }
    );
    accion(set_fetching_archivo(false));

    if (data[0] == 200) {
      archivo_id == archivo_mostrandose.archivo && setArchivo(data[1].archivo); // Establece el archivo obtenido en el estado
      accion(
        add_archivos_subcontenidos({
          subcontenido_id: archivo_mostrandose.subcontenido,
          contenido_id: archivo_mostrandose.contenido,
          data: {
            id: archivo_mostrandose.archivo,
            archivo: data[1].archivo,
            nombre: data[1].nombre,
            expira_en: data[1].expira_en,
          },
          action_file: action,
        })
      ); //
    } else {
      error_mensaje("Ocurrio un eror al mostrar el archivo");
    }
  };

  // Efecto para buscar el archivo cuando el archivo mostrado cambia
  useEffect(() => {
    (async () => {
      const archivo_encontrado =
        Arhivos_subcontenidos.find(
          (e) => e.id == archivo_mostrandose?.archivo
        ) ?? false; // Verifica si el archivo ya se encuentra en los subcontenidos

      archivo_encontrado != false
        ? setArchivo(archivo_encontrado.archivo) // Si se encuentra, establece el archivo
        : setArchivo(null); // De lo contrario, establece archivo como null

      // Si hay un archivo seleccionado que no se ha encontrado, lo busca

      if (archivo_encontrado != false) {
        const currentDate = new Date();
        const fecha_expiracion = new Date(archivo_encontrado?.expira_en);

        if (fecha_expiracion < currentDate) {
          fetch_archivo("reset", archivo_mostrandose.archivo);
        }
      }

      
      if (archivo_mostrandose?.archivo != null && archivo_encontrado == false) {
        fetch_archivo("add", archivo_mostrandose.archivo);
      }
    })();
  }, [archivo_mostrandose]); // Efecto se ejecuta cuando cambia archivo_mostrandose

  // Efecto para establecer archivo como null si no está disponible en el contenido
  useLayoutEffect(() => {
    if (archivo_mostrandose) {
      const contenido = Contenidos.find(
        (c) => c.id === archivo_mostrandose.contenido
      );
      if (contenido) {
        const subcontenido = contenido.subcontenidos.find(
          (sc) => sc.id === archivo_mostrandose.subcontenido
        );
        if (subcontenido) {
          if (!subcontenido.archivo) {
            setArchivo(null);
          } else {
            const archivo_encontrado =
              Arhivos_subcontenidos.find(
                (a) => a.id === subcontenido.archivo
              ) || false;
            if (archivo_encontrado) {
              setArchivo(archivo_encontrado.archivo);
            }
          }
        }
      }
    }
  }, [Contenidos, archivo_mostrandose]); // Efecto se ejecuta cuando cambian Contenidos o archivo_mostrandose

  return (
    <>
      {!fetching && archivo == null ? ( // Muestra imagen si no hay archivo y no se está cargando
        <>
          <img src={Select_file} alt="" className="empty-file-content" />
        </>
      ) : fetching ? (
        <>
          <Paper sx={{ width: "100%", height: "100%" }}>
            <LinearProgress
              sx={{
                backgroundColor: "var(--PrymaryContainer-color)", // Background color of the bar
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "var(--SecondaryContainer-color)", // Color of the progress indicator
                },
              }}
            />
            <Skeleton
              variant="rectangular"
              animation="wave"
              width={"100%"}
              height={"99.2%"}
              sx={{ bgcolor: "#525659" }}
            ></Skeleton>
          </Paper>
        </>
      ) : (
        <div className="file-container">
          <iframe
            src={`${userInSession.is_staff ? archivo : archivo + "#toolbar=0"}`}
            className="file-iframe"
          ></iframe>
        </div>
      )}
    </>
  );
}

export default File_preview; // Exporta el componente para su uso en otras partes de la aplicación
