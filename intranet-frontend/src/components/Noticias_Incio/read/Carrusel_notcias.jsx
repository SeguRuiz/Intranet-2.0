import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const Carrusel_notcias_card = ({aviso ={}}) => {
 
  return (
    <Card sx={{ position: "relative", padding: 0, height: "70vh" }}>
      
      <CardMedia
        component="img"
        image={aviso.url}
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
