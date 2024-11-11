import "./AddCurso.css";
import { useFetch } from "../../../../../services/llamados";
import {  useState, useRef } from "react";
import { setCursos } from "../../../../../redux/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "../../../../../utils/Cookies";
import { Button } from "@mui/material";
import { Tooltip } from "@mui/material";
import {
  useCustomModal,
  useCustomNotis,
} from "../../../../../utils/customHooks";
import Retractile_menu from "../../../../Control-page/Retractile_menu/Retractile_menu";
import { TextField } from "@mui/material";

const AddCurso = () => {
  const { fetch_the_data } = useFetch();
  const { userInSession } = useSelector((x) => x.Auth);
  const [error, setError] = useState("");
  const { ok_mensaje, error_mensaje } = useCustomNotis(
    "Ocurrio un error",
    "Se agrego correctamente"
  );
  const dlg_ref = useRef();
  const token = getCookie("token");
  const { openModal, closeModalDlg, closeModal } = useCustomModal(dlg_ref);
  const ref_input = useRef();
  const form_ref = useRef();
  const accion = useDispatch();

  const subirDatosCursos = async (evento) => {
    evento.preventDefault();
    const valor_input = ref_input.current.value.trim();

    if (valor_input != "") {
      const data = await fetch_the_data(
        "http://localhost:8000/cursos/cursos",
        token,
        "POST",
        { nombre: valor_input }
      );

      if (data[0] == 201 && data != undefined) {
        ok_mensaje();
        accion(setCursos(data[1]));
        form_ref.current.reset();
        closeModal();
      } else {
        error_mensaje();
      }
      return;
    }

    setError("El espacio no puede estar en blanco");
    setTimeout(() => {
      setError("");
    }, 3000);
  };

  return (
    <>
      {userInSession?.is_staff && (
        <Tooltip title="Agregar curso">
          <Button onClick={openModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="30px"
              viewBox="0 -960 960 960"
              width="30px"
              fill="var(--OnPrymary-color)"
            >
              <path d="M510-378h60v-132h132v-60H570v-132h-60v132H378v60h132v132ZM260-200q-24 0-42-18t-18-42v-560q0-24 18-42t42-18h560q24 0 42 18t18 42v560q0 24-18 42t-42 18H260ZM140-80q-24 0-42-18t-18-42v-620h60v620h620v60H140Z" />
            </svg>
          </Button>
        </Tooltip>
      )}
      <dialog
        ref={dlg_ref}
        onClick={closeModalDlg}
        className="add_cursos_modal"
      >
        <div className="agrear-curso-content">
          <Retractile_menu titulo="Agrega un curso" altura={26}>
            <form
              onSubmit={subirDatosCursos}
              className="add-cursos-form"
              ref={form_ref}
            >
              <TextField
                type="text"
                label="Nombre Curso"
                inputRef={ref_input}
                fullWidth
                variant="standard"
                required
                error={error != ""}
                helperText={error}
              />
              <Button type="submit" variant="text" style={{ alignSelf: "end" }}>
                agregar
              </Button>
            </form>
          </Retractile_menu>
        </div>
      </dialog>
    </>
  );
};

export default AddCurso;
