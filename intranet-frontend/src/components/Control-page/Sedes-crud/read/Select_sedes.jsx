import "./Read_sedes.css"; // Importa el archivo de estilos CSS
import { useCustomSelection } from "../../../../utils/customHooks"; // Hook personalizado para manejar la selección
import { useSelector } from "react-redux"; // Hook para acceder al estado de Redux
import {
  agregar_a_seleccion_multiple_sedes,
  eliminar_de_seleccion_multiple_sedes,
} from "../../../../redux/ControlUsuariosSlice"; // Acciones de Redux para manejar la selección de sedes
import { stringToColor } from "../../../../utils/Utils"; // Función para generar un color a partir de una cadena

const Select_sedes = ({ nombre, ubicacion, sede_id }) => {
  // Obtiene el estado de selección desde Redux
  const { seleccion_multiple_activado_sedes } = useSelector(
    (e) => e.ControlUsuarios
  );

  // Usa el hook personalizado para manejar la selección
  const { selected, click_Checkbox } = useCustomSelection(
    eliminar_de_seleccion_multiple_sedes,
    agregar_a_seleccion_multiple_sedes,
    { sede_id }, // Pasa el ID de la sede como parte del objeto de selección
    seleccion_multiple_activado_sedes
  );

  return (
    <div
      className={
        seleccion_multiple_activado_sedes && !selected
          ? "read-sedes-container-animated" // Clase cuando se activa la selección pero no está seleccionada
          : selected && seleccion_multiple_activado_sedes
          ? "read-sedes-container-selected" // Clase cuando está seleccionada
          : "read-sedes-container" // Clase por defecto
      }
      onClick={click_Checkbox} // Llama a la función click_Checkbox al hacer clic en el contenedor
    >
      <div
        className="read-sedes-img"
        style={{ backgroundColor: stringToColor(nombre) }} // Establece un color de fondo basado en el nombre de la sede
      >
        {seleccion_multiple_activado_sedes && (
          <div
            className={
              seleccion_multiple_activado_sedes && selected
                ? "chekbox-sedes-selected" // Clase cuando el checkbox está seleccionado
                : "chekbox-sedes" // Clase por defecto del checkbox
            }
          >
            {seleccion_multiple_activado_sedes && selected && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="48px"
                viewBox="0 -960 960 960"
                width="80px"
                fill="#ffff" // Color del icono del checkbox seleccionado
              >
                <path d="M378-246 154-470l43-43 181 181 384-384 43 43-427 427Z" />
              </svg>
            )}
          </div>
        )}

        {/* Icono de la sede cuando la selección múltiple no está activada */}
        {!seleccion_multiple_activado_sedes && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="100px"
            viewBox="0 -960 960 960"
            width="100px"
            fill="var(--OnPrymary-color)" // Color del icono
          >
            <path d="M80-120v-720h390v165h410v555H80Zm60-60h270v-105H140v105Zm0-165h270v-105H140v105Zm0-165h270v-105H140v105Zm0-165h270v-105H140v105Zm330 495h350v-435H470v435Zm80-270v-60h165v60H550Zm0 165v-60h165v60H550Z" />
          </svg>
        )}
      </div>

      <div className="read-sedes-info">
        <div className="read-sedes-nombre">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="var(--OnsurfaceVariant)" // Color del icono del nombre
          >
            <path d="M120-120v-560h240v-80l120-120 120 120v240h240v400H120Zm80-80h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm240 320h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm240 480h80v-80h-80v80Zm0-160h80v-80h-80v80Z" />
          </svg>
          <p
            style={{
              whiteSpace: "nowrap", // Evita que el texto se divida en varias líneas
              textOverflow: "ellipsis", // Agrega puntos suspensivos si el texto es demasiado largo
              overflow: "hidden", // Oculta el desbordamiento
              maxWidth: "165px", // Establece un ancho máximo
            }}
          >
            {nombre}
          </p>
        </div>
        <div className="read-sedes-ubicacion">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="var(--OnsurfaceVariant)" // Color del icono de la ubicación
          >
            <path d="M516-120 402-402 120-516v-56l720-268-268 720h-56Zm26-148 162-436-436 162 196 78 78 196Zm-78-196Z" />
          </svg>
          <p
            style={{
              whiteSpace: "nowrap", // Evita que el texto se divida en varias líneas
              textOverflow: "ellipsis", // Agrega puntos suspensivos si el texto es demasiado largo
              overflow: "hidden", // Oculta el desbordamiento
              maxWidth: "165px", // Establece un ancho máximo
            }}
          >
            {ubicacion} 
          </p>
        </div>
      </div>
    </div>
  );
};

export default Select_sedes; // Exporta el componente
