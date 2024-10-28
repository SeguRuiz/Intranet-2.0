import { agregar_avisos } from "../../../redux/ComunicacionesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useFetch } from "../../../services/llamados";
import { getCookie } from "../../../utils/Cookies";
import { LinearProgress, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Button } from "@mui/material";
import "./Add_com.css";
import { DecodeToken } from "../../../services/llamados";
import { useCustomNotis } from "../../../utils/customHooks";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import Grupo from "../../Home/cursos/grupo/Grupo";

const Add_Comunicaciones = () => {
  const accion = useDispatch();
  const [desError, setDesError] = useState("");
  const { userInSession } = useSelector((x) => x.Auth);
  const [errorAsunto, setAsuntoError] = useState("");
  const { grupo_mostrandose } = useSelector((x) => x.CursosContenidos);

  const is_admin_select = () => {
    if (userInSession?.is_staff && grupo_mostrandose != null) {
      return true;
    } else if (userInSession?.rol == "profesor") {
      return true;
    }
    return false;
  };

  const { id_curso } = useParams();
  const { error_mensaje, ok_mensaje } = useCustomNotis(
    "Debes escojer un grupo",
    "El aviso se subio exitosamente"
  );
  const error_msg = () => toast.error("No se pudo subir el aviso");
  const descripcion_ref = useRef();
  const asunto_ref = useRef();
  const form_ref = useRef();
  const { fetch_the_data, fetching } = useFetch();
  const token = getCookie("token");
  const subir_aviso = async (o) => {
    o.preventDefault();

    if (
      descripcion_ref.current.value.trim() != "" &&
      asunto_ref.current.value.trim() != "" &&
      is_admin_select()
    ) {
      const email_enviados = () => toast.success("Los emails se han enviado");
      const data = await fetch_the_data(
        "http://localhost:8000/cursos_contenidos/comunicados",
        token,
        "POST",
        {
          asunto: asunto_ref.current.value.trim(),
          descripcion: descripcion_ref.current.value.trim(),
          usuario_id: DecodeToken(token).user_id,
          grupo_id: userInSession?.rol == 'profesor' ? userInSession.grupos[0]?.grupo_id : grupo_mostrandose,
          curso_id: id_curso,
        }
      );

      const emails = await fetch_the_data(
        "http://localhost:8000/cursos_contenidos/enviar_emails_grupo",
        token,
        "POST",
        {
          grupo_id: userInSession?.rol == 'profesor' ? userInSession.grupos[0]?.grupo_id : grupo_mostrandose,
          body: descripcion_ref.current.value.trim(),
        }
      );
      emails[0] == 200 && email_enviados();
      data == undefined && error_msg();
      console.log(data);

      if (data[0] == 201) {
        ok_mensaje();
        accion(agregar_avisos(data[1]));
        form_ref.current.reset();
      } else {
        error_msg();
      }
      return;
    }

    if (descripcion_ref.current.value.trim() == "") {
      setDesError("Debes llenar esta casilla");
      setTimeout(() => {
        setDesError("");
      }, 1000);
    }

    if (asunto_ref.current.value.trim() == "") {
      setAsuntoError("Debes llenar esta casilla");
      setTimeout(() => {
        setAsuntoError("");
      }, 1000);
    }
    if (userInSession?.is_staff) {
      grupo_mostrandose == null && error_mensaje();
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
          error={errorAsunto != ""}
          disabled={fetching}
          required
        />
        <TextField
          inputRef={descripcion_ref}
          label="Descripcion"
          fullWidth
          multiline
          rows={7}
          helperText={errorAsunto}
          error={desError != ""}
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
