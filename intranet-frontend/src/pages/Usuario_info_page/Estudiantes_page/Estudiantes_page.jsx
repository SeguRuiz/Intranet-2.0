import { Box, Breadcrumbs, Link, Typography} from "@mui/material";
import Estudiantes_tabla from "../../../components/Estudiantes_page_comp/Estudiantes_tabla/Estudiantes_tabla";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { extraerCustomParametros } from "../../../utils/Utils";
import { getCookie } from "../../../utils/Cookies";
import { useFetch } from "../../../services/llamados";
import { toast } from "react-toastify";
import Selected_estudent_page from "../../../components/Estudiantes_page_comp/Estudiante_info/Select_estudent_page";

const Estudiantes_page = ({ setCurrentLink = null }) => {
  const location = useLocation();
  const { est } = extraerCustomParametros(location.search);
  const [estudiantes, setEstudiantes] = useState([])
 

   const token = getCookie("token");
    const { fetch_the_data, fetching } = useFetch();
    useEffect(() => {
      (async () => {
        const data = await fetch_the_data(
          "http://localhost:8000/api/get_all_estudiantes_info",
          token,
          "GET"
        );
        data == undefined &&
          toast.error(
            "Ocurrio un error trayendo los estudiantes intenta denuevo"
          );
  
        if (data[0] == 200) {
          setEstudiantes(data[1]);
          console.log(data[1]);
          
          return;
        }
        toast.error("Ocurrio un error trayendo los estudiantes intenta denuevo");
      })();
    }, [est]);
  




  
  return (
    <Box
      sx={{
        pt: 2,
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        alignItems: "center",
      }}
    >
      {!est && <Estudiantes_tabla  estudiantes={estudiantes} loading={fetching} />}
      {est && (
        <>
          <Selected_estudent_page estudiante_id={est} estudiantes={estudiantes} setCurrentLink={setCurrentLink} />
        </>
      )}
    </Box>
  );
};

export default Estudiantes_page;
