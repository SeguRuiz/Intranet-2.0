import { useRef, useState } from "react";
import { useCustomModal } from "../../../../../utils/customHooks";
import { pushContenidos } from "../../../../../redux/CursosContenidosSlice";
import { useDispatch } from "react-redux";
import { useFetch } from "../../../../../services/llamados";
import { useParams } from "react-router-dom";
import { getCookie } from "../../../../../utils/Cookies";
import "./AddContent.css";
import { TextField } from "@mui/material";

export const AddCont = () => {
  const [abrir, setAbrir] = useState(false);
  const [helperText, setHelper] = useState("");

  const inputNombre = useRef();
  const form_ref = useRef();
  const { id_curso } = useParams();

  const { fetch_the_data } = useFetch();
  const accion = useDispatch();
  const token = getCookie("token");

  const subirContenido = async (o) => {
    o.preventDefault();
    const nombre_value = inputNombre.current.value.trim();
    if (nombre_value != "") {
      const data = await fetch_the_data(
        "http://localhost:8000/cursos_contenidos/contenidos",
        token,
        "POST",
        {
          nombre: nombre_value,
          curso: id_curso,
        }
      );
      accion(pushContenidos({ ...data[1], subcontenidos: [] }));
      form_ref.current.reset();
      return;
    }
    setHelper("No puedes agregar un contenido en blanco");
    setTimeout(() => {
      setHelper("");
    }, 3000);
  };
  return (
    <>
      <div
        className={abrir ? "add-cont-retractile-open" : "add-cont-retractile"}
      >
        <div className={"add-cont-btn-area"}>
          <button
            onClick={() => {
              abrir ? setAbrir(false) : setAbrir(true);
            }}
            className={abrir ? "add-cont-btn-closed" : "add-cont-btn"}
          >
            {abrir ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="30px"
                  viewBox="0 -960 960 960"
                  width="30px"
                  fill="var(--PrymaryContainer-color)"
                >
                  <path d="m274-450 248 248-42 42-320-320 320-320 42 42-248 248h526v60H274Z" />
                </svg>
              </>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="30px"
                viewBox="0 -960 960 960"
                width="30px"
                fill="var(--PrymaryContainer-color)"
              >
                <path d="M450-450H200v-60h250v-250h60v250h250v60H510v250h-60v-250Z" />
              </svg>
            )}
            <p style={{ display: abrir && "none" }}>Agregar</p>
          </button>
        </div>
        <form
          onSubmit={subirContenido}
          className="Add-cont-input-area"
          ref={form_ref}
        >
          <TextField
            label="Nombre del contenido"
            inputRef={inputNombre}
            size="big"
            variant={helperText == "" ? "filled" : "standard"}
            sx={{ width: "100%" }}
            helperText={helperText}
            error={helperText != ""}
          />
        </form>
      </div>
    </>
  );
};
