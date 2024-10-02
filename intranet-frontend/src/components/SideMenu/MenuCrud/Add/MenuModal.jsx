import { useRef } from "react";
import { useCustomModal } from "../../../../utils/customHooks";
import "./MenuModal.css";
const MenuModal = () => {
  const modalRef = useRef();
  const { openModal, closeModalDlg } = useCustomModal(modalRef);

  return (
    <>
      <button onClick={openModal}>editar</button>
      <dialog
        onClick={closeModalDlg}
        ref={modalRef}
        style={{ margin: "auto" }}
        className="modal-dlg"
      >
        <div className="menu-dlg-content">
          <div className="menu-dlg-content-info">
            <div className="menu-info-nav">
              <p>Nombre</p>
            </div>
            <div className="menu-info-nav">
              <p>Contenidos</p>
            </div>
            <div className="menu-info-nav">
              <p>Opciones</p>
            </div>
          </div>
          <div className="menu-dlg-iterators"></div>
        </div>
      </dialog>
    </>
  );
};

export default MenuModal;
