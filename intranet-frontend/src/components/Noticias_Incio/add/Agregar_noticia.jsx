import { CircularProgress, IconButton } from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { useRef } from "react";
import { getCookie } from "../../../utils/Cookies";
import { useFetch } from "../../../services/llamados";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { agregarAviso } from "../../../redux/Avisos";
import { toast } from "react-toastify";
const Agregar_noticia = () => {
  const input_ref = useRef();
  const token = getCookie("token");
  const { fetch_the_data, fetching } = useFetch();
  const { id_usuario } = useParams();
  const accion = useDispatch();

  const subirImagen = async (img) => {
    const formData = new FormData();
    formData.append("archivo", img);
    formData.append("usuario_id", id_usuario);
    const data = await fetch_the_data(
      "http://localhost:8000/cursos/subir_aviso",
      token,
      "POST",
      null,
      "",
      formData
    );
    data == undefined &&
      toast.error("Ocurrio un error trayendo subiendo la imagen");
    if (data[0] == 200) {
      accion(agregarAviso(data[1]));
      toast.success("La imagen se agrego correctamente")
      return;
    }
    toast.error("Ocurrio un error subiendo la imagen");
  };

  const handleChange = (o) => {
    const file = o.target.files[0];

    if (file) {
      subirImagen(file);
    }
  };

  return (
    <>
      <input
        type="file"
        accept="image/*"
        style={{
          display: "none",
        }}
        ref={input_ref}
        onChange={handleChange}
      />
      <IconButton
        disabled={fetching}
        sx={{
          position: "absolute",
          zIndex: 1,
          backgroundColor: "var(--Surface-color)",
          border: "0.5 black solid",
          height: "60px",
          width: "60px",
          bottom: 20,
          right: 30,
          color: "var(--OnsurfaceVariant)",
          boxShadow:
            "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
          "&:hover": {
            backgroundColor: "var(--SurfaceContainer-color)",
            color: "var(--Onsurface-color)",
          },
        }}
        onClick={() => {
          input_ref.current.click();
        }}
      >
        <AddAPhotoIcon fontSize="inherit" />
        {fetching && <CircularProgress size={25} sx={{
          position: 'absolute'
        }}/>}
      </IconButton>
    </>
  );
};

export default Agregar_noticia;
