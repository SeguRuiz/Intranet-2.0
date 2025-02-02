import {
  CircularProgress,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useFetch } from "../../../../services/llamados";
import { getCookie } from "../../../../utils/Cookies";
import { useDispatch } from "react-redux";
import { editNombreSubContenido } from "../../../../redux/CursosContenidosSlice";
const EditSubContInpt = ({
  selected = false,
  id = null,
  setEditando = null,
  idContenido = null,
  currentValue = "",
}) => {
  const inpt_ref = useRef();
  const { fetch_the_data, fetching } = useFetch();
  const token = getCookie("token");
  const accion = useDispatch();
  const [value, setValue] = useState("");

  useEffect(() => {
    inpt_ref.current && inpt_ref.current.focus();
  }, []);

  const editSubC = async (o) => {
    o.preventDefault();
    const inpt_value = inpt_ref.current.value.trim();
    if (inpt_value) {
      const data = await fetch_the_data(
        "http://localhost:8000/cursos_contenidos/subcontenidos_edit",
        token,
        "PATCH",
        {
          nombre: inpt_value,
        },
        id
      );

      if (data[0] == 200) {
        accion(
          editNombreSubContenido({
            id: id,
            nombre: inpt_value,
            idContenido: idContenido,
          })
        );
        setValue(inpt_value)
        setEditando(false);

        return;
      }

      inpt_ref.current.value = "Nombre";
    }
  };
  return (
    <>
      {fetching ? (
        <>
          <ListItemText primary={value}></ListItemText>
          <ListItemIcon>
            <CircularProgress
              size={20}
              sx={{ color: "var(--OnsurfaceVariant)" }}
            />
          </ListItemIcon>
        </>
      ) : (
        <form onSubmit={editSubC}>
          <TextField
            size="small"
            fullWidth
            autoComplete="off"
            inputRef={inpt_ref}
            onChange={(o) => {
              setValue(o.target.value);
            }}
            defaultValue={currentValue}
            sx={{
              "& .MuiInputBase-input": {
                color: "var(--OnsurfaceVariant)",
                height: "1.3vh", // Text color
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  opacity: 0, // Default border color
                },
                "&:hover fieldset": {
                  opacity: 0, // Hover border color
                },
                "&.Mui-focused fieldset": {
                  opacity: 0, // Focused border color
                },
                padding: "0px",
                "& .MuiInputBase-input": {
                  padding: "12px 1.5px", // Padding for the input text
                }, // Padding inside the input container
              },
            }}
          />
          <button type="submit" style={{ display: "none" }}></button>
        </form>
      )}
    </>
  );
};

export default EditSubContInpt;
