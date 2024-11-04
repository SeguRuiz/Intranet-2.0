import { set_curso } from "../../../../redux/ControlUsuariosSlice"; // Importa la acción para establecer el curso
import { useSelector } from "react-redux"; // Hook para acceder al estado de Redux
import { useDispatch } from "react-redux"; // Hook para despachar acciones a Redux

const Select_cursos_disponibles = ({ nombre, id }) => {
  const { curso_seleccionado } = useSelector((e) => e.ControlUsuarios); // Obtiene el curso seleccionado del estado de Redux

  const accion = useDispatch(); // Hook para despachar acciones

  return (
    <div
      className={"read-curso-disponible"} // Clase para el contenedor del curso
      onClick={() => {
        // Al hacer clic, cambia el curso seleccionado
        curso_seleccionado != id
          ? accion(set_curso(id)) // Si el curso no está seleccionado, lo selecciona
          : accion(set_curso(null)); // Si está seleccionado, lo deselecciona
      }}
      style={{
        gridTemplateRows: curso_seleccionado == id ? "20% auto" : "0% auto", // Cambia el estilo dependiendo si está seleccionado
      }}
    >
      <div className="curso-header">{nombre}</div> {/* Muestra el nombre del curso */}

      <div className="eye-content">
        <div
          className={
            curso_seleccionado == id
              ? "read-curso-content-selected" // Clase para curso seleccionado
              : "read-curso-content" // Clase para curso no seleccionado
          }
        >
          <div className={curso_seleccionado == id ? "iris" : "grid"}>
            {curso_seleccionado != id && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="80px"
                viewBox="0 -960 960 960"
                width="80px"
                fill="var(--OnSecondary-color)" // Color del icono
              >
                <path d="M220-80q-24 0-42-18t-18-42v-680q0-24 18-42t42-18h520q24 0 42 18t18 42v680q0 24-18 42t-42 18H220Zm0-60h520v-680h-60v266l-97-56-97 56v-266H220v680Zm0 0v-680 680Zm266-414 97-56 97 56-97-56-97 56Z" />
              </svg>
            )}
          </div>
          {curso_seleccionado != id && (
            <div className="nombre_curso">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="30px"
                viewBox="0 -960 960 960"
                width="30px"
                fill="var(--OnsurfaceVariant)" // Color del icono
              >
                <path d="M200-120v-665q0-24 18-42t42-18h440q24 0 42 18t18 42v665L480-240 200-120Z" />
              </svg>
              <p>{nombre}</p> {/* Muestra el nombre del curso */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Select_cursos_disponibles;
