import { useDispatch } from "react-redux";
import "./SubCont.css";
import { set_archivo_mostrandose } from "../../../redux/CursosContenidosSlice";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useSelector } from "react-redux";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import { useEffect } from "react";
import { useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Menu_options_reportes from "../../Control-page/Reportes/read/Menu_options_reportes";
import DeleteSubCont from "../SubCrud/delete/DeleteSubCont";

const SelectSubcont = ({ id, nombre, archivo, contenido_id }) => {
  const { archivo_mostrandose } = useSelector(
    (state) => state.CursosContenidos
  );
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (archivo_mostrandose != null) {
      setSelected(archivo_mostrandose?.subcontenido == id);
    }
  }, [archivo_mostrandose]);

  const accion = useDispatch();
  return (
    <>
      <ListItem
        disablePadding
        secondaryAction={
          <Menu_options_reportes
            customBtn={true}
            btn={
              <MoreHorizIcon
                fontSize="small"
                sx={{ color: "var(--OnsurfaceVariant)" }}
              />
            }
            bgColor="var(--SurfaceBrigth-color)"
          >
            <DeleteSubCont id={id} contenido_id={contenido_id} />
          </Menu_options_reportes>
        }
      >
        <ListItemButton
          key={id}
          onClick={() => {
            accion(
              set_archivo_mostrandose({
                archivo: archivo,
                subcontenido: id,
                contenido: contenido_id,
              })
            );
          }}
          sx={{
            pl: 4,
            color: selected
              ? "var(--OnSecondary-color)"
              : "var(--OnsurfaceVariant)",
            "&.Mui-selected": {
              // Replace with your desired color
              backgroundColor: "var(--SecondaryContainer-color)", // Optional: change background color
            },
          }}
          selected={selected}
        >
          <ListItemIcon>
            <ArticleOutlinedIcon
              sx={{
                color: selected
                  ? "var(--OnSecondary-color)"
                  : "var(--OnsurfaceVariant)",
              }}
            />
          </ListItemIcon>
          <ListItemText
            primary={nombre}
            sx={{
              color: selected
                ? "var(--OnSecondary-color)"
                : "var(--OnsurfaceVariant)",
            }}
          />
        </ListItemButton>
      </ListItem>
    </>
  );
};

export default SelectSubcont;
