import React, { useEffect, useState } from "react";
import { Avatar, Card, CardHeader, ScopedCssBaseline } from "@mui/material";
import { useParams } from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import BookIcon from "@mui/icons-material/Book";
import Log_out from "../userInfoCard/Log_out";
import { getCookie } from "../../utils/Cookies";
import { useFetch } from "../../services/llamados";

const rolesIconos = {
  estudiante: [<SchoolIcon key="estudiante" fontSize="large" />, "Estudiante"],
  admin: [<ManageAccountsIcon key="admin" fontSize="large" />, "Administrador"],
  profesor: [<BookIcon key="Profesor" fontSize="large" />, "Profesor"],
};
const Informacion_rol = () => {
  const { id_usuario } = useParams();
  const [rol, setRol] = useState("estudiante");
  const token = getCookie("token");
  const { fetch_the_data } = useFetch();

  useEffect(() => {
    (async () => {
      const data = await fetch_the_data(
        "http://localhost:8000/api/get_user_info",
        token,
        "GET",
        null,
        id_usuario
      );
      if (data[0] == 200) {
        setRol(data[1]?.rol);
      }
    })();
  }, []);

  return (
    <Card
      sx={{
        width: "70%",
      }}
    >
      <CardHeader
        title={rolesIconos[`${rol.toLowerCase()}`][1]}
        subheader={'El rol define como intereactua con la pagina'}
        titleTypographyProps={{
            fontSize: '25px'
        }}
        subheaderTypographyProps={{
            fontSize: '15px'
        }}
        avatar={
          <Avatar
            variant="rounded"
            sx={{
              height: 60,
              width: 60,
            }}
            
          >
            {rolesIconos[`${rol.toLowerCase()}`][0]}
          </Avatar>
        }
      />
    </Card>
  );
};

export default Informacion_rol;
