import { ListItem, ListItemIcon, TextField, IconButton } from "@mui/material";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import { useDispatch } from "react-redux";
import { getCookie } from "../../../../utils/Cookies";
import CloseIcon from "@mui/icons-material/Close";
import { useFetch } from "../../../../services/llamados";
import { useState, useRef, useEffect } from "react";
import { addSubcontenido } from "../../../../redux/CursosContenidosSlice";
import UploadIcon from "@mui/icons-material/Upload";
const AddSubContInpt = ({
  setAddSub,
  contenido_id = null,
  setOpen,
  subcontenidos = [],
}) => {
  const [value, setValue] = useState("");
  const inpt_ref = useRef(null);
  const form_ref = useRef(null);
  const submit_btn_ref = useRef(null);
  const accion = useDispatch();
  const token = getCookie("token");
  const { fetch_the_data } = useFetch();

  useEffect(() => {
    if (inpt_ref) {
      inpt_ref.current.focus();
    }
  }, []);

  const addSubCont = async (o) => {
    o.preventDefault();
    const input_value = value.trim();
    if (input_value != "") {
      const data = await fetch_the_data(
        "https://intranet-2-0-api.onrender.com/cursos_contenidos/subcontenidos",
        token,
        "POST",
        { nombre: input_value, contenido: contenido_id }
      );

      accion(addSubcontenido({ contenido_id: contenido_id, data: data[1] }));
      form_ref.current.reset();
      setAddSub(false);
      return;
    }
  };

  return (
    <ListItem
      secondaryAction={
        <IconButton
          onClick={() => {
            setAddSub(false);
            value.trim() == "" && subcontenidos.length == 0 && setOpen(false);
            if (submit_btn_ref) {
              value.trim() != "" && submit_btn_ref.current.click();
            }
          }}
        >
          {value.trim() == "" ? (
            <CloseIcon
              sx={{ color: "var(--OnsurfaceVariant)" }}
              fontSize="small"
            />
          ) : (
            <UploadIcon
              sx={{ color: "var(--OnsurfaceVariant)" }}
              fontSize="small"
            />
          )}
        </IconButton>
      }
    >
      <ListItemIcon>
        <ArticleOutlinedIcon />
      </ListItemIcon>
      <form ref={form_ref} onSubmit={addSubCont}>
        <TextField
          size="small"
          fullWidth
          inputRef={inpt_ref}
          placeholder="Nombra tu archivo"
          onChange={(event) => {
            setValue(event.target.value);
          }}
          sx={{
            "& .MuiInputBase-input": {
              color: "var(--OnsurfaceVariant)", // Text color
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "var(--SurfaceBrigth-color)", // Default border color
              },
              "&:hover fieldset": {
                borderColor: "var(--SurfaceBrigth-color)", // Hover border color
              },
              "&.Mui-focused fieldset": {
                borderColor: "var(--SurfaceBrigth-color)", // Focused border color
              },
              padding: "0px",
              "& .MuiInputBase-input": {
                padding: "12px 1.5px", // Padding for the input text
              }, // Padding inside the input container
            },
          }}
        />
        <button
          type="submit"
          style={{ display: "none" }}
          ref={submit_btn_ref}
        ></button>
      </form>
    </ListItem>
  );
};

export default AddSubContInpt;
