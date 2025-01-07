import { useSelector } from "react-redux"; // Hook para acceder al estado de Redux
import Role_options from "./Role_options"; // Componente para mostrar opciones de rol
import { useFetch } from "../../../services/llamados"; // Hook personalizado para realizar solicitudes
import { useEffect, useLayoutEffect, useRef } from "react"; // Hooks de React
import { useDispatch } from "react-redux"; // Hook para despachar acciones de Redux
import { set_roles } from "../../../redux/ControlUsuariosSlice"; // Acción para establecer los roles
import { set_user_rol } from "../../../redux/ControlUsuariosSlice"; // Acción para establecer el rol de un usuario
import "./Select_role.css"; // Importa el archivo de estilos CSS
import { getCookie } from "../../../utils/Cookies"; // Función para obtener cookies
import { setRolUser } from "../../../redux/AuthSlice"; // Acción para establecer el rol del usuario en sesión

const Select_role = ({ user_id, rol_de_usuario_id }) => {
  const { roles } = useSelector((state) => state.ControlUsuarios); // Obtiene los roles del estado de Redux
  const { userInSession } = useSelector((e) => e.Auth); // Obtiene el usuario en sesión desde el estado de Redux
  const { fetch_the_data } = useFetch(); // Hook para realizar solicitudes
  const accion = useDispatch(); // Hook para despachar acciones
  const select_ref = useRef(); // Referencia al elemento select
  const token = getCookie("token"); // Obtiene el token de la cookie

  // Efecto que se ejecuta al montar el componente
  useEffect(() => {
    (async () => {
      const data = await fetch_the_data(
        "http://localhost:8000/api/roles",
        token,
        "GET"
      );

      if (data[0] == 200) {
        console.log(data);
        
        accion(set_roles(data[1]));
      }

    })();
  }, []);

  // Función para asignar un rol al usuario
  const asignar_rol = async () => {
    const data = await fetch_the_data(
      "http://localhost:8000/api/asignar_rol_a",
      token,
      "PATCH", // Realiza una solicitud PATCH para asignar un rol
      {
        rol: select_ref.current.value, // Envía el rol seleccionado
      },
      user_id // Incluye el ID del usuario
    );
    const rol = roles.filter((x) => x.id == data[1].rol_id); // Filtra los roles para obtener el rol asignado
    userInSession.id == user_id &&
      accion(setRolUser({ rol_id: data[1].rol_id, rol_tipo: rol[0].tipo })); // Actualiza el rol del usuario en sesión si es el mismo usuario
    accion(set_user_rol({ rol_id: data[1].rol_id, usuario_id: user_id })); // Actualiza el rol del usuario en Redux
  };

  return (
    <select onChange={asignar_rol} ref={select_ref} className="select-role">
      {rol_de_usuario_id == null ? ( // Muestra "sin rol" si no tiene rol asignado
        <option value={"Sin rol"} selected>
          sin rol
        </option>
      ) : (
        <></>
      )}
      {roles.map(
        (
          rol,
          i // Mapea los roles y crea opciones
        ) => (
          <Role_options
            key={rol?.id ?? i} // Usa el ID del rol o el índice como clave
            value={rol?.tipo ?? "default"} // Valor de la opción
            user_id={user_id} // ID del usuario
            rol_id={rol_de_usuario_id} // ID del rol de usuario
            id={rol?.id} // ID del rol
          />
        )
      )}
    </select>
  );
};

export default Select_role; // Exporta el componente
