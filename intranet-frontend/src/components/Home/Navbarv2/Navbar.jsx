import {
  AppBar,
  Container,
  Typography,
  Toolbar,
  Avatar,
  IconButton,
  Slide,
  createTheme,
  ThemeProvider,
  useTheme,
  useMediaQuery,
  Card,
  CardHeader,
  Divider,
  CardActionArea,
} from "@mui/material";
import { useScrollTrigger } from "@mui/material";
import { useNavigate } from "react-router";
import StudendCard from "../header/studendCard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Flecha from '../../../assets/flechas/Flechas-03.svg'

const theme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "rgba(17, 17, 26, 0) 0px 1px 0px;",
        },
      },
    },
  },
});

function HideOnScroll({ window, children }) {
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children ?? <div />}
    </Slide>
  );
}

const Navbarv2 = ({ window, currentPath, Pages = [], volver = "" }) => {
  const theme2 = useTheme();
  const es_PantallaPequeña = useMediaQuery(theme2.breakpoints.down("sm"));
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <HideOnScroll window={window}>
        <AppBar
          position="fixed"
          sx={{
            backgroundColor: "var(--PrymaryContainer-color)",
            color: "var(--OnPrymary-color)",
          }}
        >
          <Container maxWidth='xl' sx={{ width: "100%", display: "flex" }}>
            <Toolbar sx={{ gap: "15px" }} disableGutters>
              <img src={Flecha} style={
                {
                  objectFit: 'contain',
                  width: '7vh',
                  height: '7vh'
                }
              }/>

              {!es_PantallaPequeña && (
                <Typography
                  component={"h1"}
                  noWrap
                  sx={{
                    fontWeight: 700,
                    letterSpacing: "2px",
                    fontSize: "22px",
                    flexGrow: 3,
                  }}
                >
                  Campus virtual
                </Typography>
              )}
            </Toolbar>

            <Toolbar sx={{ flexGrow: 1, display: "flex", gap: "20px"}}>
              {Pages.map((x) => (
                <Typography
                  key={x.path}
                  sx={{
                    opacity: currentPath == x.path ? 1 : 0.6,

                    fontWeight: 650,
                    padding: "1px 6px 1px 6px",
                    borderRadius: "5px",
                    backgroundColor: currentPath == x.path && "#5875a8",
                    color: currentPath == x.path && "#ffffff",
                    cursor: "pointer",
                    ":hover": currentPath != x.path && {
                      backgroundColor: "#e7e8ee",
                      color: "#191c20",
                      opacity: 1,
                    },
                  }}
                  onClick={() => {
                    navigate(x.path);
                  }}
                >
                  {x.nombre}
                </Typography>
              ))}
            </Toolbar>
            <Toolbar
              sx={{
                flexGrow: 0.5,
                display: "flex",
                justifyContent: "end",
                gap: es_PantallaPequeña ? "7px" : "5px",
              
              }}
              disableGutters
            >
              {volver && (
                <>
                  <IconButton
                    onClick={() => {
                      navigate(volver);
                    }}
                  >
                    <ArrowBackIcon
                      sx={{ color: "var(--OnPrymary-color)" }}
                      fontSize="medium"
                    />
                  </IconButton>
                  {!es_PantallaPequeña && <Divider orientation="vertical" variant="middle" flexItem />}
                </>
              )}
              <StudendCard />
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
    </ThemeProvider>
  );
};

export default Navbarv2;
