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
      <button onClick={openModal} className="edit-sidebar-btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="40px"
          viewBox="0 -960 960 960"
          width="40px"
          fill="#ffff"
        >
          <path d="M160-410v-60h300v60H160Zm0-165v-60h470v60H160Zm0-165v-60h470v60H160Zm360 580v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q9 9 13 20t4 22q0 11-4.5 22.5T862.09-380L643-160H520Zm300-263-37-37 37 37ZM580-220h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19Z" />
        </svg>
      </button>
      <dialog
        onClick={closeModalDlg}
        ref={modalRef}
        style={{ margin: "auto" }}
        className="modal-dlg"
      >
        <div className="menu-dlg-content">
          <AddCont />
          <div className="menu-dlg-content-info">
            <div className="menu-info-nav">
              <p>Nombre</p>
            </div>
            <div></div>
            <div className="menu-info-nav">
              <p>Opciones</p>
            </div>
          </div>
          <div className="menu-dlg-iterators">
            <MenuRead />
          </div>
        </div>
      </dialog>
    </>
  );
};

export default MenuModal;
