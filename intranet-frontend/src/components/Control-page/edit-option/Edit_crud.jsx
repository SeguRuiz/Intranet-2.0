import { activar_seleccion_multiple, desactivar_seleccion_multiple } from "../../../redux/ControlUsuariosSlice"; // Importa acciones de Redux
import { useDispatch, useSelector } from "react-redux"; // Hooks para acceder y despachar acciones en Redux
import Delete_users from "../Usuarios-crud/delete/Delete_users"; // Componente para eliminar usuarios
import { activar_seleccion_multiple_sedes, desactivar_seleccion_multiple_sedes, setear_seleccion_grupos } from "../../../redux/ControlUsuariosSlice"; // Más acciones de Redux
import Delete_grupos from "../Grupos_Crud/delete/Delete_grupos"; // Componente para eliminar grupos
import Add_grupos from "../Grupos_Crud/add/Add_grupos"; // Componente para agregar grupos
import Delete_sedes from "../Sedes-crud/delete/Delete_sedes"; // Componente para eliminar sedes
import "./edit_crud.css"; // Importa estilos del componente
import { IconButton } from "@mui/material"; // Componente de Material-UI

const Edit_crud = () => {
  // Desestructura el estado del store de Redux
  const {
    seleccion_multiple_activado,
    seleccion_multiple,
    pestaña_seleccionada,
    seleccion_multiple_sedes,
    seleccion_multiple_activado_sedes,
    seleccionando_integrantes,
    seleccion_multiple_grupos,
    seleccion_multiple_activado_grupos,
  } = useSelector((e) => e.ControlUsuarios); // Accede al estado global

  const accion = useDispatch(); // Hook para despachar acciones a Redux

  const delete_options = () => {
    // Función que determina qué opciones de eliminación se muestran
    switch (pestaña_seleccionada) {
      case "usuarios":
        return seleccion_multiple_activado && <Delete_users />; // Muestra componente de eliminación de usuarios

      case "sedes":
        return (
          seleccion_multiple_activado_sedes && (
            <>
              <div>
                <Delete_sedes /> {/* Muestra componente de eliminación de sedes */}
              </div>
              <div>
                <Add_grupos /> {/* Muestra componente para agregar grupos */}
              </div>
            </>
          )
        );
      case "grupos":
        return seleccion_multiple_activado_grupos && <Delete_grupos />; // Muestra componente de eliminación de grupos
      default:
        break;
    }
  };

  const activar_selecciones_multiple_btn = () => {
    // Función que activa o desactiva la selección múltiple según la pestaña actual
    switch (pestaña_seleccionada) {
      case "usuarios":
        seleccion_multiple_activado
          ? accion(desactivar_seleccion_multiple()) // Desactiva si ya estaba activado
          : accion(activar_seleccion_multiple()); // Activa la selección múltiple
        break;

      case "sedes":
        seleccion_multiple_activado_sedes
          ? accion(desactivar_seleccion_multiple_sedes())
          : accion(activar_seleccion_multiple_sedes());
        break;
      case "grupos":
        seleccion_multiple_activado_grupos
          ? accion(setear_seleccion_grupos(false)) // Desactiva la selección múltiple para grupos
          : accion(setear_seleccion_grupos(true)); // Activa la selección múltiple para grupos
        break;
      default:
        break;
    }
  };

  const verificar_vacio = (comprobacion, mas_opciones) => {
    // Verifica si hay opciones seleccionadas y devuelve una clase CSS
    if (comprobacion) {
      return "options-menu-users"; // Clase para menú vacío
    }
    return mas_opciones ? mas_opciones : "options-menu-users-open"; // Clase para menú abierto
  };

  const verificar_clases = () => {
    // Función que verifica las clases CSS según el estado de selección
    switch (pestaña_seleccionada) {
      case "usuarios":
        return verificar_vacio(seleccion_multiple[0] == undefined); // Verifica si hay usuarios seleccionados
      case "sedes":
        return seleccion_multiple_sedes.length == 1
          ? verificar_vacio(
              seleccion_multiple_sedes[0] == undefined,
              "options-menu-users-more-options-sedes" // Clase adicional si solo hay una sede
            )
          : verificar_vacio(seleccion_multiple_sedes[0] == undefined);
      case "grupos":
        return verificar_vacio(seleccion_multiple_grupos[0] == undefined); // Verifica si hay grupos seleccionados

      default:
        break;
    }
  };

  const btn_color = () => {
    // Devuelve el color del botón según la pestaña seleccionada
    switch (pestaña_seleccionada) {
      case "usuarios":
        return seleccion_multiple[0] == undefined
          ? "#3f4850" // Color si no hay usuarios seleccionados
          : "var(--OnSecondary-color)"; // Color si hay usuarios seleccionados
      case "sedes":
        return seleccion_multiple_sedes[0] == undefined
          ? "#3f4850"
          : "var(--OnSecondary-color)";
      case "grupos":
        return seleccion_multiple_grupos[0] == undefined
          ? "#3f4850"
          : "var(--OnSecondary-color)";

      default:
        break;
    }
  };

  const verificar_selecciones_activadas = () => {
    // Verifica si la selección de integrantes está activa
    switch (seleccionando_integrantes) {
      case true:
        return <></>; // Si está seleccionando, no muestra nada
      case false:
        return (
          <div className={verificar_clases()}>
            <div className="edit-crud-container">
              <div className="open-editor-container">
                {!seleccion_multiple_activado &&
                !seleccion_multiple_activado_sedes &&
                !seleccion_multiple_activado_grupos ? (
                  <svg
                    onClick={activar_selecciones_multiple_btn} // Activa la selección múltiple al hacer clic
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="30px"
                    fill="#3f4850"
                    className="edit-crud"
                  >
                    <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                  </svg>
                ) : (
                  <></>
                )}
                {seleccion_multiple_activado ||
                seleccion_multiple_activado_sedes ||
                seleccion_multiple_activado_grupos ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill={btn_color()} // Color del botón
                    onClick={activar_selecciones_multiple_btn} // Activa o desactiva al hacer clic
                  >
                    <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
                  </svg>
                ) : (
                  <></>
                )}
              </div>
              {delete_options()} {/* Muestra las opciones de eliminación según la pestaña seleccionada */}
            </div>
          </div>
        );
      default:
        break;
    }
  };

  return verificar_selecciones_activadas(); // Retorna el resultado de la verificación de selecciones activadas
};

export default Edit_crud; 
