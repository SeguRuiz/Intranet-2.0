import React, { useCallback } from 'react'
import '../embla.css'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './EmblaCarouselArrowButtons'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import Carrusel_notcias_card from './Carrusel_notcias'
import { Card, CardActions, CardContent, CardHeader, Divider, IconButton, Typography } from '@mui/material'
import CampaignIcon from '@mui/icons-material/Campaign';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

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
  


const EmblaCarousel = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()])

  const onNavButtonClick = useCallback((emblaApi) => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop

    resetOrStop()
  }, [])

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi, onNavButtonClick)

  return (
    <Card>
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
          <CampaignIcon
            fontSize="inherit"
            sx={{
              mr: 1,
            }}
          />
          Anuncios
        </Typography>
        </CardContent>
        
        <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {noticias.map((index) => (
            <div className="embla__slide" key={index}>
                 <Carrusel_notcias_card/>
            </div>
          ))}
        </div>
      </div>

      
    </section>
    <CardActions sx={{
        justifyContent: 'end',
        mt:2
    }}>
            <IconButton onClick={onPrevButtonClick}><ArrowBackIosNewIcon/></IconButton>
            <IconButton onClick={onNextButtonClick}><ArrowForwardIosIcon/></IconButton>
    </CardActions>
    </Card>
  )
}

export default EmblaCarousel
