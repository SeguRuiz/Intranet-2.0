import "./Read_usuarios.css";
import Select_usuarios from "./Select_usuarios";
import { useSelector } from "react-redux";
import { useFetch } from "../../../../services/llamados";
import { set_usuarios } from "../../../../redux/ControlUsuariosSlice";
import { useEffect } from "react";
import { getCookie } from "../../../../utils/Cookies";
import { useDispatch } from "react-redux";
import { set_empty } from "../../../../redux/ControlUsuariosSlice";
const Read_usuarios = () => {
  const { fetch_the_data } = useFetch();
  const { usuarios, pestaña_seleccionada } = useSelector(
    (state) => state.ControlUsuarios
  );

  const accion = useDispatch();
  const token = getCookie("token");

  useEffect(() => {
    accion(set_empty(usuarios[0] == undefined));
  }, [usuarios, pestaña_seleccionada]);

  useEffect(() => {
    (async () => {
      const data = await fetch_the_data(
        "https://intranet-2-0-api.onrender.com/api/user",
        token,
        "GET"
      );
      console.log(data);

      accion(set_usuarios(data[1]));
    })();
  }, []);

  return (
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
  );
};

export default Read_usuarios;
