import {
  MenuItem,
  Input,
  Backdrop,
  CircularProgress,
  ListItemText,
  ListItemIcon,
} from "@mui/material"; // Importa componentes de Material UI// Generador de IDs únicos
import { useRef, useState } from "react"; // Hooks de React
import { useFetch } from "../../../../services/llamados"; // Hook para manejar solicitudes HTTP
import { getCookie } from "../../../../utils/Cookies"; // Función para obtener cookies
import { useDispatch } from "react-redux"; // Hook para despachar acciones a Redux
import { agregar_archivo_reportes } from "../../../../redux/ControlUsuariosSlice"; // Acción para agregar archivos a reportes
import { useCustomNotis } from "../../../../utils/customHooks"; // Hook para manejar notificaciones personalizadas
import FileUploadIcon from "@mui/icons-material/FileUpload";
const Add_file_Report = ({ reporte_id }) => {
  const file_ref = useRef(); // Referencia para el input de archivos
  const { fetch_the_data } = useFetch(); // Hook para realizar solicitudes HTTP
  const { ok_mensaje, error_mensaje } = useCustomNotis(
    // Mensajes de éxito y error
    "Ocurrio un error",
    "Se agrego el comprobante"
  );

  const [open, setOpen] = useState(false); // Controla la apertura del Backdrop durante la carga
  const accion = useDispatch(); // Inicializa el despachador de Redux
  const token = getCookie("token"); // Obtiene el token de autenticación

  const agregar_archivo = async (file) => {
    // Función para agregar archivos al reporte
    const formDataReporte = new FormData();
    formDataReporte.append("file", file);
    formDataReporte.append("reporte_id", reporte_id);

    setOpen(true); // Abre el Backdrop de carga
    const data = await fetch_the_data(
      "http://localhost:8000/reportes/guardar_archivo_reporte",
      token,
      "POST",
      null,
      "",
      formDataReporte
    );

    // Manejo de respuesta después de subir el archivo
    if (data[0] == 200 && data != undefined) {
      // Si la subida fue exitosa
      console.log(data[1]);

      accion(
        agregar_archivo_reportes({
          reporte_id: reporte_id,
          archivo_id: data[1].archivo_id,
        })
      ); // Agrega el archivo al estado de Redux // Cierra el Backdrop
      ok_mensaje(); // Mensaje de éxito
    } else {
      error_mensaje(); // Mensaje de error si la subida falla
    }
    setOpen(false); // Cierra el Backdrop
    file_ref.current.value = null;
  };

  const handleChange = (file) => {
    if (file) {
      agregar_archivo(file);
    }
  };

  return (
    <>
      <MenuItem
        onClick={() => {
          file_ref.current.click(); // Simula un clic en el input de archivo
        }}
      >
         <ListItemIcon>
          <FileUploadIcon
            sx={{ color: "var(--OnsurfaceVariant)" }}
            fontSize="10px"
          />
        </ListItemIcon>
        <ListItemText primary="Agregar comprobante" />
       
      </MenuItem>
      <Input
        type="file" // Tipo de input para archivos
        style={{ display: "none" }} // Oculta el input
        inputRef={file_ref} // Referencia al input de archivo
        onChange={(x) => {
          handleChange(x.target.files[0]); // Convierte y procesa los archivos seleccionados
        }}
      />
      <Backdrop open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default Add_file_Report; // Exporta el componente
