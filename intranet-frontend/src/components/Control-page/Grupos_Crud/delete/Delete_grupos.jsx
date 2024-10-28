import { useFetch } from "../../../../services/llamados";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { vaciar_ids_temporales } from "../../../../redux/ControlUsuariosSlice";
import { set_grupos } from "../../../../redux/ControlUsuariosSlice";
import { set_fetching } from "../../../../redux/FetchsSlice";
import { useCustomNotis } from "../../../../utils/customHooks";
import { getCookie } from "../../../../utils/Cookies";
import { set_usuarios_en_grupos } from "../../../../redux/ControlUsuariosSlice";

const Delete_grupos = () => {
  const { seleccion_multiple_grupos, grupos, usuarios_en_grupos } = useSelector(
    (e) => e.ControlUsuarios
  );
  const { ok_mensaje, error_mensaje } = useCustomNotis(
    "ocurrio un error",
    "Se eliminaron correctamente"
  );

  const accion = useDispatch();

  const { fetch_the_data } = useFetch();
  const token = getCookie("token");

  const eliminar_lista_usuarios = async () => {
    accion(set_fetching(true));

    const data = await fetch_the_data(
      "http://localhost:8000/cursos/eliminar_lista_grupos",
      token,
      "DELETE",
      {
        grupos: seleccion_multiple_grupos,
      }
    );
    data == undefined && error_mensaje();

    if (data[0] == 200) {
      ok_mensaje();
      let grupos_copia = [...grupos];
      let usuarios_copia = [...usuarios_en_grupos];
      seleccion_multiple_grupos.forEach((e) => {
        const grupos_filtrados = grupos_copia.filter((x) => x.id != e);
        const usuarios_filtrados = usuarios_copia.filter(
          (x) => x.grupo_id != e
        );
        usuarios_copia = usuarios_filtrados;
        grupos_copia = grupos_filtrados;
      });
      accion(set_grupos(grupos_copia));
      accion(set_usuarios_en_grupos(usuarios_copia));
      accion(vaciar_ids_temporales("grupos"));
      accion(set_fetching(false));
    } else {
      error_mensaje();
    }
  };
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="30px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="var(--OnSecondary-color)"
        onClick={eliminar_lista_usuarios}
      >
        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
      </svg>
    </>
  );
};

export default Delete_grupos;
