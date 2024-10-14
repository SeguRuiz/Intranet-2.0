import { useRef } from "react";
import { useCustomModal } from "../../../../../utils/customHooks";
import Read_interantes from "./Read_interantes";

const Read_Integrantes_modal = () => {
  const dlg_ref = useRef();
  const { openModal, closeModalDlg } = useCustomModal(dlg_ref);
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#9AA0A6"
        onClick={openModal}
      >
        <path d="M120-120v-320h80v184l504-504H520v-80h320v320h-80v-184L256-200h184v80H120Z" />
      </svg>
      <dialog ref={dlg_ref} onClick={closeModalDlg} className="read-integrantes-modal">
        <div className="read-integrantes-grid">
        <div className="read-integrantes-info"></div>
        <div className="read-integrantes-content">
          <Read_interantes/>
        </div>
        </div>
      </dialog>
    </>
  );
};

export default Read_Integrantes_modal;
