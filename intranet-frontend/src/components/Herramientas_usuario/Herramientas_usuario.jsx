import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid2,
  IconButton,
  Typography,
} from "@mui/material";
import WindowIcon from "@mui/icons-material/Window";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import FolderIcon from "@mui/icons-material/Folder";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ChecklistIcon from "@mui/icons-material/Checklist";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import MailIcon from "@mui/icons-material/Mail";
const herramientas = [
  {
    Titulo: "Clase",
    link: "/link-llamada",
    icono: <VideoCameraFrontIcon fontSize="medium" />,
  },
  {
    Titulo: "Correo",
    link: "/link-llamada",
    icono: <MailIcon fontSize="medium" />,
  },
  {
    Titulo: "Cursos",
    link: "/cursos",
    icono: <FolderIcon fontSize="medium" />,
  },
  {
    Titulo: "Administracion",
    link: "/admin",
    icono: <AdminPanelSettingsIcon fontSize="medium" />,
  },
  {
    Titulo: "Asistencias",
    link: "/admin",
    icono: <ChecklistIcon fontSize="medium" />,
  },
];
const Herramientas_usuario = () => {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            fontWeight: 500,
            letterSpacing: "2px",
            fontSize: "25px",
          }}
        >
          <WindowIcon
            fontSize="inherit"
            sx={{
              mr: 1,
            }}
          />
          Herramientas
        </Typography>
      </CardContent>
      <Divider />
      <CardContent>
        <Grid2 container columns={2} spacing={1.5}>
          {herramientas.map((x) => (
            <Grid2 key={x.Titulo} size={1}>
              <Card variant="outlined">
                <CardHeader
                  avatar={<Avatar variant={"rounded"}>{x.icono}</Avatar>}
                  title={x.Titulo}
                  subheader={"Informacion extra"}
                  action={
                    <IconButton>
                      <ArrowForwardIosIcon fontSize="small" />
                    </IconButton>
                  }
                />
              </Card>
            </Grid2>
          ))}
        </Grid2>
      </CardContent>
    </Card>
  );
};

export default Herramientas_usuario;
