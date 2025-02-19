import {
  Card,
  CardHeader,
  Avatar,
  CardActionArea,
  Drawer,
  List,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Box,
  Tooltip,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { stringAvatar } from "../../../utils/Utils";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { setData } from "../../../redux/modalSlice";
import { useDispatch } from "react-redux";
import { getCookie, setCookie } from "../../../utils/Cookies";
import { setUserNull } from "../../../redux/AuthSlice";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useFetch } from "../../../services/llamados";
import { setPerfilUrl } from "../../../redux/PerfilUsuarioSlice";

const rolesPersonalisado = {
  admin: "Administrador",
  estudiante: "Estudiante",
  profesor: "Profesor",
  socioemocional: "Socioemocional"
};

const StudendCard = () => {
  const { userInSession } = useSelector((x) => x.Auth);
  const { PerfilUrl } = useSelector((x) => x.PerfilUsuario);
  const accion = useDispatch();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const es_PantallaPequeña = useMediaQuery(theme.breakpoints.down("sm"));
  const es_PantallaExtraPequeña = useMediaQuery(theme.breakpoints.down("xs"));
  const token = getCookie("token");
  const { fetch_the_data } = useFetch();

  useEffect(() => {
    (async () => {
      if (userInSession?.perfilId && !PerfilUrl) {
        const data = await fetch_the_data(
          "http://localhost:8000/files/obtener_archivo_from_google_cloud",
          token,
          "POST",
          {
            folder: "PI",
            archivo_id: userInSession.perfilId,
          }
        );

        if (data[0] == 200) {
          accion(setPerfilUrl(data[1]?.archivo));
        }
      }
    })();
  }, [userInSession]);

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
          {es_PantallaPequeña ? (
            <>
              {PerfilUrl ? (
                <Avatar src={PerfilUrl} />
              ) : (
                <Avatar
                  {...stringAvatar(
                    `${userInSession?.nombre} ${userInSession?.apellidos}`
                  )}
                />
              )}
            </>
          ) : (
            <CardHeader
              avatar={
                <>
                  {PerfilUrl ? (
                    <Avatar src={PerfilUrl} />
                  ) : (
                    <Avatar
                      {...stringAvatar(
                        `${userInSession?.nombre} ${userInSession?.apellidos}`
                      )}
                    />
                  )}
                </>
              }
              sx={{
                height: "4.9vh",

                [theme.breakpoints.down("sm")]: {
                  height: "4vh",
                  width: "5vh",
                },
              }}
              title={
                !es_PantallaExtraPequeña &&
                `${userInSession?.nombre} ${userInSession?.apellidos}`
              }
              subheader={
                !es_PantallaExtraPequeña &&
                `${rolesPersonalisado[userInSession?.rol]}`
              }
              subheaderTypographyProps={{
                color: "var(--OnPrymary-color)",
                opacity: 0.5,
              }}
              titleTypographyProps={{ color: "var(--OnPrymary-color)" }}
            ></CardHeader>
          )}
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

            <ListItemButton
              disableRipple
              onClick={() => {
                navigate(`/usuarios/${userInSession?.id}/inicio`);
              }}
            >
              <ListItemIcon>
                <AccountCircleIcon sx={{ color: "var(--OnPrymary-color)" }} />
              </ListItemIcon>
              <ListItemText primary="Perfil" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default StudendCard;
