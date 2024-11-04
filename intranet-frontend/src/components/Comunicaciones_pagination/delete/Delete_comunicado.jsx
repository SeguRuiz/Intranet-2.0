import { useFetch } from "../../../services/llamados";
import { getCookie } from "../../../utils/Cookies";
import { eliminar_avisos } from "../../../redux/ComunicacionesSlice";
import { useDispatch, useSelector } from "react-redux";

const Delete_comunicado = ({ id }) => {
  const { fetch_the_data } = useFetch();
  const { userInSession } = useSelector((x) => x.Auth);
  const accion = useDispatch();
  const token = getCookie("token");
  const eliminar_aviso = async () => {
    const data = await fetch_the_data(
      "http://localhost:8000/cursos_contenidos/comunicados_edit",
      token,
      "DELETE",
      null,
      id + "/"
    );
    accion(eliminar_avisos({ id: id }));
  };

  return (
    <>
      {userInSession?.is_staff && (
        <div className="edit-asunto-options" onClick={eliminar_aviso}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="25px"
            viewBox="0 -960 960 960"
            width="25px"
            fill="var(--OnSecondary-color)"
          >
            <path d="M261-120q-24 0-42-18t-18-42v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm106-146h60v-399h-60v399Zm166 0h60v-399h-60v399Z" />
          </svg>
        </div>
      )}
    </>
  );
};

export default Delete_comunicado;
