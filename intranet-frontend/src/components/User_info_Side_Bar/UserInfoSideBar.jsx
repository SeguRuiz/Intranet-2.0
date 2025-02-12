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


const UserInfoSideBar = () => {
  const location = useLocation();
  const { id_usuario } = useParams();
  const [path, setCurentPath] = React.useState("inicio");
  const navigate = useNavigate();

  React.useEffect(() => {
    setCurentPath(location.pathname.split("/").at(-1));
  }, [location.pathname]);

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
        {pages.map((x) => (
          <ListItem key={x.link} disablePadding>
            <ListItemButton
              selected={x.link == path}
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
        ))}
      </List>
    </Paper>
  );
};

export default UserInfoSideBar;
