import "./Read_reportes.css"; // Importa estilos CSS para el componente
import { Avatar, Divider, Tooltip } from "@mui/material"; // Importa componentes de Material UI
import { stringAvatar } from "../../../../utils/Utils"; // Función utilitaria para crear avatares
import { useSelector } from "react-redux"; // Hook para acceder al estado de Redux
import { IconButton } from "@mui/material"; // Botón con icono de Material UI
import Add_file_Report from "../add_file_report/Add_file_Report"; // Componente para agregar archivos a reportes
import { MenuItem } from "@mui/material"; // Componente para elementos de menú
import More_info_reports from "./More_info_reports"; // Componente para mostrar más información sobre reportes
import Ver_comprobante from "./Ver_comprobante"; // Componente para visualizar comprobantes
import Menu_options_reportes from "./Menu_options_reportes"; // Componente que contiene las opciones de menú para reportes
import Edit_reporte from "../edit/Edit_reporte"; // Componente para editar reportes
import { useEffect, useState } from "react"; // Hooks para manejar efectos y estado
import { Set_reporte_estado } from "../edit/Set_reporte_estado"; // Componente para establecer el estado del reporte

const Select_reportes = ({
  dia_incidente,
  fecha_creacion,
  sede,
  grupo,
  detalles,
  comprobante,
  tipo_incidente,
  estudiante_id,
  estado,
  usuario_id,
  comprobante_id,
  id,
}) => {
  const { usuarios } = useSelector((x) => x.ControlUsuarios); // Obtiene la lista de usuarios del estado de Redux
  const { userInSession } = useSelector((x) => x.Auth); // Obtiene el usuario en sesión
  const fecha = new Date(fecha_creacion); // Convierte la fecha de creación a un objeto Date
  const dia = fecha.toLocaleDateString("en-GB"); // Formatea la fecha a un formato específico
  const nombre_usuario = usuarios?.find((x) => x.id == usuario_id); // Busca el usuario por ID
  const [animated, setAnimated] = useState("report-card-cont"); // Estado para la animación del contenedor
  const { editando_reporte } = useSelector((x) => x.ControlUsuarios); // Obtiene información sobre el reporte que se está editando

  useEffect(() => {
    // Efecto para manejar la animación del reporte si está en modo de edición
    if (editando_reporte.editando && editando_reporte.reporte.id == id) {
      setAnimated("report-card-cont-animated"); // Cambia a la clase animada si está editando
    } else {
      setAnimated("report-card-cont"); // Reestablece la clase por defecto
    }
  }, [editando_reporte]);

  const set_type = (tipo = "") => {
    // Función para establecer el tipo de reporte basado en su estado
    switch (tipo.toLowerCase()) {
      case "denegado":
        return "report-type-denegado"; // Clase para estado denegado
      case "aprobado":
        return "report-type-aceptado"; // Clase para estado aprobado
      default:
        return "report-type"; // Clase por defecto
    }
  };

  return (
    <div className={animated}>
      {" "}
      {/* Contenedor principal con animación */}
      <div className="report-info">
        <div className="report-nav">
          <div className={set_type(estado)}>
            {" "}
            {/* Clase basada en el estado del reporte */}
            <strong>{estado}</strong>
          </div>
          <div className="full-icon-report">
            <Menu_options_reportes>
              {" "}
              {/* Componente que contiene las opciones de menú */}
              <More_info_reports
                estudiante={estudiante_id}
                dia_incidente={dia_incidente}
                tipo_incidente={tipo_incidente}
                comprobante={comprobante}
                grupo={grupo}
                sede={sede}
                usuario={`${nombre_usuario?.first_name} ${nombre_usuario?.last_name}`}
                fecha_creado={fecha_creacion}
                detalles={detalles}
                reporte_id={id}
              />
              {!userInSession.is_socioemocional || userInSession.is_staff ? (
                // Condición para mostrar opciones de edición y agregar archivos
                <>
                  <Edit_reporte reporte_id={id} />
                  <Add_file_Report reporte_id={id} />
                </>
              ) : (
                <></>
              )}
              
              {userInSession.is_socioemocional || userInSession.is_staff ? (
                // Opciones para cambiar el estado del reporte
                
                <>
                <Divider/>
                  <Set_reporte_estado reporte_id={id} accion="Denegar" />
                  <Set_reporte_estado reporte_id={id} accion="Aprobar" />
                  <Set_reporte_estado
                    reporte_id={id}
                    accion="Dejar en espera"
                  />
                </>
              ) : (
                <></>
              )}
            </Menu_options_reportes>
          </div>
        </div>
        <div className="report-content">
          {comprobante && <Ver_comprobante comprobante_id={comprobante_id} />}{" "}
          {/* Muestra el comprobante si existe */}
        </div>
      </div>
      <div className="info-dia-reporte">
        <div style={{ marginLeft: "4px" }} className="date-reporte">
          <p>{dia}</p> {/* Muestra el día del reporte */}
        </div>
        <Tooltip
          title={`${nombre_usuario?.first_name} ${nombre_usuario?.last_name}`} // Tooltip con el nombre del usuario
          placement="top"
        >
          <Avatar
            {...stringAvatar(
              `${nombre_usuario?.first_name} ${nombre_usuario?.last_name}`,
              {
                fontSize: "15px",
                width: 32,
                height: 32,
                marginRight: "5px",
                cursor: "pointer",
              }
            )}
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default Select_reportes; // Exporta el componente
