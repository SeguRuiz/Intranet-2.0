import { useFetch } from "../../../../../services/llamados";
import { eliminar_integrantes } from "../../../../../redux/ControlUsuariosSlice";
import { useDispatch } from "react-redux";
import { useCustomNotis } from "../../../../../utils/customHooks";
import "./Delete_integrantes.css";
import { closeModal } from "../../../../../redux/modalSlice";
import { getCookie } from "../../../../../utils/Cookies";
import { eliminar_usuarios_en_grupo } from "../../../../../redux/ControlUsuariosSlice";

const Deelete_integrantes = ({ grupo_id, integrante_id }) => {
  const { fetch_the_data } = useFetch();
  const { error_mensaje } = useCustomNotis("A ocurrido un error");
  const accion = useDispatch();
  const token = getCookie("token");

  const eliminar_integrante = async () => {
    console.log(integrante_id, grupo_id);

    const data = await fetch_the_data(
      "http://localhost:8000/cursos/eliminar_integrantes",
      token,
      "DELETE",
      {
        grupo_id: grupo_id,
        integrante_id: integrante_id,
      }
    );
    data == undefined && error_mensaje();
     
    if (data[0] == 200) {
      accion(
        eliminar_integrantes({
          grupo_id: grupo_id,
          integrante_id: integrante_id,
        })
      );
      accion(
        eliminar_usuarios_en_grupo({
          grupo_id: grupo_id,
          usuario_id: integrante_id,
        })
      );
    } else {
      error_mensaje();
    }
  };

  return (
    <button onClick={eliminar_integrante} className="delete-integrante-btn">
      Remover
    </button>
  );
};

export default Deelete_integrantes;
