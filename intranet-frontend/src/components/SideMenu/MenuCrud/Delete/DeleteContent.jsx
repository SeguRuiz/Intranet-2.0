import { useFetch } from "../../../../services/llamados";
import { deleteContenidos } from "../../../../redux/CursosContenidosSlice";
import { useDispatch } from "react-redux";
import { IconButton } from "@mui/material";
import "./DeleteContent.css";
import { getCookie } from "../../../../utils/Cookies";
const DeleteContent = ({ id, open = false }) => {
  const accion = useDispatch();
  const token = getCookie("token");
  const { fetch_the_data } = useFetch();

  const deleteC = async () => {
    fetch_the_data(
      "http://localhost:8000/cursos_contenidos/contenidos_edit",
      token,
      "DELETE",
      null,
      id
    );
    accion(deleteContenidos({ id: id }));
  };
  return (
    <IconButton onClick={deleteC}>
      {!open ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="30px"
          viewBox="0 -960 960 960"
          width="30px"
          fill="var(--OnSecondary-color)"
        >
          <path d="M261-120q-24.75 0-42.37-17.63Q201-155.25 201-180v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570ZM367-266h60v-399h-60v399Zm166 0h60v-399h-60v399ZM261-750v570-570Z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="30px"
          viewBox="0 -960 960 960"
          width="30px"
          fill="var(--OnsurfaceVariant)"
        >
          <path d="M261-120q-24 0-42-18t-18-42v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm106-146h60v-399h-60v399Zm166 0h60v-399h-60v399Z" />
        </svg>
      )}
    </IconButton>
  );
};

export default DeleteContent;
