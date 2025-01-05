import "./Sidemenu.css";
import MenuContenido from "./contenido/MenuContenido";
import {
  Divider,
  LinearProgress,
  List,
  ListSubheader,
} from "@mui/material";
import { useSelector } from "react-redux";
import { Paper } from "@mui/material";
import AddContenidoV2 from "./MenuCrud/Add/AddContenidoV2/AddContenidoV2";
import { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useFetch } from "../../services/llamados";
import {
  set_archivo_mostrandose,
  setContenidos,
} from "../../redux/CursosContenidosSlice";
import { getCookie } from "../../utils/Cookies";
import ListItemLoader from "../loaders/ListItemLoader";

export const Sidemenu = ({ id_curso }) => {
  const { Contenidos } = useSelector((state) => state.CursosContenidos);
  const { userInSession } = useSelector((state) => state.Auth);
  const paperRef = useRef();
  const accion = useDispatch();
  const { fetch_the_data, fetching } = useFetch();
  const token = getCookie("token");

  useEffect(() => {
    (async () => {
      accion(set_archivo_mostrandose(null));
      const data = await fetch_the_data(
        "http://localhost:8000/cursos_contenidos/get_contenidos_and_subcontenidos",
        token,
        "GET",
        null,
        id_curso
      );

      accion(setContenidos(data[1]));
    })();
  }, [id_curso]);

  const movePaper = () => {
    paperRef.current.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    })
  }

   
  return (
    <>
      <Paper
        ref={paperRef}
        sx={{
          maxHeight: "34.9rem",
          height: "100%",
          overflow: "auto",
          borderRadius: 0,
          scrollbarColor:
            "var(--OnPrymary-color) var(--PrymaryContainer-color)",
          scrollbarWidth: "thin",
          bgcolor: "var(--PrymaryContainer-color)",
        }}
      >
        {fetching && (
          <LinearProgress
            sx={{
              backgroundColor: "var(--PrymaryContainer-color)", // Background color of the bar
              "& .MuiLinearProgress-bar": {
                backgroundColor: "var(--SecondaryContainer-color)", // Color of the progress indicator
              },
            }}
          />
        )}
        {fetching ? (
          <List
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "var(--PrymaryContainer-color)",
            }}
            disablePadding
          >
            <ListItemLoader cantidad={5} />
          </List>
        ) : (
          <List
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "var(--PrymaryContainer-color)",
            }}
            disablePadding
            subheader={
              <ListSubheader
                sx={{
                  bgcolor: "var(--PrymaryContainer-color)",
                  fontSize: 20,
                  color: "var(--OnPrymary-color)",
                }}
              >
                Contenidos del curso
              </ListSubheader>
            }
          >
            <Divider variant="middle" />
            {userInSession?.is_staff && <AddContenidoV2 scroll={movePaper} />}
            {Contenidos.map((contenido) => (
              <MenuContenido
                key={contenido.id}
                nombre={contenido.nombre}
                subcontenidos={contenido.subcontenidos}
                bloqueado={contenido.bloqueado}
                id={contenido.id}
              />
            ))}
          </List>
        )}
      </Paper>
    </>
  );
};
