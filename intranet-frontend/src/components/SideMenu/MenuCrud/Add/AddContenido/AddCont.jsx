import { useRef, useState } from "react"; // Importa hooks de React
import { pushContenidos } from "../../../../../redux/CursosContenidosSlice"; // Importa una acción de Redux para añadir contenidos
import { useDispatch } from "react-redux"; // Importa el hook useDispatch para despachar acciones
import { useFetch } from "../../../../../services/llamados"; // Importa un hook para realizar llamadas a la API
import { useParams } from "react-router-dom"; // Importa el hook useParams para obtener parámetros de la URL
import { getCookie } from "../../../../../utils/Cookies"; // Importa una función para obtener cookies
import "./AddContent.css"; // Importa estilos CSS
import { TextField } from "@mui/material"; // Importa el componente TextField de Material-UI

export const AddCont = () => {
  const [abrir, setAbrir] = useState(false); // Estado para controlar si el formulario está abierto o cerrado
  const [helperText, setHelper] = useState(""); // Estado para gestionar mensajes de ayuda

  const inputNombre = useRef(); // Referencia para el campo de entrada de nombre
  const form_ref = useRef(); // Referencia para el formulario
  const { id_curso } = useParams(); // Obtiene el ID del curso de los parámetros de la URL

  const { fetch_the_data } = useFetch(); // Hook para realizar llamadas a la API
  const accion = useDispatch(); // Hook para despachar acciones de Redux
  const token = getCookie("token"); // Obtiene el token de autenticación de las cookies

  // Función para manejar la subida del contenido
  const subirContenido = async (o) => {
    o.preventDefault(); // Previene el comportamiento por defecto del formulario
    const nombre_value = inputNombre.current.value.trim(); // Obtiene el valor del input y elimina espacios en blanco
    if (nombre_value != "") { // Verifica que el nombre no esté vacío
      const data = await fetch_the_data(
        "http://localhost:8000/cursos_contenidos/contenidos", // URL de la API
        token, // Token de autenticación
        "POST", // Método HTTP
        {
          nombre: nombre_value, // Nombre del contenido
          curso: id_curso, // ID del curso
        }
      );
      accion(pushContenidos({ ...data[1], subcontenidos: [] })); // Despacha la acción para agregar el contenido al estado
      form_ref.current.reset(); // Resetea el formulario
      return; // Sale de la función
    }
    setHelper("No puedes agregar un contenido en blanco"); // Muestra un mensaje de error
    setTimeout(() => {
      setHelper(""); // Limpia el mensaje de error después de 3 segundos
    }, 3000);
  };

  return (
    <>
      <div
        className={abrir ? "add-cont-retractile-open" : "add-cont-retractile"} // Clase CSS para el contenedor según si está abierto o cerrado
      >
        <div className={"add-cont-btn-area"}> {/* Área del botón para abrir/cerrar el formulario */}
          <button
            onClick={() => {
              abrir ? setAbrir(false) : setAbrir(true); // Alterna el estado de abrir
            }}
            className={abrir ? "add-cont-btn-closed" : "add-cont-btn"} // Clase CSS según el estado
          >
            {abrir ? ( // Cambia el ícono y el texto según el estado
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="30px"
                  viewBox="0 -960 960 960"
                  width="30px"
                  fill="var(--PrymaryContainer-color)"
                >
                  <path d="m274-450 248 248-42 42-320-320 320-320 42 42-248 248h526v60H274Z" />
                </svg>
              </>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="30px"
                viewBox="0 -960 960 960"
                width="30px"
                fill="var(--PrymaryContainer-color)"
              >
                <path d="M450-450H200v-60h250v-250h60v250h250v60H510v250h-60v-250Z" />
              </svg>
            )}
            <p style={{ display: abrir && "none" }}>Agregar</p> {/* Texto que se oculta cuando el formulario está abierto */}
          </button>
        </div>
        <form
          onSubmit={subirContenido} // Maneja el envío del formulario
          className="Add-cont-input-area"
          ref={form_ref} // Referencia para el formulario
        >
          <TextField
            label="Nombre del contenido" // Etiqueta del campo de entrada
            inputRef={inputNombre} // Referencia al campo de entrada
            size="big"
            variant={helperText == "" ? "filled" : "standard"} // Cambia el estilo según si hay un mensaje de ayuda
            sx={{ width: "100%" }} // Estilo de ancho del campo
            helperText={helperText} // Mensaje de ayuda
            error={helperText != ""} // Muestra error si hay un mensaje de ayuda
          />
        </form>
      </div>
    </>
  );
};
