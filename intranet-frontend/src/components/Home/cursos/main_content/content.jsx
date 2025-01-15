import "./content.css";
import { useEffect, useState } from "react";
import { useFetch } from "../../../../services/llamados";
import { set_archivo_mostrandose } from "../../../../redux/CursosContenidosSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setData } from "../../../../redux/modalSlice";
import { DecodeToken } from "../../../../services/llamados";
import { getCookie } from "../../../../utils/Cookies";
import Select_cursos_home from "./Read/Select_cursos_home";
import { useTheme, useMediaQuery } from "@mui/material";

import {
  CircularProgress,
  Collapse,
  Grid2,
  LinearProgress,
  Slide,
  Zoom,
} from "@mui/material";
import { TransitionGroup } from "react-transition-group";

const Content = () => {
  const { cursos } = useSelector((state) => state.modal);
  const theme = useTheme();
  const es_PantallaPequeña = useMediaQuery(theme.breakpoints.down('sm'))

  const token = getCookie("token");

  const { fetch_the_data, fetching } = useFetch();

  const accion = useDispatch();

  useEffect(() => {
    const data = async () => {
      const datos = await fetch_the_data(
        "http://localhost:8000/cursos/get_user_courses",
        token,
        "POST",
        {
          user_id: DecodeToken(token).user_id,
        }
      );

      accion(setData(datos[1]));
      accion(set_archivo_mostrandose(null));
    };
    data();
  }, []);

  return (
    <>
      <Grid2
        container
        sx={{
          
          height: "100%",
          [theme.breakpoints.down("sm")]: {
            justifyContent: "center",
          },
        }}
        columns={{ xs: 1, sm: 8, md: 12 }}
        spacing={es_PantallaPequeña ? 2 : 2}
        padding={2}
      >
        {fetching ? (
          <CircularProgress
            size={60}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        ) : (
          <>
            {cursos?.map((e) => (
              <Grid2
                key={e.id}
                size={{ sx: 12, sm: 4, md: 3 }}
                sx={{
                  ":hover": {
                    transform: "translateY(-2px)",
                  },
                  transition: "0.3s",
                  [theme.breakpoints.down("sm")]: {
                    width: "90%",
                  },
                }}
              >
                <Select_cursos_home
                  key={e?.id}
                  nombre={e?.nombre}
                  id={e?.id}
                  detalles={e.detalles}
                />
              </Grid2>
            ))}
          </>
        )}
      </Grid2>
    </>
  );
};

export default Content;
