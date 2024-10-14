import { useSelector } from "react-redux";
import Role_options from "./Role_options";
import { useFetch } from "../../../services/llamados";
import { useLayoutEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { set_roles } from "../../../redux/ControlUsuariosSlice";
import { set_user_rol } from "../../../redux/ControlUsuariosSlice";

const Select_role = ({ user_id, rol_de_usuario_id }) => {
  const { roles } = useSelector((state) => state.ControlUsuarios);
  const { define_fetch, fetch_the_data } = useFetch();
  const token = sessionStorage.getItem('token')
  const accion = useDispatch();
  const select_ref = useRef();
  
  useLayoutEffect(() => {
    (async () => {
      define_fetch("http://localhost:8000/api/roles", "", "GET");
      const data = await fetch_the_data(token);
      accion(set_roles(data[1]));
    })();
  }, []);

  const asignar_rol = async () => {
    define_fetch("http://localhost:8000/api/asignar_rol_a", user_id, "PATCH", {
      rol: select_ref.current.value,
    });
    const data = await fetch_the_data(token);
    accion(set_user_rol({ rol_id: data[1].rol_id, usuario_id: user_id }));
  };

  return (
    <select onChange={asignar_rol} ref={select_ref}>
      {rol_de_usuario_id == null ? (
        <option value={"Sin rol"} selected>
          sin rol
        </option>
      ) : (
        <></>
      )}
      {roles.map((rol, i) => (
        <Role_options
          key={rol?.id ?? i}
          value={rol?.tipo ?? "default"}
          user_id={user_id}
          rol_id={rol_de_usuario_id}
          id={rol?.id}
        />
      ))}
    </select>
  );
};

export default Select_role;
