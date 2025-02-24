import { Box } from "@mui/material";
import Noticias_lista from "./read/editRead/Noticias_lista";
import Agregar_noticia from "./add/Agregar_noticia";
import { getCookie } from "../../utils/Cookies";
import { useFetch } from "../../services/llamados";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setAvisos } from "../../redux/Avisos";
const Edit_noticias_page = () => {
  const token = getCookie("token");
  const { fetch_the_data } = useFetch();
  const {avisos} = useSelector(x => x.Avisos)
  const accion = useDispatch()
  

  useEffect(() => {
    (async () => {
      const data = await fetch_the_data(
        "http://localhost:8000/cursos/obtener_avisos",
        token,
        "GET"
      );

      data == undefined && toast.error("ocurrio un error trayendo los avisos");

      if (data[0] == 200) {
       accion(setAvisos(data[1]))

        return;
      }

      toast.error("ocurrio un error trayendo los avisos");
    })();
  }, []);
  return (
    <>
      <Box
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Noticias_lista avisos={avisos} />
        <Agregar_noticia />
      </Box>
    </>
  );
};

export default Edit_noticias_page;
