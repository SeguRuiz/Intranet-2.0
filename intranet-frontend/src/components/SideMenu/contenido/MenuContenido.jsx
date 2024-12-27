import { useEffect, useState } from "react"; // Importa el hook useState para manejar el estado
import SubCont from "../subContenidos/SubCont"; // Importa el componente SubCont para mostrar subcontenidos
import "./MenuCon.css"; // Importa estilos CSS
import {
  ListItemButton,
  ListItemIcon,
  Collapse,
  ListItemText,
  ListItem,
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import ExpndLess from "@mui/icons-material/ExpandLess";
import ExpndMore from "@mui/icons-material/ExpandMore";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import DeleteContent from "../MenuCrud/Delete/DeleteContent";
import Menu_options_reportes from "../../Control-page/Reportes/read/Menu_options_reportes";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Divider } from "@mui/material";
import AddSubContV2 from "../SubCrud/addv2/AddSubContV2";
import { useSelector } from "react-redux";
import BloquearContenido from "../MenuCrud/BloquearContenido/BloquearContenido";
import BlockIcon from "@mui/icons-material/Block";

const MenuContenido = ({
  nombre,
  subcontenidos = [],
  id,
  bloqueado = false,
}) => {
  const { userInSession } = useSelector((x) => x.Auth);
  // Componente que recibe nombre y subcontenidos como props
  const [abrir, setAbrir] = useState(false); // Estado que controla si el menú está abierto o cerrado
  // Estado que controla el índice seleccionado
  // Función para alternar el estado del menú
  const [addSub, setAddSub] = useState(false);
  const abrirCerrar = () => {
    if (subcontenidos.length > 0 || addSub) {
      setAbrir(!abrir);
      setAddSub(false);
    }
  };

  useEffect(() => {
    subcontenidos.length == 0 && !addSub && setAbrir(false);
  }, [subcontenidos]);

  return (
    <>
      <ListItem
        secondaryAction={
          userInSession?.is_staff && (
            <Menu_options_reportes
              customBtn={true}
              btn={
                <MoreHorizIcon
                  sx={{ fontSize: "large", color: "var(--OnPrymary-color)" }}
                />
              }
              bgColor="var(--SurfaceBrigth-color)"
            >
              <BloquearContenido
                contenido_id={id}
                bloqueado={bloqueado}
                setOpen={setAbrir}
              />
              <AddSubContV2
                setAddSubcont={setAddSub}
                setOpen={setAbrir}
                bloqueado={bloqueado}
              />
              <Divider />
              <DeleteContent
                id={id}
                subcontenidos={subcontenidos}
                nombreCarpeta={nombre}
              />
            </Menu_options_reportes>
          )
        }
        disablePadding
      >
        <ListItemButton
          onClick={() => {
            abrirCerrar();
          }}
          disabled={bloqueado}
          disableTouchRipple={subcontenidos.length == 0}
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

          {bloqueado && !addSub ? (
            <BlockIcon sx={{ color: "var(--OnPrymary-color)" }} />
          ) : subcontenidos.length == 0 ? null : abrir ? (
            <ExpndLess sx={{ color: "var(--OnPrymary-color)" }} />
          ) : (
            <ExpndMore sx={{ color: "var(--OnPrymary-color)" }} />
          )}
        </ListItemButton>
      </ListItem>
      <Collapse in={abrir} timeout="auto" unmountOnExit>
        <SubCont
          subcontenidos={subcontenidos}
          addSub={addSub}
          open={abrir}
          setAddSub={setAddSub}
          contenido_id={id}
          setOpen={setAbrir}
        />
      </Collapse>
    </>
  );
};

export default MenuContenido; // Exporta el componente para su uso en otras partes de la aplicación
