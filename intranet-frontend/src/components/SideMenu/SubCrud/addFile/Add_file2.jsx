import "./addFile.css";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { add_archivos_subcontenidos } from "../../../../redux/CursosContenidosSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useFetch } from "../../../../services/llamados";
import DeleteFile from "./deleteFile/DeleteFile";
import { getCookie } from "../../../../utils/Cookies";
import { toast } from "react-toastify";
import {
  ListItemIcon,
  MenuItem,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";

const Add_file2 = ({ id, contenido_id, archivo , disabled = false}) => {
  const advertencia_subiendo_archivo = (
    advertencia = "Advertencia subiendo archivo"
  ) => toast.warning(advertencia);
  const error_subiendo_archivo = (error = "Error subiendo archivo") =>
    toast.error(error);
  const file_ref = useRef();
  const [archivoAsinado, setAcrhivoAsignado] = useState(false);
  const token = getCookie("token");
  const { fetching, fetch_the_data } = useFetch();
  const { Arhivos_subcontenidos, Contenidos } = useSelector(
    (state) => state.CursosContenidos
  );
  const accion = useDispatch();

  const subirArchivo = async (archivo) => {
    const formData = new FormData();
    formData.append("file", archivo);
    formData.append("subContent_id", id);

    const file_type = archivo.type.split("/")[1];

    if (file_type != "pdf") {
      error_subiendo_archivo("Solo se permiten archivos PDF");
      
      return;
    }

    const data = await fetch_the_data(
      "http://localhost:8000/files/guardar_archivo_de_subcontenidos_a_cloud",
      token,
      "POST",
      null,
      "",
      formData
    );

    switch (data[0]) {
      case 200:
        accion(
          add_archivos_subcontenidos({
            subcontenido_id: id,
            contenido_id: contenido_id,
            data: {
              id: data[1].id,
              archivo: data[1].url,
              nombre: data[1].nombre,
              expira_en: data[1].expira_en,
            },
            action_file: "add",
          })
        );
        break;
      case 406:
        error_subiendo_archivo("Solo se permiten archivos PDF");
        break;
      case 422:
        advertencia_subiendo_archivo(
          "El archivo ya existe, por favor sube uno que no hayas subido antes"
        );
        break;
      default:
        error_subiendo_archivo("Ocurrio un eror al subir el archivo");
        break;
    }
  };

  const handleChange = (file) => {
    if (file) {
      subirArchivo(file);
    }
  };

  const seleccionarArchivo = () => {
    if (!archivoAsinado) {
      file_ref.current.click();
      return;
    }
  };

  useEffect(() => {
    Contenidos.forEach((e) => {
      if (e.id == contenido_id) {
        e.subcontenidos.forEach((e) => {
          if (e.id == id && e.archivo != null) {
            setAcrhivoAsignado(true);
          }
        });
      }
    });
  }, [Contenidos, Arhivos_subcontenidos]);

  return (
    <>
      <input
        type="file"
        id="file"
        className="file_inp"
        ref={file_ref}
        onChange={(e) => {
          handleChange(e.target.files[0]);
        }}
        accept=".pdf"
      />

      {archivoAsinado ? (
        <DeleteFile
          id={id}
          contenido_id={contenido_id}
          archivo_key={archivo}
          set={setAcrhivoAsignado}
        />
      ) : (
        <MenuItem
          onClick={() => {
            seleccionarArchivo();
            file_ref.current.value = null;
          }}
          disabled={fetching || disabled}
        >
          <ListItemIcon>
            {fetching ? (
              <CircularProgress size={20} color="var(--OnsurfaceVariant)" />
            ) : (
              <UploadFileIcon sx={{ color: "var(--OnsurfaceVariant)" }} />
            )}
          </ListItemIcon>
          <ListItemText
            primary={fetching ? "Subiendo..." : "adjuntar archivo"}
          />
        </MenuItem>
      )}
    </>
  );
};

export default Add_file2;
