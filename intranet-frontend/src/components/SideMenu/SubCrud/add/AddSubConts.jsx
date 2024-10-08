import React, { useRef, useState } from "react";
import { useFetch } from "../../../../services/llamados";
import { addSubcontenido } from "../../../../redux/CursosContenidosSlice";
import { useDispatch } from "react-redux";
import './AddSubConts.css'
const AddSubConts = ({ Contenido_id }) => {
  const [error, setError] = useState(false)
  const input_ref = useRef();
  const accion = useDispatch();
  const { define_fetch, fetch_the_data_without_token } = useFetch();

  const addSubCont = async (o) => {
    o.preventDefault()
    const input_value = input_ref.current.value.trim()
    if (input_value != '') {
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
          input_ref.current.value = ''
          return
    }
    setError(true)
    setTimeout(() => {
        setError(false)
    }, 1000);
  };
  return (
    <form
      className="addSubConts-form"
      style={{ height: "10vh", border: "solid black 1.5px"  }}
      onSubmit={addSubCont}
    >
      <input type="text" name="" id="" ref={input_ref} placeholder={error ? 'No debe estar en blanco' : 'nombra tu subcontenido'} />
      <button>agregar</button>
    </form>
  );
};

export default AddSubConts;
