import { Breadcrumbs, Link } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate, useParams } from "react-router-dom";

const Home_link = ({children}) => {
    const { id_usuario } = useParams();
    const navigate = useNavigate();
    return (
      <Breadcrumbs separator="›">
        <Link
          underline="hover"
          sx={{ display: "flex", alignItems: "center" }}
          onClick={() => {
            navigate(`/usuarios/${id_usuario}/inicio`);
          }}
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Inicio
        </Link>
  
        {children}
      </Breadcrumbs>
    );
}

export default Home_link
