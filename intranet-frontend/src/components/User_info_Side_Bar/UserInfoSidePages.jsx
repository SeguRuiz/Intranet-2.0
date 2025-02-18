import BadgeIcon from "@mui/icons-material/Badge";
import ReportIcon from "@mui/icons-material/Report";
import HomeIcon from "@mui/icons-material/Home";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import ReportGmailerrorredOutlinedIcon from "@mui/icons-material/ReportGmailerrorredOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import GroupIcon from "@mui/icons-material/Group";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import { ROLES_DE_USUARIO } from "../../utils/Globals.d";

const pages = [
  {
    icono: <HomeOutlinedIcon />,
    selectedIcon: <HomeIcon />,
    nombre: "Inicio",
    link: "inicio",
    visibilidad: `${ROLES_DE_USUARIO.admin}-${ROLES_DE_USUARIO.profesor}-${ROLES_DE_USUARIO.socioemocional}-${ROLES_DE_USUARIO.estudiante}`,
  },
  {
    icono: <GroupOutlinedIcon />,
    selectedIcon: <GroupIcon />,
    nombre: "Estudiantes",
    link: "estudiantes",
    visibilidad: `${ROLES_DE_USUARIO.admin}-${ROLES_DE_USUARIO.profesor}-${ROLES_DE_USUARIO.socioemocional}`,
  },
  {
    icono: <BadgeOutlinedIcon />,
    selectedIcon: <BadgeIcon />,
    nombre: "informacion personal",
    link: "informacion_personal",
    visibilidad: `${ROLES_DE_USUARIO.admin}-${ROLES_DE_USUARIO.profesor}-${ROLES_DE_USUARIO.socioemocional}-${ROLES_DE_USUARIO.estudiante}`,
  },
  {
    icono: <ReportGmailerrorredOutlinedIcon />,
    selectedIcon: <ReportIcon />,
    nombre: "Historial de reportes",
    link: "historial_reportes",
    visibilidad: ROLES_DE_USUARIO.estudiante,
  },
  {
    icono: <FactCheckOutlinedIcon />,
    selectedIcon: <FactCheckIcon />,
    nombre: "Historial de asistencias",
    link: "historial_asistencias",
    visibilidad: ROLES_DE_USUARIO.estudiante,
  },
];

export default pages;
