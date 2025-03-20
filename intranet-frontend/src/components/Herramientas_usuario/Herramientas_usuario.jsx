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
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ROLES_DE_USUARIO } from "../../utils/Globals.d";



const Herramientas_usuario = () => {
  const navigate = useNavigate()
  const {userInSession} = useSelector(x => x.Auth)

  const herramientas = [
    {
      Titulo: "Clase",
      link: "/link-llamada",
      icono: <VideoCameraFrontIcon fontSize="medium" />,
      visibilidad:  `${ROLES_DE_USUARIO.profesor}-${ROLES_DE_USUARIO.estudiante}`
    },
    {
      Titulo: "Correo",
      link: "/link-llamada",
      icono: <MailIcon fontSize="medium" />,
      visibilidad:  `${ROLES_DE_USUARIO.admin}-${ROLES_DE_USUARIO.profesor}-${ROLES_DE_USUARIO.socioemocional}-${ROLES_DE_USUARIO.estudiante}`
    },
    {
      Titulo: "Cursos",
      link: "/cursos",
      icono: <FolderIcon fontSize="medium" />,
      visibilidad:  `${ROLES_DE_USUARIO.admin}-${ROLES_DE_USUARIO.profesor}-${ROLES_DE_USUARIO.socioemocional}-${ROLES_DE_USUARIO.estudiante}`
    },
    {
      Titulo: "Administracion",
      link: "/admin/control_usuarios/usuarios",
      icono: <AdminPanelSettingsIcon fontSize="medium" />,
      visibilidad:  `${ROLES_DE_USUARIO.admin}`
    },
    {
      Titulo: "Asistencias",
      link: "/asistencias/" + userInSession?.grupos[0]?.grupo_id,
      icono: <ChecklistIcon fontSize="medium" />,
      visibilidad:  `${ROLES_DE_USUARIO.profesor}`
    },
  ];

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
            x.visibilidad.includes(userInSession?.rol) && <Grid2 key={x.Titulo} size={1}>
            <Card variant="outlined">
              <CardHeader
                avatar={<Avatar variant={"rounded"}>{x.icono}</Avatar>}
                title={x.Titulo}
                subheader={"Informacion extra"}
                action={
                  <IconButton onClick={()=>{navigate(x.link)}}>
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
