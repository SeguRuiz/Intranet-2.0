import { Typography } from "@mui/material";
import Inicio_grid from "./Inicio_grid";
import { useLocation } from "react-router-dom";
import { extraerCustomParametros } from "../../../utils/Utils";
import { useEffect } from "react";
import CampaignIcon from "@mui/icons-material/Campaign";
import Home_link from "./Home_link";
import Edit_noticias_page from "../../../components/Noticias_Incio/Edit_noticias_page";

const Inicio_page = ({ setCurrentLink }) => {
  const location = useLocation();
  const { editarNoticias, vacio } = extraerCustomParametros(location.search);

  useEffect(() => {
    editarNoticias
      ? setCurrentLink(
          <Home_link>
            <Typography
              sx={{
                color: "text.primary",
                display: "flex",
                alignItems: "center",
              }}
            >
              <CampaignIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Noticias
            </Typography>
          </Home_link>
        )
      : setCurrentLink(null);
  }, [editarNoticias]);

  return (
    <>
      {!vacio && <Inicio_grid setCurrentLink={setCurrentLink} />}
      {editarNoticias && <Edit_noticias_page />}
    </>
  );
};

export default Inicio_page;
