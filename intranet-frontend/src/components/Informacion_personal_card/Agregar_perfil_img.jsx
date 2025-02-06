import { CircularProgress, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useRef } from "react";
import { getCookie } from "../../utils/Cookies";
import { useFetch } from "../../services/llamados";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPerfilUrl } from "../../redux/PerfilUsuarioSlice";
import { useSelector } from "react-redux";
const Agregar_perfil_img = ({ set_loading_perfil, file_id = null }) => {
  const { PerfilUrl } = useSelector((x) => x.PerfilUsuario);
  const accion = useDispatch();
  const inpt_ref = useRef(null);
  const token = getCookie("token");
  const { fetch_the_data, fetching } = useFetch();
  const { id_usuario } = useParams();

  useEffect(() => {
    (async () => {
      if (file_id && !PerfilUrl) {
        set_loading_perfil(true);
        const data = await fetch_the_data(
          "http://localhost:8000/files/obtener_archivo_from_google_cloud",
          token,
          "POST",
          {
            folder: "PI",
            archivo_id: file_id,
          }
        );

        if (data[0] == 200) {
          accion(setPerfilUrl(data[1].archivo));
        }
        set_loading_perfil(false);
      }
    })();
  }, [file_id]);

  const subirPerfil = async (img) => {
    set_loading_perfil(true);
    const formData = new FormData();
    formData.append("file", img);
    formData.append("usuario_id", id_usuario);
    const data = await fetch_the_data(
      "http://localhost:8000/files/set_profile_img",
      token,
      "POST",
      null,
      "",
      formData
    );

    if (data[0] == 200) {
      accion(setPerfilUrl(data[1].url));
    }

    set_loading_perfil(false);

    inpt_ref.current.value = null;
  };

  const handleChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      subirPerfil(file);
    }
  };
  return (
    <>
      <input
        type="file"
        ref={inpt_ref}
        style={{
          display: "none",
        }}
        onChange={handleChange}
      />
      <IconButton
        disabled={fetching}
        onClick={() => {
          inpt_ref.current && inpt_ref.current.click();
        }}
        sx={{
          position: "absolute",
          zIndex: 1,
          backgroundColor: "var(--Surface-color)",
          border: "0.5 black solid",
          height: "30px",
          width: "30px",
          left: 98,
          top: -12,
          color: "var(--OnsurfaceVariant)",
          boxShadow: "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
          "&:hover": {
            backgroundColor: "var(--SurfaceContainer-color)",
            color: "var(--Onsurface-color)",
          },
        }}
      >
        <EditIcon fontSize="small" />
      </IconButton>
    </>
  );
};

export default Agregar_perfil_img;
