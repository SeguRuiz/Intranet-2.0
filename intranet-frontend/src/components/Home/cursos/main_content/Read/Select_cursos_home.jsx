import { useNavigate } from "react-router-dom";
import cursos_img_1 from "../../../../../assets/Cursos/LandScape1.jpg";
import cursos_img_2 from "../../../../../assets/Cursos/LandScape2.jpg";
import cursos_img_3 from "../../../../../assets/Cursos/LandScape3.jpg";
import cursos_img_4 from "../../../../../assets/Cursos/LandScape4.jpg";
import cursos_img_5 from "../../../../../assets/Cursos/LandScape5.jpg";
import cursos_img_6 from "../../../../../assets/Cursos/LandScape6.jpg";
import Menu_options_reportes from "../../../../Control-page/Reportes/read/Menu_options_reportes";
import { Delete_cursos } from "../Delete/Delete_cursos";
import { stringToColor } from "../../../../../utils/Utils";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import MenuBookIcon from "@mui/icons-material/MenuBook";
import FolderIcon from "@mui/icons-material/Folder";
import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardActions,
  Button,
  Zoom,
  Tooltip,
  useTheme,
} from "@mui/material";
const Select_cursos_home = ({ id, nombre, detalles }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const { userInSession } = useSelector((x) => x.Auth);

  const [slide, SetSlide] = useState(true);

  useEffect(() => {
    SetSlide(true);

    return () => {
      SetSlide(false);
    };
  }, []);

  return (
    <Zoom in={slide} mountOnEnter>
      <Card
        sx={{
          width: "100%",
          backgroundColor: "var(--SurfaceBrigth-color)",
          borderRadius: "10px",
          transition: "0.3s",
          // [theme.breakpoints.down("sm")]: {
          //   width: '',
          // },
        }}
      >
        <Tooltip title={"Clickea la info para ver sus contenidos"} placement="left">
          <CardHeader
            avatar={
              <FolderIcon
                fontSize="medium"
                sx={{ color: "var(--OnPrymary-color)" }}
              />
            }
            title={nombre}
            titleTypographyProps={{
              fontSize: "18px",
              color: "var(--OnPrymary-color)",
            }}
            action={<Delete_cursos id={id} />}
            sx={{
              backgroundColor: "var(--PrymaryContainer-color)",
            }}
          ></CardHeader>
          <CardActionArea
            onClick={() => {
              navigate(`${id}/carpetas`);
            }}
          >
            <CardContent>
              {/* <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    maxWidth: "90%",
                    whiteSpace: 'normal', 
                    wordWrap: "break-word",
                    overflow: 'hidden'
                  }}
                >
                  {detalles}
                </Typography> */}
              <textarea
                className="textarea-card-files"
                style={{
                  width: "100%",
                  height: "23vh",
                  border: "none",
                  backgroundColor: "var(--SurfaceBrigth-color)",
                  resize: "none",
                  color: "var(--Onsurface-color)",
                  fontSize: "15px",
                  cursor: 'pointer'
                }}
                readOnly
              >
                {detalles}
              </textarea>
            </CardContent>
          </CardActionArea>
        </Tooltip>
        <Tooltip title="Aún esta en desarrollo :P" followCursor>
          <CardActions>
            <Button
              size="small"
              startIcon={
                <MenuBookIcon sx={{ color: "var(--PrymaryContainer-color)" }} />
              }
              variant="contained"
              disabled
            >
              ver recursos externos
            </Button>
          </CardActions>
        </Tooltip>
      </Card>
    </Zoom>
  );
};

export default Select_cursos_home;
