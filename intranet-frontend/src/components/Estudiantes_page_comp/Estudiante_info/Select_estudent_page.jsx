import { Box, Breadcrumbs, Typography, Link, Skeleton } from "@mui/material";
import Informacion_personal_card from "../../Informacion_personal_card/Informacion_personal_card";
import Data_table_Reportes from "../../Reportes_estusiante_page/Data_Reportes/Data_table_Reportes";
import Informacion_academica from "../../Informacion_personal_card/Informacion_academica";
import { useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { extraerCustomParametros } from "../../../utils/Utils";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Selected_estudent_page = ({
  estudiante_id,
  estudiantes = [],
  setCurrentLink,
}) => {
  const location = useLocation();
  const { est } = extraerCustomParametros(location.search);
  const { id_usuario } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const estudiante =
      estudiantes.find((x) => x.id_user == estudiante_id) ?? false;

    setCurrentLink(
      est ? (
        <Breadcrumbs separator="›">
          <Link
            underline="hover"
            sx={{ display: "flex", alignItems: "center" }}
            onClick={() => {
              navigate(`/usuarios/${id_usuario}/estudiantes`);
            }}
          >
            <GroupIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Estudiantes
          </Link>
          {estudiante != false ? (
            <Typography
              sx={{
                color: "text.primary",
                display: "flex",
                alignItems: "center",
              }}
            >
              <PersonIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              {`${estudiante?.nombre_usuario}  ${estudiante?.apellidos_usuario}`}
            </Typography>
          ) : (
            <Skeleton variant="text" width={80} animation="wave" />
          )}
        </Breadcrumbs>
      ) : null
    );

    return () => {
      setCurrentLink(null);
    };
  }, [est, estudiantes]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
        width: "100%",
        pb: 5,
      }}
    >
      <Informacion_personal_card id_usuario={estudiante_id} />
      <Informacion_academica id_usuario={estudiante_id} />
      <Data_table_Reportes id_usuario={estudiante_id} />
    </Box>
  );
};

export default Selected_estudent_page;
