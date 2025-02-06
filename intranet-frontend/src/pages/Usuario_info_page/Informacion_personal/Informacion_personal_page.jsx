import React, { useState } from "react";
import { Box, Paper } from "@mui/material";
import Informacion_personal_card from "../../../components/Informacion_personal_card/Informacion_personal_card";
import Informacion_rol from "../../../components/Informacion_personal_card/Informacion_rol";
import Informacion_academica from "../../../components/Informacion_personal_card/Informacion_academica";

const userInfoMock = {

}

const Informacion_personal_page = () => {
    const [userInfo, setUserInfo] = useState({})
  return (
    <Box
      sx={{
        pl: 2,
        pr: 2,
        pt: 2,
        display: "flex",
        flexDirection: "column",
        gap: '10px',
        alignItems: "center",
      }}
    >
         <Informacion_rol/>
      <Informacion_personal_card />
      <Informacion_academica/>
    </Box>
  );
};

export default Informacion_personal_page;
