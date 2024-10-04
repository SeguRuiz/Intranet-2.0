import { useRef } from "react";
import { useCustomModal } from "../../../../utils/customHooks";
import MenuRead from "../read/MenuRead";
import { AddCont } from "./AddContenido/AddCont";

import "./MenuModal.css";
import { useParams } from "react-router-dom";
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
          <AddCont/>
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
          <div className="menu-dlg-iterators">
           <MenuRead/>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default MenuModal;
