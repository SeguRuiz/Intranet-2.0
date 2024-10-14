import "./Add_sedes.css";
import Retractile_menu from "../../Retractile_menu/Retractile_menu";
import { useFetch } from "../../../../services/llamados";
import { useRef } from "react";
import { add_sedes } from "../../../../redux/ControlUsuariosSlice";
import { useDispatch } from "react-redux";
const Add_sedes = () => {
  const { ok, error, fetching, fetch_the_data, define_fetch } = useFetch();
  const token = sessionStorage.getItem("token");
  const accion = useDispatch();
  const sede_nombre_inpt = useRef();
  const sede_ubicacion_inpt = useRef();
  const form_ref = useRef();

  const subir_sede = async (o) => {
    o.preventDefault();
    const sede_nombre_value = sede_nombre_inpt.current.value.trim();

    const sede_ubicacion_value = sede_ubicacion_inpt.current.value.trim();

    if (sede_nombre_value != "" && sede_ubicacion_value != "") {
      define_fetch("http://localhost:8000/cursos/sedes", "", "POST", {
        nombre: sede_nombre_value,
        ubicacion: sede_ubicacion_value,
      });
      const data = await fetch_the_data(token);
       console.log(data);
       
      if (data[0] == 201) {
        accion(add_sedes(data[1]));
        form_ref.current.reset();
      }
    }
  };

  return (
    <>
      <Retractile_menu
        titulo="Sedes"
        altura={22}
        ok={ok}
        loading={fetching}
        error={error}
      >
        <form className="add-sedes-form" onSubmit={subir_sede} ref={form_ref}>
          <input type="text" placeholder="Nombre" ref={sede_nombre_inpt} />
          <input
            type="text"
            placeholder="Ubicacion"
            ref={sede_ubicacion_inpt}
          />
          <button>Subir</button>
        </form>
      </Retractile_menu>
    </>
  );
};

export default Add_sedes;
