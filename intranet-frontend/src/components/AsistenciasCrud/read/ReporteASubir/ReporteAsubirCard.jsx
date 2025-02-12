import {
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardContent,
  Typography,
  Collapse,
  FormControlLabel,
  Switch,
  Divider,
  Checkbox,
} from "@mui/material";
import { stringAvatar } from "../../../../utils/Utils";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { set_presento_aviso } from "../../../../redux/Asistencias";

const estadosTemas = {
  retiro: {
    card: {
      backgroundColor: "#ffdad6",
      color: "#410002",
    },

    subheader: {
      color: "",
    },
  },
  ausente: {
    card: {
      backgroundColor: "#ba1a1a",
      color: "#ffffff",
    },

    subheader: {
      color: "",
    },
  },
  presente: {
    card: {
      backgroundColor: "#cdeda3",
      color: "#102000",
    },

    subheader: {
      color: "",
    },
  },
  tardia: {
    card: {
      backgroundColor: "#f8e287",
      color: "#221b00",
    },

    subheader: {
      color: "",
    },
  },
};
const ReporteAsubirCard = ({ nombre, estado, id = null }) => {
  const [presento_aviso, set_presentoAviso] = useState(false);
  const accion = useDispatch();

  const handleClick = (event, value) => {
    set_presentoAviso(value);
    accion(set_presento_aviso({ id: id, presento_aviso: value }));
  };
  return (
    <>
      <Collapse in={!(estado == "presente")} unmountOnExit timeout={"auto"}>
        <Card
          sx={{
            borderRadius: "10px",
            marginBottom: "10px",
            backgroundColor: estadosTemas[`${estado}`].card.backgroundColor,
            color: estadosTemas[`${estado}`].card.color,
          }}
          variant="outlined"
        >
          <CardHeader
            avatar={
              <Avatar {...stringAvatar(nombre)} variant="rounded"></Avatar>
            }
            sx={{ height: "4vh" }}
            title={nombre}
            subheader={estado}
            titleTypographyProps={{
              noWrap: true,
            }}
            subheaderTypographyProps={{
              ...estadosTemas[`${estado}`].subheader,
              opacity: 0.1,
            }}
          ></CardHeader>
          <Divider>
            <Typography variant="body2" color="text.secondary">
              Especificaciones extra
            </Typography>
          </Divider>

          <CardContent
            sx={{
              pl: 2.5,
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={presento_aviso}
                  onChange={handleClick}
                  
                  sx={{
                    color: estadosTemas[`${estado}`].card.color, // Default (unchecked) color
                    "&.Mui-checked": {
                      color: estadosTemas[`${estado}`].card.color, // Checked color
                    },
                  }}
                />
              }
              sx={{
                gap: "5px",
              }}
              label="Presento aviso"
            />
          </CardContent>
        </Card>
      </Collapse>
    </>
  );
};

export default ReporteAsubirCard;
