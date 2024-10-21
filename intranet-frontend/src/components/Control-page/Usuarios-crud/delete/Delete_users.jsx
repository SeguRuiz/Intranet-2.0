import { useSelector } from "react-redux";
import { useFetch } from "../../../../services/llamados";
import { set_usuarios } from "../../../../redux/ControlUsuariosSlice";
import { vaciar_ids_temporales } from "../../../../redux/ControlUsuariosSlice";
import { useDispatch } from "react-redux";
import { set_fetching } from "../../../../redux/FetchsSlice";
import { useCustomNotis } from "../../../../utils/customHooks";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { getCookie } from "../../../../utils/Cookies";
const Delete_users = () => {
  const { seleccion_multiple, usuarios } = useSelector(
    (e) => e.ControlUsuarios
  );
  const accion = useDispatch();
  const token = getCookie("token");

  const { ok_mensaje, error_mensaje } = useCustomNotis(
    "Ocurrio un error",
    "Se eliminaron correctamente"
  );

  const { fetch_the_data, fetching, ok } = useFetch();

  useEffect(() => {
    accion(set_fetching(fetching));
  }, [fetching]);

  const eliminar_lista_usuarios = async () => {
    const data = await fetch_the_data(
      "http://localhost:8000/api/eliminar_lista_usuarios",
      token,
      "DELETE",
      {
        usuarios: seleccion_multiple,
      }
    );
    data == undefined && error_mensaje();
    if (data[0] == 200) {
      let usuarios_copia = [...usuarios];
      seleccion_multiple.forEach((e) => {
        const usuarios_filtered = usuarios_copia.filter((x) => x.id != e);
        usuarios_copia = usuarios_filtered;
      });
      accion(set_usuarios(usuarios_copia));
      accion(vaciar_ids_temporales("usuarios"));
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

export default Delete_users;
