import {
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  TextField,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Add_file_Report from "../../Control-page/Reportes/add_file_report/Add_file_Report";
import SendIcon from "@mui/icons-material/Send";
import { getCookie } from "../../../utils/Cookies";
import { useFetch } from "../../../services/llamados";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { edit_justificacion_reporte } from "../../../redux/ControlUsuariosSlice";
const Enviar_Justificacion = ({
  reporte_id = null,
  descripcion_comprobante = "",
}) => {
  const inputRef = useRef(null);
  const [comprobanteArchivo, setComprobanteArchivo] = useState(null);
  const [text_value, set_text_value] = useState("");
  const [enviar, setEnviar] = useState(false);
  const token = getCookie("token");
  const { fetch_the_data } = useFetch();
  const [enviandoArchivo, setEnviando] = useState(false);
  const accion = useDispatch();

  useEffect(() => {
    if (descripcion_comprobante != "Sin descripcion") {
      set_text_value(descripcion_comprobante);
    }
  }, [descripcion_comprobante]);

  const subir_justificacion = async () => {
    if (text_value.trim() != "" && comprobanteArchivo) {
      setEnviar(true);
      const data = await fetch_the_data(
        "http://localhost:8000/reportes/subir_justificante",
        token,
        "PATCH",
        {
          descripcion_comprobante: text_value.trim(),
        },
        reporte_id
      );
      data == undefined &&
        toast.error("Ocurrio un error mandando la justificacion");
      if (data[0] == 200) {
        console.log(data[0]);
        
        accion(
          edit_justificacion_reporte({
            id: reporte_id,
            reporteEditado: data[1],
          })
        );
        setComprobanteArchivo(false);
      } else {
        toast.error("Ocurrio un error mandando la justificacion");
      }
      setEnviar(false);

      return;
    }
    toast.warning("Debes enviar un archivo junto con su descripcion");
  };

  return (
    <Box display={"flex"} alignItems={"start"} gap={"10px"}>
      <Avatar variant="rounded" />
      <Box
        width={"100%"}
        display={"flex"}
        flexDirection={"column"}
        gap={"15px"}
        sx={{
          border: "0.5px solid rgba(0,0,0,0.2)",
          borderRadius: "4px",
          padding: "10px 5px 5px 5px",
        }}
      >
        <Box
          width={"100%"}
          sx={{
            position: "relative",
          }}
        >
          {enviandoArchivo && (
            <CircularProgress
              size={15}
              sx={{
                position: "absolute",
                right: 5,
              }}
            />
          )}
          <TextField
            multiline
            placeholder="Indica tu justificacion"
            inputRef={inputRef}
            value={text_value}
            onChange={(o) => {
              set_text_value(o.target.value);
            }}
            slotProps={{
              input: {
                readOnly: descripcion_comprobante != "Sin descripcion" || enviandoArchivo,
              },
            }}
            minRows={2}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "rgba(0,0,0,0)", // Default border color
                },
                "&:hover fieldset": {
                  borderColor: "rgba(0,0,0,0)", // Hover border color
                },
                "&.Mui-focused fieldset": {
                  borderColor: "rgba(0,0,0,0)", // Focused border color
                },
                padding: "0px 10px 0px 10px",
                "& .MuiInputBase-input": {
                  padding: "0px", // Padding for the input text
                }, // Padding inside the input container
              },

              "& .MuiOutlinedInput-notchedOutline.Mui-disabled": {
                borderColor: "rgba(0,0,0,0)", // Border color
              },
            }}
            fullWidth
          />

          {comprobanteArchivo && (
            <Chip
              sx={{
                ml: 1,
                mt: 1,
              }}
              onDelete={() => {
                setComprobanteArchivo(null);
              }}
              label={comprobanteArchivo.name}
            />
          )}
        </Box>

        {descripcion_comprobante == "Sin descripcion" && (
          <Box width={"100%"} display={"flex"} justifyContent={"space-between"}>
            <Add_file_Report
              type_btn={true}
              reporte_id={reporte_id}
              set_archivo={setComprobanteArchivo}
              archivo_enviar={comprobanteArchivo}
              enviar={enviar}
              sending={setEnviando}
            />
            <Button
              startIcon={<SendIcon />}
              onClick={subir_justificacion}
              disabled={
                text_value == "" || !comprobanteArchivo || enviandoArchivo
              }
            >
              Enviar
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Enviar_Justificacion;
