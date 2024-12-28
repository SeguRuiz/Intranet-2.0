import { useRef, useState } from "react";
import { useCustomModal } from "../../../../utils/customHooks";
import { useFetch } from "../../../../services/llamados";
import { getCookie } from "../../../../utils/Cookies";
import { Backdrop } from "@mui/material";
import { CircularProgress } from "@mui/material";
const Ver_comprobante = ({ comprobante_id }) => {
  const modal_ref = useRef();
  const [archivo, setArchivo] = useState(null);
  const [open, setOpen] = useState(false);
  const token = getCookie("token");
  const { closeModalDlg, openModal } = useCustomModal(modal_ref);
  const { fetch_the_data } = useFetch();

  const get_archivo = async () => {
    setOpen(true);

    const data = await fetch_the_data(
      "https://intranet-2-0-api.onrender.com/files/get_archivo",
      token,
      "POST",
      {
        archivo: comprobante_id,
      }
    );

    if (data[0] == 200) {
      setArchivo(data[1].archivo);
      setOpen(false);
      openModal();
    }
  };
  return (
    <>
      <div className="file-mock" ref={modal_ref} onClick={get_archivo}>
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
      <dialog
        ref={modal_ref}
        className="comprobante-dlg"
        onClick={closeModalDlg}
      >
        <iframe src={archivo} height={"100%"} width={"100%"}></iframe>
      </dialog>
      <Backdrop open={open}>
        <CircularProgress />
      </Backdrop>
    </>
  );
};

export default Ver_comprobante;
