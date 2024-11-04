import { useRef } from "react";
import { useCustomModal } from "../../../../utils/customHooks";
import MenuRead from "../read/MenuRead";
import { AddCont } from "./AddContenido/AddCont";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import "./MenuModal.css";

const MenuModal = () => {
  const modalRef = useRef();
  const { Contenidos } = useSelector((state) => state.CursosContenidos);

  const { openModal, closeModalDlg } = useCustomModal(modalRef);

  return (
    <>
      <Button onClick={openModal}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="35px"
          viewBox="0 -960 960 960"
          width="35px"
          fill="var(--OnPrymary-color)"
        >
          <path d="M160-410v-60h300v60H160Zm0-165v-60h470v60H160Zm0-165v-60h470v60H160Zm360 580v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q9 9 13 20t4 22q0 11-4.5 22.5T862.09-380L643-160H520Zm263-224 37-39-37-37-38 38 38 38Z" />
        </svg>
      </Button>
      <dialog
        onClick={closeModalDlg}
        ref={modalRef}
        style={{ margin: "auto" }}
        className="modal-dlg"
      >
        <div className="menu-dlg-content">
          <div className="add-cont-container">
            <AddCont />
          </div>
          <div
            className={
              Contenidos[0] == undefined
                ? "menu-dlg-iterators-vacio"
                : "menu-dlg-iterators"
            }
          >
            {Contenidos[0] == undefined ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="100px"
                  viewBox="0 -960 960 960"
                  width="100px"
                  fill="var(--OnsurfaceVariant)"
                >
                  <path d="M450-234h60v-129h130v-60H510v-130h-60v130H320v60h130v129ZM220-80q-24 0-42-18t-18-42v-680q0-24 18-42t42-18h361l219 219v521q0 24-18 42t-42 18H220Zm331-554h189L551-820v186Z" />
                </svg>
                <strong>Agrega tus contenidos</strong>
              </>
            ) : (
              <MenuRead />
            )}
          </div>
        </div>
      </dialog>
    </>
  );
};

export default MenuModal;
