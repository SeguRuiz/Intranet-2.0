import Retractile_menu from "../../Retractile_menu/Retractile_menu"; // Componente de menú retractable
import "./Add_report.css"; // Estilos para el componente
import { useSelector } from "react-redux"; // Hook para acceder al estado de Redux
import {
  Button,
  TextField,
  Autocomplete,
  CircularProgress,
} from "@mui/material"; // Componentes de Material UI
import { useEffect, useRef, useState } from "react";
import { useFetch } from "../../../../services/llamados"; // Hook para manejar solicitudes HTTP
import { getCookie } from "../../../../utils/Cookies"; // Función para obtener cookies
import { DecodeToken } from "../../../../services/llamados"; // Función para decodificar el token
import { agregar_reportes } from "../../../../redux/ControlUsuariosSlice"; // Acción para agregar reportes
import { promesa } from "../../../../utils/Utils"; // Utilidad para manejar promesas
import { useCustomNotis } from "../../../../utils/customHooks"; // Hook para manejar notificaciones personalizadas
import { useDispatch } from "react-redux"; // Hook para despachar acciones a Redux
import {
  cerrar_aside,
  abrir_aside,
  set_editando_reporte,
} from "../../../../redux/ControlUsuariosSlice"; // Acciones de control de usuarios
import { toast } from "react-toastify"; // Librería para mostrar notificaciones

const Add_Reportes = () => {
  const token = getCookie("token"); // Obtiene el token de autenticación
  const { editando_reporte } = useSelector((x) => x.ControlUsuarios); // Estado de edición del reporte

  // Estados locales del componente
  const [estudiantes, setEstudiantes] = useState([]); // Almacena la lista de estudiantes
  const [loading, setLoading] = useState(false); // Estado de carga para el autocompletado
  const [open, setOpen] = useState(false); // Controla la apertura del autocompletado
  const [estudiante, setEstudiante] = useState(null); // Estudiante seleccionado
  const [tipoReporte, setTipoReporte] = useState(null); // Tipo de reporte seleccionado
  const info = () => toast.info("El reporte se edito correctamente"); // Notificación para edición exitosa

  // Referencias para elementos del formulario
  const detalles_ref = useRef();
  const form_ref = useRef();
  const persona_reporte = useRef();
  const dia_ref = useRef();
  const estudiante_ref = useRef();

  const accion = useDispatch(); // Inicializa el despachador de Redux
  const { fetch_the_data, fetching } = useFetch(); // Hook para realizar solicitudes HTTP
  const { ok_mensaje, error_mensaje } = useCustomNotis(
    "No se pudo subir el reporte",
    "Se subio correctamente" // Mensajes para notificaciones de éxito y error
  );

  const { userInSession } = useSelector((x) => x.Auth); // Información del usuario en sesión
  const tipoReportes = ["tardia", "retiro", "ausencia", "permiso especial"]; // Tipos de reportes disponibles

  useEffect(() => {
    // Efecto que se ejecuta al editar un reporte
    if (editando_reporte.editando) {
      detalles_ref.current.value = editando_reporte.reporte.detalles; // Carga los detalles del reporte
      setEstudiante({
        label: editando_reporte.reporte.estudiante, // Estudiante relacionado con el reporte
        grupo: editando_reporte.reporte.grupo,
        sede: editando_reporte.reporte.sede,
      });
      dia_ref.current.value = editando_reporte.reporte.dia_incidente; // Carga el día del incidente
      setTipoReporte(editando_reporte.reporte.tipo_incidente); // Carga el tipo de incidente
      accion(abrir_aside()); // Abre el menú lateral
    }
  }, [editando_reporte]);

  const fetch_estudiantes = async () => {
    // Función para obtener estudiantes activos
    setOpen(true); // Abre el autocompletado
    setLoading(true); // Activa el estado de carga

    const data = await fetch_the_data(
      "http://localhost:8000/api/estudiantes_activos",
      token,
      "POST",
      {
        usuario_id: DecodeToken(token)?.user_id, // Envía el ID de usuario decodificado
      }
    );

    if (data[0] == 200 && data != undefined) {
      await promesa(500); // Espera medio segundo antes de continuar
      setEstudiantes(data[1]); // Establece la lista de estudiantes
      estudiante_ref.current.value = ""; // Resetea el campo de estudiante
      setLoading(false); // Desactiva el estado de carga
    }
  };

  const subir_reporte = async (o) => {
    // Función para subir o editar un reporte
    o.preventDefault(); // Previene el comportamiento por defecto del formulario

    // Validación de campos requeridos
    if (
      estudiante != null &&
      tipoReporte != null &&
      detalles_ref.current.value.trim() != "" &&
      persona_reporte.current.value.trim() != "" &&
      dia_ref.current.value.trim() != ""
    ) {
      const data = !editando_reporte.editando
        ? await fetch_the_data(
            "http://localhost:8000/reportes/agregar_reporte",
            token,
            "POST",
            {
              usuario_id: DecodeToken(token)?.user_id, // Envía el ID de usuario
              sede_id: estudiante?.sede_id,
              estudiante_id: estudiante?.id,
              dia_incidente: dia_ref.current.value,
              tipo_incidente: tipoReporte,
              detalles: detalles_ref.current.value.trim(),
            }
          )
        : await fetch_the_data(
            "http://localhost:8000/reportes/reportes_edit",
            token,
            "PATCH",
            {
              usuario_id: DecodeToken(token)?.user_id, // Envía el ID de usuario
              sede_id: estudiante?.sede_id,
              estudiante_id: estudiante?.id,
              dia_incidente: dia_ref.current.value,
              tipo_incidente: tipoReporte,
              detalles: detalles_ref.current.value.trim(),
            },
            editando_reporte.reporte.id // ID del reporte a editar
          );

      // Manejo de respuesta después de enviar el reporte
      if (data != undefined && data[0] == 201 && !editando_reporte.editando) {
        ok_mensaje(); // Mensaje de éxito
        accion(agregar_reportes(data[1])); // Agrega el nuevo reporte al estado de Redux
        setEstudiante(null); // Resetea el estado del estudiante
        form_ref.current.reset(); // Resetea el formulario
        return;
      }

      if (data != undefined && data[0] == 200 && editando_reporte.editando) {
        info(); // Mensaje de éxito para edición
        setEstudiante(null); // Resetea el estado del estudiante
        accion(cerrar_aside()); // Cierra el menú lateral
        accion(set_editando_reporte({ editanto: false, reporte_id: null })); // Resetea el estado de edición
        setTipoReporte(null); // Resetea el tipo de reporte
        form_ref.current.reset(); // Resetea el formulario
        return;
      }

      error_mensaje(); // Mensaje de error si la subida falla
      return;
    }
  };

  return (
    <Retractile_menu titulo="Agregar reportes" altura={90}>
      <div className="add_report_container">
        <form
          className="add-report-form"
          onSubmit={subir_reporte} // Maneja la sumisión del formulario
          ref={form_ref}
        >
          <TextField
            label={"Quien labora el reporte"}
            size="small"
            inputRef={persona_reporte} // Referencia para el campo de persona
            disabled={fetching} // Desactiva el campo si se está cargando
            slotProps={{
              input: { readOnly: true }, // Solo lectura
              inputLabel: { shrink: true },
            }}
            value={`${userInSession?.nombre} ${userInSession?.apellidos}`} // Muestra el nombre del usuario en sesión
          />
          <Autocomplete
            onOpen={fetch_estudiantes} // Carga estudiantes al abrir
            open={open} // Controla la apertura
            options={estudiantes} // Opciones para autocompletar
            onClose={() => {
              setOpen(false); // Cierra el autocompletado
              setEstudiantes([]); // Resetea la lista de estudiantes
            }}
            loading={loading} // Muestra carga si está en proceso
            value={estudiante} // Valor seleccionado
            onChange={(envent, value) => {
              setEstudiante(value); // Actualiza el estudiante seleccionado
              console.log(value);
            }}
            renderInput={(params) => (
              <TextField
                {...params} // Propiedades del autocompletado
                label="Estudiante"
                size="small"
                required
                inputRef={estudiante_ref} // Referencia para el campo de estudiante
                disabled={fetching} // Desactiva el campo si se está cargando
                slotProps={{
                  input: {
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {loading ? (
                          <CircularProgress color="inherit" size={20} /> // Muestra un spinner mientras carga
                        ) : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  },
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            )}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              gap: "10px",
            }}
          >
            <TextField
              label={"Sede a la que pertenece"}
              size="small"
              value={estudiante != null ? estudiante?.sede : ""} // Muestra la sede del estudiante seleccionado
              disabled={fetching} // Desactiva el campo si se está cargando
              slotProps={{
                input: {
                  readOnly: true, // Solo lectura
                },
                inputLabel: {
                  shrink: estudiante != "" && estudiante != null,
                },
              }}
            />
            <TextField
              label={"Grupo al que pertenece"}
              value={estudiante != null ? estudiante?.grupo : ""} // Muestra el grupo del estudiante seleccionado
              disabled={fetching} // Desactiva el campo si se está cargando
              size="small"
              slotProps={{
                input: {
                  readOnly: true, // Solo lectura
                },
                inputLabel: {
                  shrink: estudiante != "" && estudiante != null,
                },
              }}
            />
          </div>

          <TextField
            type="date" // Campo de fecha
            inputRef={dia_ref} // Referencia para el campo de fecha
            label={"Dia del incidente"}
            disabled={fetching} // Desactiva el campo si se está cargando
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            size="small"
            required // Campo requerido
          />

          <Autocomplete
            options={tipoReportes} // Opciones para el tipo de reporte
            value={tipoReporte} // Valor seleccionado
            onChange={(event, value) => {
              setTipoReporte(value); // Actualiza el tipo de reporte seleccionado
            }}
            renderInput={(params) => (
              <TextField
                {...params} // Propiedades del autocompletado
                label="Tipo de reporte"
                disabled={fetching} // Desactiva el campo si se está cargando
                size="small"
                required // Campo requerido
                slotProps={{ inputLabel: { shrink: true } }}
              />
            )}
          />
          <TextField
            inputRef={detalles_ref} // Referencia para el campo de detalles
            multiline // Permite múltiples líneas
            disabled={fetching} // Desactiva el campo si se está cargando
            rows={5} // Número de filas del campo
            label="Detalles" // Etiqueta del campo
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            required // Campo requerido
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              paddingLeft: "10px",
              gap: "10px",
            }}
          >
            <Button type="submit" sx={{ marginRight: "10px" }}>
              {editando_reporte.editando ? "Subir cambios" : "Agregar reporte"}
            </Button>
            {editando_reporte.editando && (
              <Button
                sx={{ marginRight: "10px" }}
                onClick={() => {
                  accion(cerrar_aside()); // Cierra el menú lateral
                  setTipoReporte(null); // Resetea el tipo de reporte
                  accion(
                    set_editando_reporte({ editanto: false, reporte_id: null })
                  ); // Resetea el estado de edición
                  setEstudiante(null); // Resetea el estado del estudiante
                  form_ref.current.reset(); // Resetea el formulario
                }}
              >
                Dejar de editar
              </Button>
            )}
          </div>
        </form>
      </div>
    </Retractile_menu>
  );
};

export default Add_Reportes; // Exporta el componente
