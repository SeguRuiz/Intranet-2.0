import {
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardContent,
  Typography,
  Collapse,
} from "@mui/material";
import { stringAvatar } from "../../../../utils/Utils";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useState } from "react";

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
const ReporteAsubirCard = ({ nombre, estado }) => {
  const [open, setOpen] = useState(false);

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
            avatar={<Avatar {...stringAvatar(nombre)}></Avatar>}
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
            // action={
            //   estado != "presente" && (
            //     <IconButton
            //       onClick={() => {
            //         setOpen((prev) => !prev);
            //       }}
            //     >
            //       {open ? (
            //         <ExpandLessIcon
            //           sx={{ color: estadosTemas[`${estado}`].card.color }}
            //         />
            //       ) : (
            //         <ExpandMoreIcon
            //           sx={{ color: estadosTemas[`${estado}`].card.color }}
            //         />
            //       )}
            //     </IconButton>
            //   )
            // }
          ></CardHeader>
          <Collapse in={open} timeout={"auto"} unmountOnExit>
            <CardContent>
              <Typography>Reporte</Typography>
            </CardContent>
          </Collapse>
        </Card>
      </Collapse>
    </>
  );
};

export default ReporteAsubirCard;
