import { MenuItem, Input, Backdrop, CircularProgress } from "@mui/material"; // Importa componentes de Material UI
import uuid from "react-uuid"; // Generador de IDs únicos
import { useRef, useState } from "react"; // Hooks de React
import { useFetch } from "../../../../services/llamados"; // Hook para manejar solicitudes HTTP
import { getCookie } from "../../../../utils/Cookies"; // Función para obtener cookies
import { useDispatch } from "react-redux"; // Hook para despachar acciones a Redux
import { agregar_archivo_reportes } from "../../../../redux/ControlUsuariosSlice"; // Acción para agregar archivos a reportes
import { useCustomNotis } from "../../../../utils/customHooks"; // Hook para manejar notificaciones personalizadas

const Add_file_Report = ({ reporte_id }) => {
  const file_ref = useRef(); // Referencia para el input de archivos
  const { fetch_the_data } = useFetch(); // Hook para realizar solicitudes HTTP
  const { ok_mensaje, error_mensaje } = useCustomNotis( // Mensajes de éxito y error
    "Ocurrio un error",
    "Se agrego el comprobante"
  );

  const [open, setOpen] = useState(false); // Controla la apertura del Backdrop durante la carga
  const accion = useDispatch(); // Inicializa el despachador de Redux
  const token = getCookie("token"); // Obtiene el token de autenticación

  const agregar_archivo = async (archivos) => {
    // Función para agregar archivos al reporte
    setOpen(true); // Abre el Backdrop de carga
    const data = await fetch_the_data(
      "http://localhost:8000/files/guardar_reporte",
      token,
      "POST",
      {
        reporte_id: reporte_id, // ID del reporte al que se agrega el archivo
        file: {
          method: "POST",
          files_info: [archivos], // Información del archivo a subir
        },
      }
    );

    // Manejo de respuesta después de subir el archivo
    if (data[0] == 200 && data != undefined) {
      // Si la subida fue exitosa
      accion(agregar_archivo_reportes({ reporte_id: reporte_id, archivo_id: data[1].archivo_id })); // Agrega el archivo al estado de Redux
      setOpen(false); // Cierra el Backdrop
      ok_mensaje(); // Mensaje de éxito
    } else {
      error_mensaje(); // Mensaje de error si la subida falla
      setOpen(false); // Cierra el Backdrop
    }
  };

  const convertAnArrayArchives = (Archives) => {
    // Función para convertir un array de archivos
    const file_array = Array.from(Archives); // Convierte el objeto de archivos en un array

    file_array.forEach((e) => {
      const reader = new FileReader(); // Crea un nuevo FileReader para leer el archivo

      reader.readAsDataURL(e); // Lee el archivo como una URL de datos

      reader.addEventListener("load", () => {
        // Evento que se activa cuando se ha leído el archivo
        const id_archivo = uuid(); // Genera un ID único para el archivo

        const archivo_objeto = {
          id: id_archivo, // Asigna el ID único
          nombre: e.name, // Nombre del archivo
          data_archivo: reader.result, // Datos del archivo leído
        };
        agregar_archivo(archivo_objeto); // Llama a la función para agregar el archivo
      });
    });
  };

  return (
    <>
      <MenuItem
        onClick={() => {
          file_ref.current.click(); // Simula un clic en el input de archivo
        }}
      >
        Agregar comprobante
      </MenuItem>
      <Input
        type="file" // Tipo de input para archivos
        style={{ display: "none" }} // Oculta el input
        inputRef={file_ref} // Referencia al input de archivo
        onChange={(x) => {
          convertAnArrayArchives(x.target.files); // Convierte y procesa los archivos seleccionados
        }}
      />
      <Backdrop open={open}> 
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default Add_file_Report; // Exporta el componente
