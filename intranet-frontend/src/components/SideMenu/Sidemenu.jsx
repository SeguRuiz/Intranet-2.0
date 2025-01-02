import "./Sidemenu.css";
import MenuContenido from "./contenido/MenuContenido";
import { List } from "@mui/material";
import { useSelector } from "react-redux";
import { Paper } from "@mui/material";
import AddContenidoV2 from "./MenuCrud/Add/AddContenidoV2/AddContenidoV2";
import { useRef } from "react";

export const Sidemenu = () => {
  const { Contenidos } = useSelector((state) => state.CursosContenidos);
  const { userInSession } = useSelector((state) => state.Auth);
  const paperRef = useRef()
  
  const movePaper = () => {
    paperRef.current.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    })
  }


   
  return (
    <>
      <Paper
        ref={paperRef}
        sx={{
          maxHeight: "34.9rem",
          height: "100%",
          overflow: "auto",
          borderRadius: 0,
          scrollbarColor:
            "var(--OnPrymary-color) var(--PrymaryContainer-color)",
          scrollbarWidth: "thin",
          bgcolor: "var(--PrymaryContainer-color)",

        }}
        
      >
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "var(--PrymaryContainer-color)",
          }}
          disablePadding
        >
          {userInSession?.is_staff && <AddContenidoV2 scroll={movePaper} />}
          {Contenidos.map((contenido) => (
            <MenuContenido
              key={contenido.id}
              nombre={contenido.nombre}
              subcontenidos={contenido.subcontenidos}
              bloqueado={contenido.bloqueado}
              id={contenido.id}
            />
          ))}
        </List>
      </Paper>
    </>
  );
};
