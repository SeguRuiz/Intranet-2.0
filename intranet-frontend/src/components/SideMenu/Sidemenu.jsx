import "./Sidemenu.css";
import MenuContenido from "./contenido/MenuContenido";
import {
  List,
  ListItemButton,
  ListSubheader,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { useSelector } from "react-redux";
import FolderIcon from "@mui/icons-material/Folder";
import { Paper } from "@mui/material";

export const Sidemenu = () => {
  const { Contenidos } = useSelector((state) => state.CursosContenidos);

  return (
    <>
      <Paper
        sx={{
          maxHeight: "33rem",
          height: "100%",
          overflow: "auto",
          borderRadius: 0,
          scrollbarColor:
            "var(--OnPrymary-color) var(--PrymaryContainer-color)",
          scrollbarWidth: "thin",
          bgcolor: "var(--PrymaryContainer-color)",
        }}
      >
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "var(--PrymaryContainer-color)",
          }}
          disablePadding
        >
          {Contenidos.map((contenido, index) => (
            <MenuContenido
              key={contenido.id}
              nombre={contenido.nombre}
              subcontenidos={contenido.subcontenidos}
              index={index}
            />
          ))}
        </List>
      </Paper>
    </>
  );
};
