import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import { useState } from "react";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import AddContenidoInpt from "./AddContenidoInpt";

const AddContenidoV2 = ({ scroll }) => {
  const [adding, setAdding] = useState(false);
  
  return (
    <>
      <ListItemButton
        onClick={() => {
          setAdding(!adding);
          scroll();
        }}
        sx={{
          position: "sticky",
          top: 0,
          bgcolor: "var(--PrymaryContainer-color)",
          zIndex: 2,
          "&:hover": {
            backgroundColor: "#006ea3",
          },
        }}
      >
        <ListItemIcon>
          {adding ? (
            <DisabledByDefaultIcon sx={{ color: "var(--OnPrymary-color)" }} />
          ) : (
            <CreateNewFolderIcon sx={{ color: "var(--OnPrymary-color)" }} />
          )}
        </ListItemIcon>
        <ListItemText
          sx={{ color: "var(--OnPrymary-color)" }}
          primary={adding ? "Cancelar" : "Agrega una carpeta"}
        />
      </ListItemButton>
      {adding && <AddContenidoInpt setAdding={setAdding} />}
    </>
  );
};

export default AddContenidoV2;
