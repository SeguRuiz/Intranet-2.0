import { useDispatch } from "react-redux";
import "./SubCont.css";
import { set_archivo_mostrandose } from "../../../redux/CursosContenidosSlice";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useSelector } from "react-redux";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import { useEffect } from "react";
import { useState } from "react";

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
        disabled={archivo == null}
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
    </>
  );
};

export default SelectSubcont;
