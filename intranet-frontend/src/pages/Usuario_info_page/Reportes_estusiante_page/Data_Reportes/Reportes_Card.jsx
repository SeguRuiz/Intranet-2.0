import Menu_options_reportes from "../../../../components/Control-page/Reportes/read/Menu_options_reportes";
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
import More_info_reports from "../../../../components/Control-page/Reportes/read/More_info_reports";
import Add_file_Report from "../../../../components/Control-page/Reportes/add_file_report/Add_file_Report";
import Ver_comprobante from "../../../../components/Control-page/Reportes/read/Ver_comprobante";

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
  ausencia: <EventBusy color="error" fontSize="large" />,
  "permiso especial": <Assignment color="info" fontSize="large" />,
};

const ReporteCard = ({ reporte }) => {
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
            <Divider/>
            <Add_file_Report reporte_id={reporte.id} />
            <Divider/>

            <Ver_comprobante
              comprobante_id={reporte.archivo_id}
              menuItem={true}
               
            />
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
    </Card>
  );
};

export default ReporteCard;
