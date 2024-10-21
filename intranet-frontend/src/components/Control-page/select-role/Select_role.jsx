import { useSelector } from "react-redux";
import Role_options from "./Role_options";
import { useFetch } from "../../../services/llamados";
import { useLayoutEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { set_roles } from "../../../redux/ControlUsuariosSlice";
import { set_user_rol } from "../../../redux/ControlUsuariosSlice";
import "./Select_role.css";
import { getCookie } from "../../../utils/Cookies";
import { setRolUser } from "../../../redux/AuthSlice";

const Select_role = ({ user_id, rol_de_usuario_id }) => {
  const { roles } = useSelector((state) => state.ControlUsuarios);
  const { userInSession } = useSelector((e) => e.Auth);
  const { fetch_the_data } = useFetch();
  const accion = useDispatch();
  const select_ref = useRef();
  const token = getCookie("token");

  useLayoutEffect(() => {
    (async () => {
      const data = await fetch_the_data(
        "http://localhost:8000/api/roles",
        token,
        "GET"
      );
      accion(set_roles(data[1]));
    })();
  }, []);

  const asignar_rol = async () => {
    const data = await fetch_the_data(
      "http://localhost:8000/api/asignar_rol_a",
      token,
      "PATCH",
      {
        rol: select_ref.current.value,
      },
      user_id
    );
    const rol = roles.filter((x) => x.id == data[1].rol_id);
    userInSession.id == user_id &&
      accion(setRolUser({ rol_id: data[1].rol_id, rol_tipo: rol[0].tipo }));
    accion(set_user_rol({ rol_id: data[1].rol_id, usuario_id: user_id }));
  };

  return (
    <select onChange={asignar_rol} ref={select_ref} className="select-role">
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
