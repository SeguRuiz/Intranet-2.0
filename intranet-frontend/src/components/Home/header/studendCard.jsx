import {
  Card,
  CardHeader,
  Avatar,
  CardActionArea,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Box,
  Tooltip,
  Divider,
  useTheme,
  useMediaQuery,
  createTheme,
  ThemeProvider
} from "@mui/material";
import { stringAvatar } from "../../../utils/Utils";
import { useSelector } from "react-redux";
import { useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { setData } from "../../../redux/modalSlice";
import { useDispatch } from "react-redux";
import { setCookie } from "../../../utils/Cookies";
import { setUserNull } from "../../../redux/AuthSlice";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";




const rolesPersonalisado = {
  admin: "Administrador",
  estudiante: "Estudiante",
  profesor: "Profesor",
};

const StudendCard = () => {
  const { userInSession } = useSelector((x) => x.Auth);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const es_PantallaPequeña = useMediaQuery(theme.breakpoints.down("sm"));
  const es_PantallaExtraPequeña = useMediaQuery(theme.breakpoints.down('xs'))

  return (
    <>
    
      <Card
        sx={{
          backgroundColor: "var(--PrymaryContainer-color)",
          border: "none",
        }}
        variant="outlined"
      >
        <CardActionArea
          onClick={() => {
            setOpen((prev) => !prev);
          }}
        >
          <CardHeader
            avatar={
              <>
                <Avatar
                  {...stringAvatar(
                    `${userInSession?.nombre} ${userInSession?.apellidos}`
                  )}
                />
              </>
            }
            sx={{
                [theme.breakpoints.down('xs')]:{
                   height: '4vh',
                   width: '5vh'
                }
            }}
            title={!es_PantallaExtraPequeña && `${userInSession?.nombre} ${userInSession?.apellidos}`}
            subheader={!es_PantallaExtraPequeña && `${rolesPersonalisado[userInSession?.rol]}`}
            subheaderTypographyProps={{
              color: "var(--OnPrymary-color)",
              opacity: 0.5,
            }}
            titleTypographyProps={{ color: "var(--OnPrymary-color)" }}
          ></CardHeader>
        </CardActionArea>
      </Card>
      <Drawer
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        anchor={es_PantallaPequeña ? "bottom" : "top"}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "var(--PrymaryContainer-color)",
            color: "var(--OnPrymary-color)", // Change to your desired color
          },
        }}
      >
        <Box>
          <List>
            <ListItemButton>
              <ListItemIcon>
                <LogoutIcon sx={{ color: "var(--OnPrymary-color)" }} />
              </ListItemIcon>
              <ListItemText
                primary="Cerrar Sesion"
                onClick={() => {
                  setOpen(false);
                  dispatch(setUserNull());
                  setCookie("token", "", 0);
                  setCookie("refresh", "", 0);
                  dispatch(setData([]));
                  navigate("/");
                }}
              />
            </ListItemButton>
            <Divider />
            <Tooltip title="En mantenimiento :p" followCursor>
              <ListItemButton disableRipple>
                <ListItemIcon>
                  <AccountCircleIcon sx={{ color: "var(--OnPrymary-color)" }} />
                </ListItemIcon>
                <ListItemText primary="Perfil" />
              </ListItemButton>
            </Tooltip>
          </List>
        </Box>
      </Drawer>
     
    </>
  );
};

export default StudendCard;
