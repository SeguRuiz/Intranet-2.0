import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import pages from "./UserInfoSidePages";
import { useSelector } from "react-redux";
import { ROLES_DE_USUARIO } from "../../utils/Globals.d";

const UserInfoSideBar = () => {
  const { userInSession } = useSelector((x) => x.Auth);
  const { id_usuario, page } = useParams();
  const [path, setCurentPath] = React.useState("inicio");
  const navigate = useNavigate();

  React.useEffect(() => {
    setCurentPath(page);

    switch (page) {
      case "estudiantes":
        !`${ROLES_DE_USUARIO.admin}-${ROLES_DE_USUARIO.profesor}-${ROLES_DE_USUARIO.socioemocional}`.includes(
          userInSession?.rol
        ) && navigate(`/usuarios/${id_usuario}/inicio`);
        break;

      default:
        break;
    }
  }, [page]);

  return (
    <Paper>
      <Box
        sx={{
          height: "15vh",
        }}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        Logo area
      </Box>
      <List disablePadding dense>
        {pages.map(
          (x) =>
            x.visibilidad.includes(userInSession?.rol) && (
              <ListItem key={x.link} disablePadding>
                <ListItemButton
                  selected={x.link == page}
                  onClick={() => {
                    navigate(`/usuarios/${id_usuario}/${x.link}`);
                  }}
                  sx={{
                    pl: 3,
                    borderRadius: "5px",
                  }}
                >
                  <ListItemIcon>
                    {x.link == path ? x.selectedIcon : x.icono}
                  </ListItemIcon>
                  <ListItemText primary={x.nombre} />
                </ListItemButton>
              </ListItem>
            )
        )}
      </List>
    </Paper>
  );
};

export default UserInfoSideBar;
