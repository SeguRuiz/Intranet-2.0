import { useSelector } from "react-redux";
import { useFetch } from "../../../../services/llamados";
import { set_usuarios } from "../../../../redux/ControlUsuariosSlice";
import { vaciar_ids_temporales } from "../../../../redux/ControlUsuariosSlice";
import { useDispatch } from "react-redux";
const Delete_users = () => {
  const { seleccion_multiple, usuarios } = useSelector(
    (e) => e.ControlUsuarios
  );
  const accion = useDispatch();
  const token = sessionStorage.getItem("token");
  const { define_fetch, fetch_the_data, fetching } = useFetch();

  const eliminar_lista_usuarios = async () => {
    define_fetch(
      "http://localhost:8000/api/eliminar_lista_usuarios",
      "",
      "DELETE",
      {
        usuarios: seleccion_multiple,
      }
    );
    const data = await fetch_the_data(token);
    console.log(data);
    let usuarios_copia = [...usuarios];
    seleccion_multiple.forEach((e) => {
      const usuarios_filtered = usuarios_copia.filter((x) => x.id != e.user_id);
      usuarios_copia = usuarios_filtered;
    });
    accion(set_usuarios(usuarios_copia));
    accion(vaciar_ids_temporales('usuarios'))
  };

  return (
    <>
      
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="30px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#9AA0A6"
          onClick={eliminar_lista_usuarios}
        >
          <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
        </svg>
     
    </>
  );
};

export default Delete_users;
