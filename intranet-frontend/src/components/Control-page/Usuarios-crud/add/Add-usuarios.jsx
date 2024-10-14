import { useFetch } from "../../../../services/llamados";
import Retractile_menu from "../../Retractile_menu/Retractile_menu";
import uuid from "react-uuid";
import { useDispatch } from "react-redux";
import { agregar_usuarios } from "../../../../redux/ControlUsuariosSlice";

import "./Add_users.css";
import { useRef } from "react";
const Add_usuarios = () => {
  const { define_fetch, fetch_the_data, fetching, ok, error } = useFetch();
  const token = sessionStorage.getItem("token");
  const accion = useDispatch();
  const nombre_inpt = useRef();
  const apellidos_inpt = useRef();
  const email_inpt = useRef();
  const cedula_inpt = useRef();
  const nombre_usuario_inpt = useRef();
  const form_ref = useRef();

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
      define_fetch("http://localhost:8000/api/register", "", "POST", {
        first_name: nombre,
        username: nombre_usuario,
        last_name: apellidos,
        email: email,
        cedula: cedula,
        password: "default",
      });
      const data = await fetch_the_data(token);
      console.log(data);
      
      if (data[0] == 201) {
        accion(agregar_usuarios(data[1]?.user));
        form_ref.current.reset();
      }
    }
  };
  return (
    <Retractile_menu
      altura={38}
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
        <input type="text" placeholder="nombre" required ref={nombre_inpt} />
        <input
          type="text"
          placeholder="nombre de usuario"
          required
          ref={nombre_usuario_inpt}
        />
        <input
          type="text"
          placeholder="apellidos"
          required
          ref={apellidos_inpt}
        />
        <input type="email" placeholder="email" required ref={email_inpt} />
        <input type="number" placeholder="cedula" required ref={cedula_inpt} />
        <button className="add-user-btn">Subir</button>
      </form>
    </Retractile_menu>
  );
};

export default Add_usuarios;
