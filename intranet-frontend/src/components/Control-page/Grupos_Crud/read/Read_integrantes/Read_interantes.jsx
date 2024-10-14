import "./Read_integrantes.css";
import { useSelector } from "react-redux";
import Select_integrantes from "./Select_integrantes";

const Read_interantes = () => {
  const { usuarios } = useSelector((e) => e.ControlUsuarios);

  return (
    <>
      {usuarios.map((user) => (
        <Select_integrantes
          key={user?.id}
          nombre={user?.first_name}
          apellidos={user?.last_name}
          cedula={user?.cedula}
          nombre_usuario={user?.username}
          email={user?.email}
        />
      ))}
    </>
  );
};

export default Read_interantes;
