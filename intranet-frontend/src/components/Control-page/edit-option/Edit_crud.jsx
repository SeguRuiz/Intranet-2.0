import { activar_seleccion_multiple } from "../../../redux/ControlUsuariosSlice";
import { desactivar_seleccion_multiple } from "../../../redux/ControlUsuariosSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Delete_users from "../Usuarios-crud/delete/Delete_users";
import { activar_seleccion_multiple_sedes } from "../../../redux/ControlUsuariosSlice";
import { desactivar_seleccion_multiple_sedes } from "../../../redux/ControlUsuariosSlice";
import { setear_seleccion_grupos } from "../../../redux/ControlUsuariosSlice";
import Delete_grupos from "../Grupos_Crud/delete/Delete_grupos";
import Add_grupos from "../Grupos_Crud/add/Add_grupos";
import Delete_sedes from "../Sedes-crud/delete/Delete_sedes";
import "./edit_crud.css";
const Edit_crud = () => {
  const {
    seleccion_multiple_activado,
    seleccion_multiple,
    pestaña_seleccionada,
    seleccion_multiple_sedes,
    seleccion_multiple_activado_sedes,
    seleccionando_integrantes,
    seleccion_multiple_grupos,
    seleccion_multiple_activado_grupos,
  } = useSelector((e) => e.ControlUsuarios);

  const accion = useDispatch();

  const delete_options = () => {
    switch (pestaña_seleccionada) {
      case "usuarios":
        return seleccion_multiple_activado && <Delete_users />;

      case "sedes":
        return (
          seleccion_multiple_activado_sedes && (
            <>
              <div>
                <Delete_sedes />
              </div>
              <div>
                <Add_grupos />
              </div>
            </>
          )
        );
      case "grupos":
        return seleccion_multiple_activado_grupos && <Delete_grupos />;
      default:
        break;
    }
  };

  const activar_selecciones_multiple_btn = () => {
    switch (pestaña_seleccionada) {
      case "usuarios":
        seleccion_multiple_activado
          ? accion(desactivar_seleccion_multiple())
          : accion(activar_seleccion_multiple());
        break;

      case "sedes":
        seleccion_multiple_activado_sedes
          ? accion(desactivar_seleccion_multiple_sedes())
          : accion(activar_seleccion_multiple_sedes());
        break;
      case "grupos":
        seleccion_multiple_activado_grupos
          ? accion(setear_seleccion_grupos(false))
          : accion(setear_seleccion_grupos(true));
        break;
      default:
        break;
    }
  };

  const verificar_vacio = (comprobacion, mas_opciones) => {
    if (comprobacion) {
      return "options-menu-users";
    }
    return mas_opciones ? mas_opciones : "options-menu-users-open";
  };

  const verificar_clases = () => {
    switch (pestaña_seleccionada) {
      case "usuarios":
        return verificar_vacio(seleccion_multiple[0] == undefined);
      case "sedes":
        return seleccion_multiple_sedes.length == 1
          ? verificar_vacio(
              seleccion_multiple_sedes[0] == undefined,
              "options-menu-users-more-options-sedes"
            )
          : verificar_vacio(seleccion_multiple_sedes[0] == undefined);
      case "grupos":
        return verificar_vacio(seleccion_multiple_grupos[0] == undefined);

      default:
        break;
    }
  };

  const btn_color = () => {
    switch (pestaña_seleccionada) {
      case "usuarios":
        return seleccion_multiple[0] == undefined
          ? "#3f4850"
          : "var(--OnSecondary-color)";
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
    switch (seleccionando_integrantes) {
      case true:
        return <></>;
      case false:
        return (
          <div className={verificar_clases()}>
            <div className="edit-crud-container">
              <div className="open-editor-container">
                {!seleccion_multiple_activado &&
                !seleccion_multiple_activado_sedes &&
                !seleccion_multiple_activado_grupos ? (
                  <svg
                    onClick={activar_selecciones_multiple_btn}
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
                    fill={btn_color()}
                    onClick={activar_selecciones_multiple_btn}
                  >
                    <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
                  </svg>
                ) : (
                  <></>
                )}
              </div>
              {delete_options()}
            </div>
          </div>
        );
      default:
        break;
    }
  };

  return verificar_selecciones_activadas();
};

export default Edit_crud;
