import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import fotoMock from "../../../assets/Fotos/foto_fwd_1.jpg";
import { useRef } from "react";

const noticias = [
    {
      fecha_creacion: "10/09/2025",
      titulo: "Noticia nueva",
      descripcion: "Descripción de la noticia.",
    },
    {
      fecha_creacion: "15/09/2025",
      titulo: "Avance tecnológico en IA",
      descripcion: "Investigadores desarrollan un nuevo modelo de inteligencia artificial.",
    },

    {
      fecha_creacion: "20/09/2025",
      titulo: "Descubrimiento espacial",
      descripcion: "Astrónomos detectan un exoplaneta con condiciones similares a la Tierra.",
    },
    {
      fecha_creacion: "25/09/2025",
      titulo: "Actualización en ciberseguridad",
      descripcion: "Nuevas medidas para proteger datos personales en línea.",
    },
    {
      fecha_creacion: "30/09/2025",
      titulo: "Evento deportivo internacional",
      descripcion: "Se celebrará el torneo mundial de fútbol en una sede inédita.",
    },
  ];
  

const Carrusel_notcias_card = () => {
  return (
    <Card sx={{ position: "relative", padding: 0, height: "70vh" }}>
      <CardContent
        sx={{
          position: "absolute",
          bottom: 0,
          background: "white",
          ":hover": {
            opacity: 0.7,
          },
        }}
      >
        <Typography
          sx={{
            fontWeight: 500,
            letterSpacing: "1px",
            fontSize: "25px",
          }}
        >
          Titulo de la noticia
        </Typography>
        <Typography variant="body1" mt={1}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur
          iusto debitis non vel aperiam earum magni qui voluptatibus quam eos
          perspiciatis sed accusantium doloremque error recusandae qua
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        image={fotoMock}
        height={"100%"}
        alt="hola"
        sx={{
          objectFit: "cover",
        }}
      />
    </Card>
  );
};

export default Carrusel_notcias_card;
