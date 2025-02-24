import React from 'react'
import Herramientas_usuario from "../../../components/Herramientas_usuario/Herramientas_usuario"
import Comunicados_inicio from "../../../components/Comunicados_inicio/Comunicados_inicio"
import EmblaCarousel from "../../../components/Noticias_Incio/read/EmblaCarousel"
import { Grid2 } from '@mui/material'



const Inicio_grid = ({setCurrentLink}) => {
  return (
    <Grid2 sx={{
        height: '100%',
        width: '100%',
       
    }} container columns={2} spacing={1.5} padding={1.5}>
        <Grid2 size={2} ><EmblaCarousel options={{loop: true}} /></Grid2>
        {/* <Grid2 size={1}><CardUsuarioInicio/></Grid2> */}
        <Grid2 size={1.3} minHeight={'60vh'}  ><Herramientas_usuario/></Grid2>
        <Grid2 size={'grow'} minHeigh={'60vh'}  ><Comunicados_inicio/></Grid2>
    </Grid2>
  )
}

export default Inicio_grid