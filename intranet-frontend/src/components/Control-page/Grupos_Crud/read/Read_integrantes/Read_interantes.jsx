import "./Read_integrantes.css";
import Select_integrantes from "./Select_integrantes";
import { useFetch } from "../../../../../services/llamados";
import { useEffect, useState } from "react";
import { getCookie } from "../../../../../utils/Cookies";
import { set_integrantes_de_grupo } from "../../../../../redux/ControlUsuariosSlice";
import { useDispatch, useSelector } from "react-redux";

const Read_interantes = ({ usuarios_grupo, grupo_id }) => {
  const accion = useDispatch();
  const [usuarios, set_usuarios] = useState([]);
  const { integrantes_de_grupo } = useSelector(
    (state) => state.ControlUsuarios
  );
  const token = getCookie("token");
  const { fetch_the_data } = useFetch();

  useEffect(() => {
    (async () => {
      const data = await fetch_the_data(
        "http://localhost:8000/cursos/obtener_integrantes_de_grupo",
        token,
        "POST",
        {
          ids_de_usuarios: usuarios_grupo,
        }
      );
     
      if (data[0] == 200) {
        accion(
          set_integrantes_de_grupo({ usuarios: data[1], grupo_id: grupo_id })
        );
        set_usuarios(integrantes_de_grupo);
      }
    })();
    return () => {
      set_usuarios([]);
    };
  }, []);

  return (
    <>
      {integrantes_de_grupo
        ?.find((x) => x.grupo_id == grupo_id)
        ?.usuarios.map((user) => (
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
