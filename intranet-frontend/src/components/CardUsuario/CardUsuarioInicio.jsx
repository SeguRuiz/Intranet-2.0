import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import imgPrueba from '../../assets/Fotos/perfilLuis.jpg'
const CardUsuarioInicio = () => {
  return (
    <Card sx={{
        height: '70vh'
    }} >
        <CardMedia component='img' image={imgPrueba} alt='Sin img' height={'40%'}/>
         <CardContent>
         <Typography
          sx={{
            fontWeight: 500,
            letterSpacing: "1px",
            fontSize: "25px",
            
          }}
        >
          Bienvenido/a, Luis
        </Typography>
        <Typography variant="body1" mt={1}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur
          
        </Typography>
         </CardContent>
    </Card>
  )
}

export default CardUsuarioInicio