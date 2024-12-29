import { agregar_avisos } from "../../../redux/ComunicacionesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useFetch } from "../../../services/llamados";
import { getCookie } from "../../../utils/Cookies";
import { TextField, Button, CircularProgress } from "@mui/material";
import { useRef, useState } from "react";
import "./Add_com.css";
import { DecodeToken } from "../../../services/llamados";
import { useCustomNotis } from "../../../utils/customHooks";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const Add_Comunicaciones = () => {
  const dispatch = useDispatch(); // Dispatch para Redux
  const [desError, setDesError] = useState(""); // Estado para errores en la descripción
  const { userInSession } = useSelector((x) => x.Auth); // Usuario en sesión
  const [errorAsunto, setAsuntoError] = useState(""); // Estado para errores en el asunto
  const { grupo_mostrandose } = useSelector((x) => x.CursosContenidos); // Grupo actualmente mostrado

  // Verifica si el usuario puede agregar avisos
  const is_admin_select = () => {
    return (
      (userInSession?.is_staff && grupo_mostrandose != null) ||
      userInSession?.rol === "profesor"
    );
  };

  const { id_curso } = useParams(); // ID del curso
  const { error_mensaje, ok_mensaje } = useCustomNotis(
    "Debes escojer un grupo",
    "El aviso se subió exitosamente"
  );
  const error_msg = () => toast.error("No se pudo subir el aviso");
  const descripcion_ref = useRef(); // Referencia para el campo de descripción
  const asunto_ref = useRef(); // Referencia para el campo de asunto
  const form_ref = useRef(); // Referencia para el formulario
  const { fetch_the_data, fetching } = useFetch(); // Hook para hacer fetch de datos
  const token = getCookie("token"); // Obtiene el token de las cookies

  // Función para subir el aviso
  const subir_aviso = async (e) => {
    e.preventDefault();

    if (
      descripcion_ref.current.value.trim() !== "" &&
      asunto_ref.current.value.trim() !== "" &&
      is_admin_select()
    ) {
      // Envío de emails y datos del aviso
      const email_enviados = () => toast.success("Los emails se han enviado");
      const data = await fetch_the_data(
        "http://localhost:8000/cursos_contenidos/comunicados",
        token,
        "POST",
        {
          asunto: asunto_ref.current.value.trim(),
          descripcion: descripcion_ref.current.value.trim(),
          usuario_id: DecodeToken(token).user_id,
          grupo_id:
            userInSession?.rol === "profesor"
              ? userInSession.grupos[0]?.grupo_id
              : grupo_mostrandose,
          curso_id: id_curso,
        }
      );

      const emails = await fetch_the_data(
        "http://localhost:8000/cursos_contenidos/enviar_emails_grupo",
        token,
        "POST",
        {
          grupo_id:
            userInSession?.rol === "profesor"
              ? userInSession.grupos[0]?.grupo_id
              : grupo_mostrandose,
          body: descripcion_ref.current.value.trim(),
        }
      );

      if (emails[0] === 200) email_enviados();
      if (data === undefined) error_msg();
      console.log(data);

      if (data[0] === 201) {
        ok_mensaje();
        dispatch(agregar_avisos(data[1]));
        form_ref.current.reset(); // Reinicia el formulario
      } else {
        error_msg();
      }
      return;
    }

    // Manejo de errores
    if (descripcion_ref.current.value.trim() === "") {
      setDesError("Debes llenar esta casilla");
      setTimeout(() => setDesError(""), 1000);
    }

    if (asunto_ref.current.value.trim() === "") {
      setAsuntoError("Debes llenar esta casilla");
      setTimeout(() => setAsuntoError(""), 1000);
    }

    if (userInSession?.is_staff && grupo_mostrandose == null) {
      error_mensaje();
    }
  };

  return (
    <>
      <form
        action="POST"
        className="add-com-form"
        onSubmit={subir_aviso}
        ref={form_ref}
      >
        <TextField
          label="Asunto"
          variant="standard"
          inputRef={asunto_ref}
          fullWidth
          helperText={errorAsunto}
          error={errorAsunto !== ""}
          disabled={fetching}
          required
        />
        <TextField
          inputRef={descripcion_ref}
          label="Descripción"
          fullWidth
          multiline
          rows={7}
          helperText={errorAsunto}
          error={desError !== ""}
          disabled={fetching}
          required
        />
        <Button type="submit" sx={{ alignSelf: "end" }} disabled={fetching}>
          Subir
        </Button>
      </form>

      {fetching && (
        <CircularProgress
          sx={{
            position: "absolute",
            marginLeft: "350px",
            marginBottom: "332px",
          }}
          size={20}
        />
      )}
    </>
  );
};

export default Add_Comunicaciones;
