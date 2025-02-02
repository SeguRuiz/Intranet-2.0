import { ButtonGroup } from "@mui/material";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { useState } from "react";

const Admin_actions_cursos = ({ children }) => {
  const { Es_admin } = useSelector((x) => x.IsAdmin); // Verifica si el usuario es administrador
  const { userInSession } = useSelector((x) => x.Auth); // Obtiene el usuario en sesión
  const [abrir, setAbrir] = useState(false); // Estado para controlar la apertura del botón

  return (
    <>
      {Es_admin || userInSession?.rol === "profesor" ? ( // Condición para mostrar los botones
        <ButtonGroup
          size="large"
          variant="contained"
          aria-label="Large button group"
          sx={{
            position: "fixed",
            bottom: 25,
            right: 25,
            transition: "0.3s",
          }}
        >
          <Button
            onClick={() => setAbrir(!abrir)} // Alterna el estado de abrir
          >
            {!abrir ? ( // Muestra un icono diferente dependiendo del estado
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="30px"
                viewBox="0 -960 960 960"
                width="30px"
                fill="var(--OnPrymary-color)"
              >
                <path d="M400-80 0-480l400-400 56 57-343 343 343 343-56 57Z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="30px"
                viewBox="0 -960 960 960"
                width="30px"
                fill="var(--OnPrymary-color)"
              >
                <path d="m304-82-56-57 343-343-343-343 56-57 400 400L304-82Z" />
              </svg>
            )}
          </Button>
          {abrir && children} {/* Renderiza los hijos si abrir es verdadero */}
        </ButtonGroup>
      ) : (
        <></> // No renderiza nada si no es administrador ni profesor
      )}
    </>
  );
};

export default Admin_actions_cursos;
