import BadgeIcon from "@mui/icons-material/Badge";
import ReportIcon from "@mui/icons-material/Report";
import HomeIcon from "@mui/icons-material/Home";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import ReportGmailerrorredOutlinedIcon from "@mui/icons-material/ReportGmailerrorredOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import FactCheckIcon from "@mui/icons-material/FactCheck";

const pages = [
    {
      icono: <HomeOutlinedIcon />,
      selectedIcon: <HomeIcon />,
      nombre: "Inicio",
      link: "inicio",
    },
    {
      icono: <BadgeOutlinedIcon />,
      selectedIcon: <BadgeIcon />,
      nombre: "informacion personal",
      link: "informacion_personal",
    },
    {
      icono: <ReportGmailerrorredOutlinedIcon />,
      selectedIcon: <ReportIcon />,
      nombre: "Historial de reportes",
      link: "historial_reportes",
    },
    {
      icono: <FactCheckOutlinedIcon />,
      selectedIcon: <FactCheckIcon />,
      nombre: "Historial de asistencias",
      link: "historial_asistencias",
    },
  ];

export default pages