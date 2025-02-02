import { Button } from "@mui/material";
import NOT_FOUND_SVG from "../../assets/Empty/404.svg";
import { useNavigate } from "react-router-dom";
import './Info_cursos.css'
const Info_cursos_404 = () => {
  const navigate = useNavigate();
  return (
    <div className="not-found-cursos-container">
      <div className="not-found-message-cont">
        <h1>404!</h1>
        <p>El curso ya no esta disponible o solo andabas de curioso...</p>
        <Button
          variant="outlined"
          onClick={() => {
            navigate("/cursos");
          }}
          sx={{
            alignSelf: "flex-start",
            marginTop: 3,
            borderColor: "var(--PrymaryContainer-color)",
            color: "var(--PrymaryContainer-color)",
          }}
        >
          Volver al inicio
        </Button>
      </div>

      <div className="not-found-img-container">
        <img
          src={NOT_FOUND_SVG}
          alt="error 404.svg"
          className="not-found-img"
        />
      </div>
    </div>
  );
};

export default Info_cursos_404;
