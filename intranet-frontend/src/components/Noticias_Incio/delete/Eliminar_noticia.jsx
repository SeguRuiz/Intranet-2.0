import { CircularProgress, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect } from "react";
import { getCookie } from "../../../utils/Cookies";
import { useFetch } from "../../../services/llamados";
import { useDispatch } from "react-redux";
import { eliminarAviso } from "../../../redux/Avisos";
import { toast } from "react-toastify";

const Eliminar_noticia = ({ id = null }) => {
  const token = getCookie("token");
  const accion = useDispatch()
  const { fetch_the_data, fetching } = useFetch();
  const eliminarNoticia = async () => {
    const data = await fetch_the_data(
      "http://localhost:8000/cursos/eliminar_noticia",
      token,
      "DELETE",
      null,
      id
    );
   
    if(data[0] == 200){
        accion(eliminarAviso({id: id}))
        toast.success("Se a eliminado correctamente")
        return 
    }
    
    toast.error("No se pudo elimanar la imagen")
  };

  return (
    <IconButton
      sx={{
        backgroundColor: "var(--Surface-color)",
        position: "absolute",
        bottom: 10,
        right: 10,
        border: "0.5 black solid",
          
         
          color: "var(--OnsurfaceVariant)",
          boxShadow:
            "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
          "&:hover": {
            backgroundColor: "var(--SurfaceContainer-color)",
            color: "var(--Onsurface-color)",
          },
      }}
      onClick={eliminarNoticia}
      disabled={fetching}
    >
      <DeleteIcon fontSize="small" />
      {fetching && <CircularProgress size={20} sx={{
        position: 'absolute'
      }}/>}
    </IconButton>
  );
};

export default Eliminar_noticia;
