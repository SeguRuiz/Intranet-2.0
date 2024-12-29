import Retractile_menu from "../../Retractile_menu/Retractile_menu"; // Componente de menú retráctil
import { agregar_grupos } from "../../../../redux/ControlUsuariosSlice"; // Acción para agregar grupos a Redux
import { useRef } from "react"; // Hooks de React
import { useCustomNotis } from "../../../../utils/customHooks"; // Hook para manejar notificaciones personalizadas
import { useFetch } from "../../../../services/llamados"; // Hook para manejar solicitudes HTTP
import { useDispatch } from "react-redux"; // Hook para despachar acciones a Redux
import { useCustomModal } from "../../../../utils/customHooks"; // Hook para manejar el estado del modal
import { useSelector } from "react-redux"; // Hook para acceder al estado de Redux
import {
  desactivar_seleccion_multiple_sedes,
  vaciar_ids_temporales,
} from "../../../../redux/ControlUsuariosSlice"; // Acciones adicionales de Redux
import { set_fetching } from "../../../../redux/FetchsSlice"; // Acción para gestionar el estado de carga
import "./Add_grupos.css"; // Estilos específicos del componente
import { TextField, Button } from "@mui/material"; // Componentes de Material-UI
import { getCookie } from "../../../../utils/Cookies"; // Función para obtener cookies

const Add_grupos = () => {
  const { ok, error, fetching, fetch_the_data } = useFetch(); // Estados y función para manejar la solicitud
  const { ok_mensaje, error_mensaje } = useCustomNotis(
    "ocurrio un error",
    "Se agrego correctamente"
  ); // Configuración de mensajes de notificación
  const { seleccion_multiple_sedes } = useSelector((e) => e.ControlUsuarios); // Selección de sedes desde el estado de Redux
  const dlg_ref = useRef(); // Referencia para el modal
  const { openModal, closeModalDlg, closeModal } = useCustomModal(dlg_ref); // Funciones para manejar el modal
  const accion = useDispatch(); // Para despachar acciones a Redux
  const grupo_nombre_inpt = useRef(); // Referencia para el input del nombre del grupo
  const form_ref = useRef(); // Referencia para el formulario
  const token = getCookie("token"); // Token para autenticación

  const subir_grupo = async (o) => {
    // Maneja el envío del formulario
    o.preventDefault(); // Previene el comportamiento por defecto del formulario
    const grupo_nombre_value = grupo_nombre_inpt.current.value.trim(); // Obtiene el valor del input

    if (grupo_nombre_value != "") {
      // Solo procede si el nombre no está vacío
      accion(set_fetching(true)); // Indica que se está cargando

      const data = await fetch_the_data(
        "http://localhost:8000/cursos/grupos",
        token,
        "POST",
        {
          nombre_grupo: grupo_nombre_value,
          sede_id: seleccion_multiple_sedes[0].sede_id, // ID de la sede seleccionada
        }
      );

      if (data == undefined) {
        error_mensaje(); // Muestra mensaje de error si no hay respuesta
      } else if (data[0] == 201) {
        // Respuesta exitosa
        ok_mensaje(); // Mensaje de éxito
        accion(agregar_grupos({ ...data[1], integrantes: [] })); // Agrega el grupo al estado
        accion(desactivar_seleccion_multiple_sedes()); // Desactiva la selección de sedes
        accion(vaciar_ids_temporales("sedes")); // Limpia los IDs temporales
        form_ref.current.reset(); // Resetea el formulario
        accion(set_fetching(false)); // Finaliza el estado de carga
        closeModal(); // Cierra el modal
      } else {
        error_mensaje(); // Muestra mensaje de error
      }
    }
  };

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        fill="var(--OnsurfaceVariant)"
        onClick={openModal} // Abre el modal
      >
        <path d="M500-482q29-32 44.5-73t15.5-85q0-44-15.5-85T500-798q60 8 100 53t40 105q0 60-40 105t-100 53Zm220 322v-120q0-36-16-68.5T662-406q51 18 94.5 46.5T800-280v120h-80Zm80-280v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80Zm-480-40q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM0-160v-112q0-34 17.5-62.5T64-378q62-31 126-46.5T320-440q66 0 130 15.5T576-378q29 15 46.5 43.5T640-272v112H0Zm320-400q33 0 56.5-23.5T400-640q0-33-23.5-56.5T320-720q-33 0-56.5 23.5T240-640q0 33 23.5 56.5T320-560ZM80-240h480v-32q0-11-5.5-20T540-306q-54-27-109-40.5T320-360q-56 0-111 13.5T100-306q-9 5-14.5 14T80-272v32Zm240-400Zm0 400Z" />
      </svg>
      <dialog
        ref={dlg_ref}
        onClick={closeModalDlg} // Cierra el modal si se hace clic fuera de él
        className="add-grupos-modal"
      >
        <div className="add-grupos-content">
          <Retractile_menu
            titulo="Grupos" // Título del menú
            altura={24} // Altura del menú
            ok={ok} // Estado de éxito
            loading={fetching} // Estado de carga
            error={error} // Estado de error
          >
            <form
              className="add-grupos-form"
              onSubmit={subir_grupo} // Envío del formulario
              ref={form_ref}
            >
              <TextField
                label={"Nombre del grupo"} // Etiqueta del input
                inputRef={grupo_nombre_inpt} // Referencia al input
                variant="standard" // Variante del campo
                required // Campo obligatorio
                size="big" // Tamaño del campo
                margin="dense" // Margen del campo
              />
              <Button type="submit">Subir</Button> {/* Botón para enviar */}
            </form>
          </Retractile_menu>
        </div>
      </dialog>
    </>
  );
};

export default Add_grupos;
