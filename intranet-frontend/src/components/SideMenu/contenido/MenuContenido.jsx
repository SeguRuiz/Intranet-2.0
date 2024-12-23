import { useState } from "react"; // Importa el hook useState para manejar el estado
import SubCont from "../subContenidos/SubCont"; // Importa el componente SubCont para mostrar subcontenidos
import "./MenuCon.css"; // Importa estilos CSS
import {
  ListItemButton,
  ListItemIcon,
  Collapse,
  ListItemText,
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import ExpndLess from "@mui/icons-material/ExpandLess";
import ExpndMore from "@mui/icons-material/ExpandMore";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
const MenuContenido = ({ nombre, subcontenidos = [], index }) => {
  // Componente que recibe nombre y subcontenidos como props
  const [abrir, setAbrir] = useState(false); // Estado que controla si el menú está abierto o cerrado
  // Estado que controla el índice seleccionado
  // Función para alternar el estado del menú
  const abrirCerrar = () => {
    if (subcontenidos.length > 0) {
      setAbrir(!abrir);
    }
  };

  

  return (
    <>
      <ListItemButton
        onClick={() => {
          abrirCerrar();
        }}
        disabled={subcontenidos.length == 0}
      >
        <ListItemIcon>
          {abrir ? (
            <FolderOpenIcon sx={{ color: "var(--OnPrymary-color)" }} />
          ) : (
            <FolderIcon sx={{ color: "var(--OnPrymary-color)" }} />
          )}
        </ListItemIcon>
        <ListItemText
          primary={nombre}
          sx={{ color: "var(--OnPrymary-color)" }}
        />
        {subcontenidos.length == 0 ? null : abrir ? (
          <ExpndLess sx={{ color: "var(--OnPrymary-color)" }} />
        ) : (
          <ExpndMore sx={{ color: "var(--OnPrymary-color)" }} />
        )}
      </ListItemButton>
      <Collapse in={abrir} timeout="auto" unmountOnExit>
        <SubCont subcontenidos={subcontenidos} />
      </Collapse>
    </>
  );
};

export default MenuContenido; // Exporta el componente para su uso en otras partes de la aplicación
