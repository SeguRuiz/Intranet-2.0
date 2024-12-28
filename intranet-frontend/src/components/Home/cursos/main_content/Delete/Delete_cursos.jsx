import React from "react";
import { MenuItem } from "@mui/material";
import { useFetch } from "../../../../../services/llamados";
import { getCookie } from "../../../../../utils/Cookies";
import { eliminar_curso } from "../../../../../redux/modalSlice";
import { useDispatch } from "react-redux";

export const Delete_cursos = ({ id }) => {
  const token = getCookie("token");
  const { fetch_the_data } = useFetch();
  const accion = useDispatch();

  const eliminar_curso_back = async () => {
    const data = await fetch_the_data(
      "https://intranet-2-0-api.onrender.com/cursos/cursos_edit",
      token,
      "DELETE",
      null,
      id
    );
    console.log(data);

    accion(eliminar_curso({ curso_id: id }));
  };
  return <MenuItem onClick={eliminar_curso_back}>Eliminar</MenuItem>;
};
