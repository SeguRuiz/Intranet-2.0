import { useCallback, useEffect } from "react";
import "../embla.css";
import {
  usePrevNextButtons,
} from "./EmblaCarouselArrowbuttons";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Carrusel_notcias_card from "./Carrusel_notcias";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import CampaignIcon from "@mui/icons-material/Campaign";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../../../services/llamados";
import { getCookie } from "../../../utils/Cookies";
import { toast } from "react-toastify";
import { setAvisos } from "../../../redux/Avisos";


const EmblaCarousel = (props) => {
  const { slides, options } = props;
  const {avisos} = useSelector(x => x.Avisos)
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);
  const { userInSession } = useSelector((x) => x.Auth);
  const {id_usuario} = useParams()
  const {fetch_the_data} = useFetch()
  const token = getCookie("token")
  const navigate = useNavigate()
  const accion = useDispatch()

  useEffect(()=>{
    (async()=>{
      const data = await fetch_the_data(
              "http://localhost:8000/cursos/obtener_avisos",
              token,
              "GET"
            );
      
            data == undefined && toast.error("ocurrio un error trayendo los avisos");
      
            if (data[0] == 200) {
             accion(setAvisos(data[1]))
      
              return;
            }
      
            toast.error("ocurrio un error trayendo los avisos");
    })()
  },[])

  const onNavButtonClick = useCallback((emblaApi) => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop;

    resetOrStop();
  }, []);
   
  

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi, onNavButtonClick);

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
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
          {userInSession?.is_staff && (
            <IconButton onClick={()=>{
                navigate(`/usuarios/${id_usuario}/inicio?editarNoticias=1`)
            }}>
              <EditIcon fontSize="small" />
            </IconButton>
          )}
        </Box>
      </CardContent>

      <section className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {avisos.map((aviso) => (
              <div className="embla__slide" key={aviso.id}>
                <Carrusel_notcias_card aviso={aviso} />
              </div>
            ))}
          </div>
        </div>
      </section>
      <CardActions
        sx={{
          justifyContent: "end",
          mt: 1,
          mb: 1,
        }}
      >
        <IconButton onClick={onPrevButtonClick} disabled={prevBtnDisabled}>
          <ArrowBackIosNewIcon />
        </IconButton>
        <IconButton onClick={onNextButtonClick} disabled={nextBtnDisabled}>
          <ArrowForwardIosIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default EmblaCarousel;
