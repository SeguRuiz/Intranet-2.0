import { ButtonGroup } from "@mui/material";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { useState } from "react";

const Admin_actions_cursos = ({ children }) => {
  const { Es_admin } = useSelector((x) => x.IsAdmin);
  const { userInSession } = useSelector((x) => x.Auth);
  const [abrir, setAbrir] = useState(false);

  console.log(Es_admin);

  return (
    <>
      {Es_admin || userInSession?.rol == "profesor" ? (
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
            onClick={() => {
              setAbrir(!abrir);
            }}
          >
            {!abrir ? (
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
          {abrir && children}
        </ButtonGroup>
      ) : (
        <></>
      )}
    </>
  );
};

export default Admin_actions_cursos;
