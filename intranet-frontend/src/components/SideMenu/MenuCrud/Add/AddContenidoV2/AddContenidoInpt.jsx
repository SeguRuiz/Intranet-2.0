import { TextField, ListItem, ListItemIcon } from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import { useRef } from "react";
import { useEffect } from "react";
import { getCookie } from "../../../../../utils/Cookies";
import { pushContenidos } from "../../../../../redux/CursosContenidosSlice";
import { useFetch } from "../../../../../services/llamados";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
const AddContenidoInpt = ({ setAdding }) => {
  const inpt_ref = useRef(null);
  const form_ref = useRef(null);
  const token = getCookie("token");
  const { id_curso } = useParams();
  const accion = useDispatch();
  const { fetch_the_data } = useFetch();

  useEffect(() => {
    if (inpt_ref.current) {
      inpt_ref.current.focus();
    }
  }, []);

  const subirContenido = async (o) => {
    o.preventDefault(); // Previene el comportamiento por defecto del formulario
    const nombre_value = inpt_ref.current.value.trim(); // Obtiene el valor del input y elimina espacios en blanco
    if (nombre_value != "") {
      // Verifica que el nombre no esté vacío
      const data = await fetch_the_data(
        "https://intranet-2-0-api.onrender.com/cursos_contenidos/contenidos", // URL de la API
        token, // Token de autenticación
        "POST", // Método HTTP
        {
          nombre: nombre_value, // Nombre del contenido
          curso: id_curso, // ID del curso
        }
      );
      accion(pushContenidos({ ...data[1], subcontenidos: [] }));
      form_ref.current.reset();
      setAdding(false);
      return;
    }
  };
  return (
    <>
      <ListItem>
        <ListItemIcon>
          <FolderIcon sx={{ color: "var(--OnPrymary-color)" }} />
        </ListItemIcon>
        <form ref={form_ref} onSubmit={subirContenido}>
          <TextField
            size="small"
            inputRef={inpt_ref}
            placeholder="Nombra tu carpeta"
            fullWidth
            sx={{
              "& .MuiInputBase-input": {
                color: "var(--OnPrymary-color)", // Text color
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "var(--PrymaryContainer-color)", // Default border color
                },
                "&:hover fieldset": {
                  borderColor: "var(--PrymaryContainer-color)", // Hover border color
                },
                "&.Mui-focused fieldset": {
                  borderColor: "var(--PrymaryContainer-color)", // Focused border color
                },
                padding: "0px",
                "& .MuiInputBase-input": {
                  padding: "12px 1.5px", // Padding for the input text
                }, // Padding inside the input container
              },
            }}
          />
        </form>
      </ListItem>
    </>
  );
};

export default AddContenidoInpt;
