import { useRef } from "react";
import { useCustomModal } from "../../../../../utils/customHooks";
import Read_interantes from "./Read_interantes";
import Edit_crud from "../../../edit-option/Edit_crud";
import { TransitionGroup } from "react-transition-group";

const Read_Integrantes_modal = ({ usuarios_grupo, grupo_id, grupo_nombre }) => {
  const dlg_ref = useRef();


  const { openModal, closeModalDlg } = useCustomModal(dlg_ref);
  return (
    <>
     <div className="open-integrantes-modal-container">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="15px"
        viewBox="0 -960 960 960"
        width="15px"
        fill="#9AA0A6"
        onClick={openModal}
        className="open-integrante-modal-btn"
      >
     
        <path d="M120-120v-320h80v184l504-504H520v-80h320v320h-80v-184L256-200h184v80H120Z" />
      </svg>
      </div>
      <dialog
        ref={dlg_ref}
        onClick={closeModalDlg}
        className="read-integrantes-modal"
      >
        <div className="read-integrantes-grid">
          <div className="read-integrantes-info">
            {grupo_nombre}
          </div>
          <div
            className={
              usuarios_grupo[0] == undefined
                ? "read-integrantes-content-vacio"
                : "read-integrantes-content"
            }
          >
            {usuarios_grupo[0] == undefined ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="200px"
                  viewBox="0 -960 960 960"
                  width="200px"
                  fill="var(--OnsurfaceVariant)"
                >
                  <path d="m813-61-99-99H160v-94q0-38 19-65t49-41q60-27 115.5-42T455-419L61-813l43-43 752 752-43 43ZM220-220h434L515-359q-8-1-17-1h-18q-57 0-111 11.5T252-306q-14 7-23 21.5t-9 30.5v34Zm511-140q31 14 50 41t19 65v8L657-389q18 6 36.5 13.5T731-360ZM550-496l-48-48q30-7 49-31t19-56q0-38-26-64t-64-26q-32 0-56 19t-31 49l-48-48q19-38 55.5-59t79.5-21q63 0 106.5 43.5T630-631q0 43-21 79.5T550-496Zm104 276H220h434ZM448-599Z" />
                </svg>
                <p>No hay usuarios en este grupo</p>
              </>
            ) : (
              
              <Read_interantes
                usuarios_grupo={usuarios_grupo}
                grupo_id={grupo_id}
              />
              
            )}
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Read_Integrantes_modal;
