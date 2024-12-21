import { useFetch } from "../../../../services/llamados";
import { deleteSubcontenidos } from "../../../../redux/CursosContenidosSlice";
import { useDispatch } from "react-redux";
import { IconButton } from "@mui/material";
import { getCookie } from "../../../../utils/Cookies";
const DeleteSubCont = ({ id, contenido_id }) => {
  const { fetch_the_data } = useFetch();
  const token = getCookie("token");
  const accion = useDispatch();
  const deleteSubCont = async () => {
    const data = await fetch_the_data(
      "http://localhost:8000/cursos_contenidos/subcontenidos_edit",
      token,
      "DELETE",
      null,
      id
    );
    
    accion(
      deleteSubcontenidos({ contenidoId: contenido_id, subcontenidoId: id })
    );
  };
  return (
    <IconButton id={id} onClick={deleteSubCont}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="30px"
        viewBox="0 -960 960 960"
        width="30px"
        fill="var(--PrymaryContainer-color)"
      >
        <path d="M261-120q-24 0-42-18t-18-42v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm106-146h60v-399h-60v399Zm166 0h60v-399h-60v399Z" />
      </svg>
    </IconButton>
  );
};

export default DeleteSubCont;
