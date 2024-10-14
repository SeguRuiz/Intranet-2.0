import "./Read_usuarios.css";
import Select_usuarios from "./Select_usuarios";
import { useSelector } from "react-redux";
const Read_usuarios = () => {
  const { usuarios } = useSelector((state) => state.ControlUsuarios);
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
