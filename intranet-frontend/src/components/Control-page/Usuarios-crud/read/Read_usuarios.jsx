import "./Read_usuarios.css";
import Select_usuarios from "./Select_usuarios";
import { useSelector } from "react-redux";
import { useFetch } from "../../../../services/llamados";
import { set_usuarios } from "../../../../redux/ControlUsuariosSlice";
import { useEffect, useState } from "react";
import { getCookie } from "../../../../utils/Cookies";
import { useDispatch } from "react-redux";
import { set_roles } from "../../../../redux/ControlUsuariosSlice";
import { Paper } from "@mui/material";
import { set_empty } from "../../../../redux/ControlUsuariosSlice";

import UsuariosLoader from "./UsuariosLoader";
const Read_usuarios = () => {
  const { fetch_the_data, fetching } = useFetch();
  const [f, setF] = useState(false);

  const { usuarios, roles } = useSelector((state) => state.ControlUsuarios);

  const accion = useDispatch();
  const token = getCookie("token");

  useEffect(() => {
    accion(set_empty(usuarios.length == 0 && !f));
  }, [usuarios, f]);

  useEffect(() => {
    (async () => {
      setF(true);
      if (roles.length == 0 || usuarios.length == 0) {
        const [usuarios, roles] = await Promise.all([
          fetch_the_data("http://localhost:8000/api/user", token, "GET"),
          fetch_the_data("http://localhost:8000/api/roles", token, "GET"),
        ]);

        if (roles[0] == 200 && usuarios[0] == 200) {
          accion(set_usuarios(usuarios[1]));
          accion(set_roles(roles[1]));
          setF(false);
        }
      }
      setF(false);
    })();
  }, []);

  return (
    <>
      {f ? (
        <UsuariosLoader />
      ) : (
        <>
          {usuarios.map((usuario) => (
            <Select_usuarios
              nombre={usuario?.first_name}
              username={usuario?.username}
              key={usuario?.id}
              user_id={usuario?.id}
              rol_id={usuario?.rol_id}
              apellidos={usuario.last_name}
              cedula={usuario.cedula}
              email={usuario.email}
            />
          ))}
        </>
      )}
    </>
  );
};

export default Read_usuarios;
