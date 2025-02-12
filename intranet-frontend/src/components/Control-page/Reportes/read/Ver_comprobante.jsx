import { useRef, useState } from "react";
import { useCustomModal } from "../../../../utils/customHooks";
import { useFetch } from "../../../../services/llamados";
import { getCookie } from "../../../../utils/Cookies";
import { Backdrop, ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { CircularProgress } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
const Ver_comprobante = ({ comprobante_id = null, menuItem = false }) => {
  const modal_ref = useRef();
  const [archivo, setArchivo] = useState({
    tipo_archivo: "",
    nombre: "",
    archivo: "",
    expira_en: "",
  });
  const [open, setOpen] = useState(false);
  const token = getCookie("token");
  const { closeModalDlg, openModal } = useCustomModal(modal_ref);
  const { fetch_the_data } = useFetch();

  const get_archivo = async () => {
    setOpen(true);

    const data = await fetch_the_data(
      "http://localhost:8000/files/obtener_archivo_from_google_cloud",
      token,
      "POST",
      {
        folder: "RC",
        archivo_id: comprobante_id,
      }
    );
    console.log(data);

    if (data[0] == 200) {
      setArchivo(data[1]);
      setOpen(false);
      openModal();
    }
  };
  return (
    <>
      {menuItem ? (
        <MenuItem disabled={comprobante_id == null} onClick={get_archivo}>
          <ListItemIcon>
            <DescriptionIcon />
          </ListItemIcon>
          <ListItemText primary={"Ver comprobante"} />
        </MenuItem>
      ) : (
        <div className="file-mock" onClick={get_archivo}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="60px"
            viewBox="0 -960 960 960"
            width="60px"
            fill="var(--OnsurfaceVariant)"
          >
            <path d="M319-250h322v-60H319v60Zm0-170h322v-60H319v60ZM160-80v-800h421l219 219v581H160Zm391-554h189L551-820v186Z" />
          </svg>
          <p>Ver comprobante</p>
        </div>
      )}
      <dialog
        ref={modal_ref}
        className="comprobante-dlg"
        onClick={closeModalDlg}
      >
        {archivo.tipo_archivo.toLowerCase().includes("image") ? (
          <img
            src={archivo.archivo}
            alt="Ocurrio un error al cargar el comprobante"
            className="reporte-img"
          />
        ) : (
          <iframe src={archivo.archivo} height={"100%"} width={"100%"}></iframe>
        )}
      </dialog>
      <Backdrop open={open}>
        <CircularProgress />
      </Backdrop>
    </>
  );
};

export default Ver_comprobante;
