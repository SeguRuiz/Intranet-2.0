import "./Add_sedes.css";
import Retractile_menu from "../../Retractile_menu/Retractile_menu";
import { useFetch } from "../../../../services/llamados";
import { useRef } from "react";
import { add_sedes } from "../../../../redux/ControlUsuariosSlice";
import { useDispatch } from "react-redux";
import { useCustomNotis } from "../../../../utils/customHooks";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { getCookie } from "../../../../utils/Cookies";
import { toast } from "react-toastify";
const Add_sedes = () => {
  const { ok, error, fetching, fetch_the_data } = useFetch();
  const warning_toast = () =>
    toast.warning("El nombre de una sede debe ser de 5 caracteres o más");
  const { ok_mensaje, error_mensaje } = useCustomNotis(
    "ocurrio un error",
    "La sede fue creada"
  );

  const accion = useDispatch();
  const sede_nombre_inpt = useRef();
  const sede_ubicacion_inpt = useRef();
  const form_ref = useRef();
  const token = getCookie("token");

  const subir_sede = async (o) => {
    o.preventDefault();
    const sede_nombre_value = sede_nombre_inpt.current.value.trim();

    const sede_ubicacion_value = sede_ubicacion_inpt.current.value.trim();

    if (sede_nombre_value.length < 5) {
      warning_toast();
      return;
    }

    if (sede_nombre_value != "" && sede_ubicacion_value != "") {
      const data = await fetch_the_data(
        "http://localhost:8000/cursos/sedes",
        token,
        "POST",
        {
          nombre: sede_nombre_value,
          ubicacion: sede_ubicacion_value,
        }
      );
      data == undefined && error_mensaje();

      if (data[0] == 201) {
        ok_mensaje();
        accion(add_sedes(data[1]));
        form_ref.current.reset();
      } else {
        error_mensaje();
      }
    }
  };

  return (
    <>
      <Retractile_menu
        titulo="Sedes"
        altura={31}
        ok={ok}
        loading={fetching}
        error={error}
      >
        <form className="add-sedes-form" onSubmit={subir_sede} ref={form_ref}>
          <TextField
            label={"Nombre"}
            inputRef={sede_nombre_inpt}
            required
            size="small"
            variant="standard"
          />
          <TextField
            required
            label="Ubicacion"
            inputRef={sede_ubicacion_inpt}
            size="small"
            variant="standard"
          />
          <Button type="submit">Subir</Button>
        </form>
      </Retractile_menu>
    </>
  );
};

export default Add_sedes;
