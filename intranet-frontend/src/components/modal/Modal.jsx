import React from "react";
import "./modal.css";
{
  /*Modal encargado de abrir una pantalla con una descrpcion */
}
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <form>
          <button className="close-button" onClick={onClose}>
            Cerrrar
          </button>
        </form>
        {children}
      </div>
    </div>
  );
};

export default Modal;
