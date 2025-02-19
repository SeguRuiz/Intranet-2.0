import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useRef } from "react";
import { getCookie } from "../../utils/Cookies";
import { useFetch } from "../../services/llamados";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ROLES_DE_USUARIO } from "../../utils/Globals.d";
const Agregar_perfil_img = ({
  set_loading_perfil,
  file_id = null,
  id_usuario,
  setPerfilUrl,
}) => {
  const accion = useDispatch();
  const inpt_ref = useRef(null);
  const token = getCookie("token");
  const { userInSession } = useSelector((x) => x.Auth);
  const { fetch_the_data, fetching } = useFetch();

  useEffect(() => {
    return () => {
      set_loading_perfil(true);
    };
  }, []);

  useEffect(() => {
    (async () => {
      if (file_id) {
        if (file_id == "sin imagen") {
          set_loading_perfil(false);
          return;
        }
        const data = await fetch_the_data(
          "http://localhost:8000/files/obtener_archivo_from_google_cloud",
          token,
          "POST",
          {
            folder: "PI",
            archivo_id: file_id,
          }
        );
        data == undefined &&
          toast.error("Ocurrio un error trayendo el perfil ");
        if (data[0] == 200) {
          setPerfilUrl(data[1].archivo);

          set_loading_perfil(false);
          return;
        }

        toast.error("Ocurrio un error trayendo el perfil ");
      }
    })();
  }, [file_id]);

  const subirPerfil = async (img) => {
    const formData = new FormData();
    formData.append("file", img);
    formData.append("usuario_id", id_usuario);

    if (img.type.split("/")[0] != "image") {
      toast.warning("Solo se aceptan imagenes");
      return;
    }
    set_loading_perfil(true);
    const data = await fetch_the_data(
      "http://localhost:8000/files/set_profile_img",
      token,
      "POST",
      null,
      "",
      formData
    );
    inpt_ref.current.value = null;
    data == undefined && toast.error("Ocurrio un error subiendo la imagen");
    if (data[0] == 200) {
      setPerfilUrl(data[1].url);
      console.log(data[1]);
      
      set_loading_perfil(false);
     
      return;
    } 

    toast.error("Ocurrio un error subiendo la imagen");
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
        accept="image/*"
        style={{
          display: "none",
        }}
        onChange={handleChange}
      />
      {userInSession?.is_staff && (
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
            boxShadow:
              "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
            "&:hover": {
              backgroundColor: "var(--SurfaceContainer-color)",
              color: "var(--Onsurface-color)",
            },
          }}
        >
          <EditIcon fontSize="small" />
        </IconButton>
      )}
    </>
  );
};

export default Agregar_perfil_img;
