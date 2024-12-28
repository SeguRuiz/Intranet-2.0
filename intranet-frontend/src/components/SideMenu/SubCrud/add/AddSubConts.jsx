import React, { useRef, useState } from "react";
import { useFetch } from "../../../../services/llamados";
import { addSubcontenido } from "../../../../redux/CursosContenidosSlice";
import { useDispatch } from "react-redux";
import "./AddSubConts.css";
import { getCookie } from "../../../../utils/Cookies";
import { TextField } from "@mui/material";
import { IconButton } from "@mui/material";
const AddSubConts = ({ Contenido_id }) => {
  const [error, setError] = useState(false);
  const input_ref = useRef();
  const accion = useDispatch();
  const form_ref = useRef();
  const { fetch_the_data } = useFetch();
  const token = getCookie("token");

  const addSubCont = async (o) => {
    o.preventDefault();
    const input_value = input_ref.current.value.trim();
    if (input_value != "") {
      const data = await fetch_the_data(
        "https://intranet-2-0-api.onrender.com/cursos_contenidos/subcontenidos",
        token,
        "POST",
        { nombre: input_ref.current.value.trim(), contenido: Contenido_id }
      );
      console.log(data);
      accion(addSubcontenido({ contenido_id: Contenido_id, data: data[1] }));
      form_ref.current.reset();
      return;
    }
    setError(true);
    setTimeout(() => {
      setError(false);
    }, 1000);
  };
  return (
    <form
      className="addSubConts-form"
      style={{ height: "10vh" }}
      onSubmit={addSubCont}
      ref={form_ref}
    >
      <TextField
        label="Nombra tu subcontenido"
        inputRef={input_ref}
        variant="standard"
        size="big"
        error={error}
        sx={{ width: "60%" }}
      />
      <IconButton type="submit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="35px"
          viewBox="0 -960 960 960"
          width="35px"
          fill="var(--PrymaryContainer-color)"
        >
          <path d="M120-160v-640l760 320-760 320Zm66.67-102 520.66-218-520.66-220v158.67L428-480l-241.33 60v158Zm0 0v-438 438Z" />
        </svg>
      </IconButton>
    </form>
  );
};

export default AddSubConts;
