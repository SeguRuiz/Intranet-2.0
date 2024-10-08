import React, { useRef, useState } from "react";
import { useFetch } from "../../../../services/llamados";
import { addSubcontenido } from "../../../../redux/CursosContenidosSlice";
import { useDispatch } from "react-redux";
import "./AddSubConts.css";
const AddSubConts = ({ Contenido_id }) => {
  const [error, setError] = useState(false);
  const input_ref = useRef();
  const accion = useDispatch();
  const { define_fetch, fetch_the_data_without_token } = useFetch();

  const addSubCont = async (o) => {
    o.preventDefault();
    const input_value = input_ref.current.value.trim();
    if (input_value != "") {
      define_fetch(
        "http://localhost:8000/cursos_contenidos/subcontenidos",
        "",
        "POST",
        {
          nombre: input_ref.current.value.trim(),
          contenido: Contenido_id,
        }
      );
      const data = await fetch_the_data_without_token();
      console.log(data);
      accion(addSubcontenido({ contenido_id: Contenido_id, data: data[1] }));
      input_ref.current.value = "";
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
    >
      <input
        type="text"
        className="add-subcont-inpt"
        ref={input_ref}
        placeholder={
          error ? "No debe estar en blanco" : "nombra tu subcontenido"
        }
      />
      <button className="add-subcont-btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="35px"
          viewBox="0 -960 960 960"
          width="38px"
          fill="#d3d3d3"
          className="add-subcont-icon"
        >
          <path d="M120-160v-640l760 320-760 320Zm66.67-102 520.66-218-520.66-220v158.67L428-480l-241.33 60v158Zm0 0v-438 438Z" />
        </svg>
      </button>
    </form>
  );
};

export default AddSubConts;
