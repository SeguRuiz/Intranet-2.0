import {
  ListItem,
  TextField,
  ListItemIcon,
  CircularProgress,
  ListItemText,
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import { useEffect, useRef, useState } from "react";
import { useFetch } from "../../../../services/llamados";
import { getCookie } from "../../../../utils/Cookies";
import { editNombreContenido } from "../../../../redux/CursosContenidosSlice";
import { useDispatch } from "react-redux";

const EditContenidoInpt = ({ valor = "", id = null, setEditando }) => {
  const inpt_ref = useRef();
  const { fetch_the_data, fetching } = useFetch();
  const accion = useDispatch();

  const token = getCookie("token");
  useEffect(() => {
    if (inpt_ref.current) {
      inpt_ref.current.focus();
    }
  }, []);

  const editC = async (o) => {
    o.preventDefault();
    const inpt_value = inpt_ref.current.value.trim();
    if (inpt_value) {
      const data = await fetch_the_data(
        "http://localhost:8000/cursos_contenidos/contenidos_edit",
        token,
        "PATCH",
        {
          nombre: inpt_value,
        },
        id
      );

      if (data[0] == 200) {
        accion(editNombreContenido({ id: id, nombre: inpt_value }));
        setEditando(false);
      }
      return;
    }

    inpt_ref.current.value = valor;
  };

  return (
    <ListItem>
      <ListItemIcon>
        <FolderIcon sx={{ color: "var(--OnPrymary-color)" }} />
      </ListItemIcon>
      {fetching ? (
        <>
          <ListItemText primary={inpt_ref.current?.value} sx={{ color: "var(--OnPrymary-color)" }}/>
        </>
      ) : (
        <form onSubmit={editC}>
          <TextField
            size="small"
            fullWidth
            defaultValue={valor}
            inputRef={inpt_ref}
            autoComplete="off"
            sx={{
              "& .MuiInputBase-input": {
                color: "var(--OnPrymary-color)", // Text color
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "var(--PrymaryContainer-color)", // Default border color
                },
                "&:hover fieldset": {
                  borderColor: "var(--PrymaryContainer-color)", // Hover border color
                },
                "&.Mui-focused fieldset": {
                  borderColor: "var(--PrymaryContainer-color)", // Focused border color
                },
                padding: "0px",
                "& .MuiInputBase-input": {
                  padding: "12px 0.7px",
                  height: "1.3vh", // Padding for the input text
                }, // Padding inside the input container
              },
              "& .MuiInputBase-input.Mui-disabled": {
                color: "var(--OnPrymary-color)", // Text color
              },
              "& .MuiOutlinedInput-notchedOutline.Mui-disabled": {
                borderColor: "var(--PrymaryContainer-color)", // Border color
              },
            }}
          />
        </form>
      )}
      {fetching && (
        <ListItemIcon>
          <CircularProgress
            size={20}
            sx={{ color: "var(--OnPrymary-color)" }}
          />
        </ListItemIcon>
      )}
    </ListItem>
  );
};

export default EditContenidoInpt;
