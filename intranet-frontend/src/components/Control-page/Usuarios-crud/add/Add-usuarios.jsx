import { useFetch } from "../../../../services/llamados";
import Retractile_menu from "../../Retractile_menu/Retractile_menu";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { agregar_usuarios } from "../../../../redux/ControlUsuariosSlice";
import { useCustomNotis } from "../../../../utils/customHooks";
import { set_fetching } from "../../../../redux/FetchsSlice";
import { Input, TextField } from "@mui/material";
import "./Add_users.css";
import { useEffect, useRef } from "react";
import { Button } from "@mui/material";
import { getCookie } from "../../../../utils/Cookies";

const Add_usuarios = () => {
  const { fetch_the_data, fetching, ok, error } = useFetch();
  const { ok_mensaje, error_mensaje } = useCustomNotis(
    "Ocurrio un error",
    "El usuario se agrego con exito"
  );

  const accion = useDispatch();
  const nombre_inpt = useRef();
  const apellidos_inpt = useRef();
  const email_inpt = useRef();
  const cedula_inpt = useRef();
  const nombre_usuario_inpt = useRef();
  const form_ref = useRef();
  const token = getCookie("token");

  useEffect(() => {
    accion(set_fetching(fetching));
  }, [fetching, accion]);

  const agregar_usuario = async (o) => {
    o.preventDefault();
    const nombre = nombre_inpt.current.value.trim();
    const nombre_usuario = nombre_usuario_inpt.current.value.trim();
    const apellidos = apellidos_inpt.current.value.trim();
    const email = email_inpt.current.value.trim();
    const cedula = cedula_inpt.current.value.trim();
    if (
      email != "" &&
      nombre != "" &&
      apellidos != "" &&
      cedula != "" &&
      nombre_usuario != ""
    ) {
      const data = await fetch_the_data(
        "http://localhost:8000/api/register",
        token,
        "POST",
        {
          first_name: nombre,
          username: nombre_usuario,
          last_name: apellidos,
          email: email,
          cedula: cedula,
          password: "default",
        }
      );
      data == undefined && error_mensaje();
      console.log(data);

      if (data[0] == 201) {
        ok_mensaje();
        accion(agregar_usuarios(data[1]?.user));
        form_ref.current.reset();
      } else {
        error_mensaje();
      }
    }
  };
  return (
    <>
      <Retractile_menu
        altura={60}
        titulo={"Usuarios"}
        loading={fetching}
        ok={ok}
        error={error}
      >
        <form
          className="Add-users-forms"
          onSubmit={agregar_usuario}
          ref={form_ref}
        >
          <TextField
            label={"Nombre"}
            inputRef={nombre_inpt}
            variant="standard"
            size="small"
            required
          />
          <TextField
            label={"Nombre de usuario"}
            inputRef={nombre_usuario_inpt}
            variant="standard"
            size="small"
            required
          />
          <TextField
            label={"Apellidos"}
            inputRef={apellidos_inpt}
            variant="standard"
            size="small"
            required
          />
          <TextField
            type="email"
            label={"Email"}
            required
            inputRef={email_inpt}
            variant="standard"
            size="small"
          />
          <TextField
            type="number"
            label={"Cedula"}
            required
            inputRef={cedula_inpt}
            variant="standard"
            size="small"
          />
          <Button type="submit">Subir</Button>
        </form>
      </Retractile_menu>
    </>
  );
};

export default Add_usuarios;
