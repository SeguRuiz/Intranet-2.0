import { useCustomModal } from "../../../utils/customHooks";
import { useRef } from "react";
import Read_grupos_disponibles from "../Read-grupos-escogibles/Read_grupos_disponibles";
import { set_grupo_seleccionado } from "../../../redux/ControlUsuariosSlice";
import { useDispatch } from "react-redux";
import './Add_integrantes_grupo.css'
const Add_integrantes_grupo = () => {
const dlg_ref = useRef()
const {openModal, closeModal} = useCustomModal(dlg_ref)
const accion = useDispatch()

const resetear_grupo = (e) =>{
if(e.target == dlg_ref.current){
    accion(set_grupo_seleccionado(null))
    closeModal()
}
}

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
        <path d="M500-482q29-32 44.5-73t15.5-85q0-44-15.5-85T500-798q60 8 100 53t40 105q0 60-40 105t-100 53Zm220 322v-120q0-36-16-68.5T662-406q51 18 94.5 46.5T800-280v120h-80Zm80-280v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80Zm-480-40q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM0-160v-112q0-34 17.5-62.5T64-378q62-31 126-46.5T320-440q66 0 130 15.5T576-378q29 15 46.5 43.5T640-272v112H0Zm320-400q33 0 56.5-23.5T400-640q0-33-23.5-56.5T320-720q-33 0-56.5 23.5T240-640q0 33 23.5 56.5T320-560ZM80-240h480v-32q0-11-5.5-20T540-306q-54-27-109-40.5T320-360q-56 0-111 13.5T100-306q-9 5-14.5 14T80-272v32Zm240-400Zm0 400Z" />
      </svg>
      <dialog className="add-integrantes-grupo-dlg" ref={dlg_ref} onClick={resetear_grupo}>
        <div className="add-integrantes-grupo-content">
            <Read_grupos_disponibles/>
        </div>
      </dialog>
    </>
  );
};

export default Add_integrantes_grupo;