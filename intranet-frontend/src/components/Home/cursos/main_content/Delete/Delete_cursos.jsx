import React from "react";
import { CircularProgress, IconButton, MenuItem } from "@mui/material";
import { useFetch } from "../../../../../services/llamados";
import { getCookie } from "../../../../../utils/Cookies";
import { eliminar_curso } from "../../../../../redux/modalSlice";
import { useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";

export const Delete_cursos = ({ id }) => {
  const token = getCookie("token");
  const { fetch_the_data, fetching } = useFetch();
  const accion = useDispatch();

  const eliminar_curso_back = async () => {
    const data = await fetch_the_data(
      "http://localhost:8000/cursos/cursos_edit",
      token,
      "DELETE",
      null,
      id
    );
    

    accion(eliminar_curso({ curso_id: id }));
  };
  return (
    <IconButton disabled={fetching} onClick={eliminar_curso_back}>
      <DeleteIcon sx={{ color: "var(--OnPrymary-color)" }}>
        Eliminar
      </DeleteIcon>
      {fetching && (
        <CircularProgress
          sx={{ position: "absolute" }}
          size={20}
          color="inherit"
        />
      )}
    </IconButton>
  );
};
