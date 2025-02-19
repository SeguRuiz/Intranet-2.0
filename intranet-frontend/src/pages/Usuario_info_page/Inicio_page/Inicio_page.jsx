import { Grid2, Paper } from "@mui/material"
import Carrusel_notcias from "../../../components/Noticias_Incio/read/Carrusel_notcias"
import CardUsuarioInicio from "../../../components/CardUsuario/CardUsuarioInicio"
import Herramientas_usuario from "../../../components/Herramientas_usuario/Herramientas_usuario"
import Comunicados_inicio from "../../../components/Comunicados_inicio/Comunicados_inicio"
import EmblaCarousel from "../../../components/Noticias_Incio/read/EmblaCarousel"

const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())


const Inicio_page = () => {
  return (
    <Grid2 sx={{
        height: '100%',
        width: '100%',
       
    }} container columns={2} spacing={1.5} padding={1.5}>
        <Grid2 size={2} ><EmblaCarousel options={{loop: true}} slides={SLIDES}/></Grid2>
        {/* <Grid2 size={1}><CardUsuarioInicio/></Grid2> */}
        <Grid2 size={1.3} minHeight={'60vh'}  ><Herramientas_usuario/></Grid2>
        <Grid2 size={'grow'} minHeigh={'60vh'}  ><Comunicados_inicio/></Grid2>
    </Grid2>
  )
}

export default Inicio_page