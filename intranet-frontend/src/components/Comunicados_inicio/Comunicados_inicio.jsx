import {
  Card,
  CardContent,
  Typography,
  Divider,
  Box,
  Avatar,
  TextField,
  Stack,
} from "@mui/material";
import MessageIcon from "@mui/icons-material/Message";

const mensajes = [
  {
    mensaje: "Hola mis estrellitas la tierra les dice hola.",
    usuario: "Susana",
  },
  {
    mensaje:
      "Queridos chiquillos debido a un percanse el proyecto se pasara a otro dia.",
    usuario: "Steven",
  },
  {
    mensaje: "Hola mis estrellitas la tierra les dice hola.",
    usuario: "Luis",
  },
  {
    mensaje: "Hola mis estrellitas la tierra les dice hola.",
    usuario: "Mario",
  },
  {
    mensaje:
      "Queridos chiquillos debido a un percanse el proyecto se pasara a otro dia.",
    usuario: "Steven",
  },
  {
    mensaje: "Hola mis estrellitas la tierra les dice hola.",
    usuario: "Luis",
  },
  {
    mensaje: "Hola mis estrellitas la tierra les dice hola.",
    usuario: "Mario",
  },
];

const Comunicados_inicio = () => {
  return (
    <Card
      sx={{
        height: "60vh",
        overflowY: "auto",
      }}
    >
      <Box
        sx={{
          position: "sticky",
          top: 0,
          background: "white",
          zIndex: 1,
        }}
      >
        <CardContent>
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              fontWeight: 500,
              letterSpacing: "2px",
              fontSize: "25px",
            }}
          >
            <MessageIcon
              fontSize="inherit"
              sx={{
                mr: 1,
              }}
            />
            Comunicados
          </Typography>
        </CardContent>
        <Divider />
      </Box>

      <CardContent>
        <Stack
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            gap: "15px",
            width: "100%",
          }}
          divider={<Divider flexItem/>}
        
        >
          {mensajes.map((x) => (
            <>
              <Box
                key={x.mensaje}
                sx={{
                  display: "flex",
                  gap: "5px",
                }}
              >
                <Avatar/>
                <TextField multiline minRows={2} value={x.mensaje} />
              </Box>
            </>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default Comunicados_inicio;
