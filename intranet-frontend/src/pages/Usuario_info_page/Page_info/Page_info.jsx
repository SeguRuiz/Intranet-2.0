import { Paper, Divider, Typography, Breadcrumbs, Link } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { extraerCustomParametros } from "../../../utils/Utils";

const Page_info = ({ current_page, pages = {}, currentLink= null }) => {
  const location = useLocation();
  
  const { id_usuario } = useParams();
  const navigate = useNavigate();
  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "sticky",
        zIndex: 2,
        top: 0,
        pl: 2,
      }}
    >
      <Typography
        sx={{
          fontWeight: 500,
          letterSpacing: "3px",
          fontSize: "30px",
          margin: 0,
        }}
      >
        {pages[`${current_page}`]?.title}
      </Typography>
      {!currentLink ? (
        <Typography
          sx={{
            margin: 0,
          }}
        >
          {pages[`${current_page}`]?.subheader}
        </Typography>
      ): currentLink}
      
    </Paper>
  );
};

export default Page_info;
