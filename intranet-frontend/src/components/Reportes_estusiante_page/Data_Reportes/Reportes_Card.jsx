import Menu_options_reportes from "../../Control-page/Reportes/read/Menu_options_reportes";
import Ver_comprobante from "../../Control-page/Reportes/read/Ver_comprobante";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  CardHeader,
  Avatar,
  Divider,
} from "@mui/material";
import {
  AccessTime,
  EventBusy,
  ExitToApp,
  Assignment,
} from "@mui/icons-material";
import More_info_reports from "../../Control-page/Reportes/read/More_info_reports";
import Enviar_Justificacion from "../Enviar_Justificacion_reportes/Enviar_Justificacion";
import { useSelector } from "react-redux";
import { ROLES_DE_USUARIO } from "../../../utils/Globals.d";
import { Set_reporte_estado } from "../../Control-page/Reportes/edit/Set_reporte_estado";

const estadoColors = {
  aprobado: "success",
  denegado: "error",
  "en espera": "warning",
};

const borderColors = {
  aprobado: "#2E7D32",
  denegado: "#D32F2F",
  "en espera": "#ED6C02",
};

const incidenteIcons = {
  tardia: <AccessTime color="primary" fontSize="large" />,
  retiro: <ExitToApp color="secondary" fontSize="large" />,
  ausente: <EventBusy color="error" fontSize="large" />,
  "permiso especial": <Assignment color="info" fontSize="large" />,
};

const ReporteCard = ({ reporte }) => {
  const { userInSession } = useSelector((x) => x.Auth);
  console.log(reporte?.usuario_id, reporte?.estudiante_id, reporte.archivo_id);

  return (
    <Card sx={{ borderLeft: 5, borderColor: borderColors[reporte.estado] }}>
      <CardHeader
        title={reporte.tipo_incidente.toUpperCase()}
        sx={{
          height: "5vh",
        }}
        titleTypographyProps={{
          fontSize: "17px",
          fontWeight: 500,
        }}
        subheader={`📅 ${new Date(reporte.dia_incidente).toLocaleDateString()}`}
        action={
          <Menu_options_reportes
            customBtn={true}
            btn={<MoreVertIcon fontSize="medium" />}
          >
            <More_info_reports
              estudiante={reporte?.estudiante_id}
              usuario={reporte?.usuario_id}
              reporte_id={reporte?.id}
            />

            <Ver_comprobante
              comprobante_id={reporte.archivo_id}
              menuItem={true}
            />
            {userInSession?.rol == ROLES_DE_USUARIO.socioemocional && (
              <>
                <Divider />
                <Set_reporte_estado accion="denegar" reporte_id={reporte.id} />
                <Set_reporte_estado
                  accion="dejar en espera"
                  reporte_id={reporte.id}
                />
                <Set_reporte_estado accion="aprobar" reporte_id={reporte.id} />
              </>
            )}
          </Menu_options_reportes>
        }
        avatar={
          <Avatar
            sx={{
              backgroundColor: "white",
            }}
          >
            {incidenteIcons[reporte.tipo_incidente]}
          </Avatar>
        }
      ></CardHeader>
      <Divider />
      <CardContent>
        <Typography variant="body1" mt={1}>
          {reporte.detalles}
        </Typography>
        <Chip
          label={reporte.estado.toUpperCase()}
          color={estadoColors[reporte.estado] || "default"}
          sx={{ mt: 1 }}
        />
      </CardContent>

      {userInSession?.rol == ROLES_DE_USUARIO.estudiante && (
        <>
          <Divider>
            <Typography variant="body2" color="text.secondary">
              Justificacion
            </Typography>
          </Divider>
          <CardContent>
            <Enviar_Justificacion
              reporte_id={reporte.id}
              descripcion_comprobante={reporte?.descripcion_comprobante}
            />
          </CardContent>
        </>
      )}
      {userInSession?.rol != ROLES_DE_USUARIO.estudiante &&
        reporte?.descripcion_comprobante != "Sin descripcion" && (
          <>
            <Divider>
              <Typography variant="body2" color="text.secondary">
                Justificacion
              </Typography>
            </Divider>
            <CardContent>
              <Enviar_Justificacion
                reporte_id={reporte.id}
                descripcion_comprobante={reporte?.descripcion_comprobante}
              />
            </CardContent>
          </>
        )}
    </Card>
  );
};

export default ReporteCard;
