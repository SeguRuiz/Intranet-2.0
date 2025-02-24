import { Paper, Divider, Typography, Breadcrumbs, Link, Box } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { extraerCustomParametros } from "../../../utils/Utils";

const Page_info = ({ current_page, pages = {}, currentLink= null }) => {
  const location = useLocation();
  
  const { id_usuario } = useParams();
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "sticky",
        zIndex: 2,
        top: 0,
        pl: 2,
        background: 'rgba(255, 255, 255, 0.9)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(5px)',
        border: '1px solid rgba(255, 255, 255, 0.3)'
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
      
    </Box>
  );
};

export default Page_info;
