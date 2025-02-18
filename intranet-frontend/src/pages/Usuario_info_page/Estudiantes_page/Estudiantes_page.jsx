import { Box, Breadcrumbs, Link, Typography, Paper } from "@mui/material";
import Estudiantes_tabla from "../../../components/Estudiantes_page_comp/Estudiantes_tabla/Estudiantes_tabla";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { extraerCustomParametros } from "../../../utils/Utils";
import Informacion_personal_card from "../../../components/Informacion_personal_card/Informacion_personal_card";
import { Height } from "@mui/icons-material";
import Selected_estudent_page from "../../../components/Estudiantes_page_comp/Estudiante_info/Select_estudent_page";

const Estudiantes_page = ({ setCurrentLink = null }) => {
  const location = useLocation();
  const { id_usuario } = useParams();
  const navigate = useNavigate();
  const { est } = extraerCustomParametros(location.search);
  const [currentStudent, setCurentStudent] = useState("");

  useEffect(() => {
    setCurrentLink(
      est ? (
        <Breadcrumbs separator=">">
          <Link
            underline="hover"
            onClick={() => {
              navigate(`/usuarios/${id_usuario}/estudiantes`);
            }}
          >
            Estudiantes
          </Link>
          <Typography sx={{ color: "text.primary" }}>
            {currentStudent}
          </Typography>
        </Breadcrumbs>
      ) : null
    );
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
      {!est && <Estudiantes_tabla setCurrentLink={setCurentStudent} />}
      {est && (
        <>
          <Selected_estudent_page estudiante_id={est}  />
        </>
      )}
    </Box>
  );
};

export default Estudiantes_page;
