import React, { useRef } from "react";
import { useFetch } from "../../../../services/llamados";
import { addSubcontenido } from "../../../../redux/CursosContenidosSlice";
import { useDispatch } from "react-redux";
const AddSubConts = ({ Contenido_id }) => {
  const input_ref = useRef();
  const accion = useDispatch();
  const { define_fetch, fetch_the_data_without_token } = useFetch();

  const addSubCont = async (o) => {
    console.log(Contenido_id);
    
    o.preventDefault()
    define_fetch(
      "http://localhost:8000/cursos_contenidos/subcontenidos",
      "",
      "POST",
      {
        nombre: input_ref.current.value,
        contenido: Contenido_id,
      }
    );
    const data = await fetch_the_data_without_token();
    console.log(data);
    accion(addSubcontenido({ contenido_id: Contenido_id, data: data[1] }));
  };
  return (
    <form
      style={{ height: "10vh", border: "solid black 1.5px" }}
      onSubmit={addSubCont}
    >
      <input type="text" name="" id="" ref={input_ref} />
      <button>agregar</button>
    </form>
  );
};

export default AddSubConts;
