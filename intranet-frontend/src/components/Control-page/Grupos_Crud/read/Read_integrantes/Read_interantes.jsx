import "./Read_integrantes.css";
import { useSelector } from "react-redux";
import Select_integrantes from "./Select_integrantes";

const Read_interantes = ({ usuarios_grupo, grupo_id }) => {
  const { usuarios } = useSelector((e) => e.ControlUsuarios);

  const usuarios_filtrados = () => {
    const filtrado = []
    if (usuarios_grupo[0] != undefined) {
      usuarios_grupo.forEach((e) => {
        const usuario = usuarios.find(x => x.id == e) ?? false
        usuario != false && filtrado.push(usuario)
      });
      return filtrado
    }
    return filtrado
  };

  return (
    <>
      {usuarios_filtrados().map((user) => (
        <Select_integrantes
          key={user?.id}
          nombre={user?.first_name}
          apellidos={user?.last_name}
          cedula={user?.cedula}
          nombre_usuario={user?.username}
          email={user?.email}
          grupo_id={grupo_id}
          user_id={user?.id}
        />
      ))}
    </>
  );
};

export default Read_interantes;
