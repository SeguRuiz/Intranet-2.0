import { useDispatch } from "react-redux";
import "./SubCont.css";
import { set_archivo_mostrandose } from "../../../redux/CursosContenidosSlice";
import {
  CircularProgress,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { useSelector } from "react-redux";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import { useEffect } from "react";
import { useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Menu_options_reportes from "../../Control-page/Reportes/read/Menu_options_reportes";
import DeleteSubCont from "../SubCrud/delete/DeleteSubCont";
import Add_file2 from "../SubCrud/addFile/Add_file2";
import TaskIcon from "@mui/icons-material/Task";
import EditSubCont from "../SubCrud/Edit/EditSubCont";
import EditSubContInpt from "../SubCrud/Edit/EditSubContInpt";

const SelectSubcont = ({ id, nombre, archivo, contenido_id }) => {
  const { archivo_mostrandose } = useSelector(
    (state) => state.CursosContenidos
  );
  const { userInSession } = useSelector((state) => state.Auth);
  const { fetching_archivo } = useSelector((state) => state.CursosContenidos);
  const [selected, setSelected] = useState(false);
  const [editando, setEditando] = useState(false);

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
          userInSession?.is_staff && (
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
              <Add_file2
                id={id}
                contenido_id={contenido_id}
                archivo={archivo}
                disabled={editando}
              />
              <Divider />
              <DeleteSubCont id={id} contenido_id={contenido_id} disabled={editando} />
              <EditSubCont id={id} setEditando={setEditando} editando={editando} selected={selected}/>
            </Menu_options_reportes>
          )
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
          disabled={!editando && !archivo || fetching_archivo}
        >
          <ListItemIcon>
            {fetching_archivo && archivo_mostrandose?.subcontenido == id ? (
              <CircularProgress size={20} color="var(--OnsurfaceVariant)" />
            ) : (
              <ArticleOutlinedIcon
                sx={{
                  color: selected
                    ? "var(--OnSecondary-color)"
                    : "var(--OnsurfaceVariant)",
                }}
              />
            )}
          </ListItemIcon>
          {editando ? (
            <EditSubContInpt selected={selected} id={id} setEditando={setEditando} idContenido={contenido_id} currentValue={nombre} />
          ) : (
            <ListItemText
              primary={nombre}
              sx={{
                color: selected
                  ? "var(--OnSecondary-color)"
                  : "var(--OnsurfaceVariant)",
              }}
            />
          )}
          {archivo && userInSession?.is_staff && (
            <ListItemIcon>
              <Tooltip title="Ya tiene un archivo ligado" followCursor>
                <TaskIcon sx={{ color: "var(--OnsurfaceVariant)" }} />
              </Tooltip>
            </ListItemIcon>
          )}
        </ListItemButton>
      </ListItem>
    </>
  );
};

export default SelectSubcont;
