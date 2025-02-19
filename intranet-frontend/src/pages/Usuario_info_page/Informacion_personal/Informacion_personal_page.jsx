import { Box } from "@mui/material";
import Informacion_personal_card from "../../../components/Informacion_personal_card/Informacion_personal_card";
import Informacion_rol from "../../../components/Informacion_personal_card/Informacion_rol";
import Informacion_academica from "../../../components/Informacion_personal_card/Informacion_academica";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ROLES_DE_USUARIO } from "../../../utils/Globals.d";

const Informacion_personal_page = () => {
  const { userInSession } = useSelector((x) => x.Auth);
  const { id_usuario } = useParams();
  return (
    <Box
      sx={{
        pl: 2,
        pr: 2,
        pt: 2,
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        alignItems: "center",
      }}
    >
      <Informacion_rol id_usuario={id_usuario} />
      <Informacion_personal_card id_usuario={id_usuario} />
      {userInSession?.rol == ROLES_DE_USUARIO.estudiante && (
        <Informacion_academica id_usuario={id_usuario} />
      )}
    </Box>
  );
};

export default Informacion_personal_page;
