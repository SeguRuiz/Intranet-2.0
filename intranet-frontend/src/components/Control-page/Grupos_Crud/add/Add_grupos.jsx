import Retractile_menu from "../../Retractile_menu/Retractile_menu";
import { agregar_grupos } from "../../../../redux/ControlUsuariosSlice";
import { useRef } from "react";
import { useFetch } from "../../../../services/llamados";
import { useDispatch } from "react-redux";
import { useCustomModal } from "../../../../utils/customHooks";
import { useSelector } from "react-redux";
import './Add_grupos.css'
const Add_grupos = () => {
  const { ok, error, fetching, fetch_the_data, define_fetch, } = useFetch();
  const {seleccion_multiple_sedes} = useSelector(e => e.ControlUsuarios)
  const dlg_ref = useRef();
  const { openModal, closeModalDlg, closeModal } = useCustomModal(dlg_ref);
  const token = sessionStorage.getItem("token");
  const accion = useDispatch();
  const grupo_nombre_inpt = useRef();
  const form_ref = useRef();

  const subir_grupo = async (o) => {
    o.preventDefault();
    const grupo_nombre_value = grupo_nombre_inpt.current.value.trim();

    if (grupo_nombre_value != "") {
      define_fetch("http://localhost:8000/cursos/grupos", "", "POST", {
        nombre_grupo: grupo_nombre_value,
        sede_id: seleccion_multiple_sedes[0].sede_id
      });
      const data = await fetch_the_data(token);
      console.log(data);
      
      if (data[0] == 201) {
        accion(agregar_grupos(data[1]));
        form_ref.current.reset();
        closeModal()
      }
    }
  };

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
      <dialog ref={dlg_ref} onClick={closeModalDlg} className="add-grupos-modal">
       <div className="add-grupos-content">
        <Retractile_menu
          titulo="Grupos"
          altura={18}
          ok={ok}
          loading={fetching}
          error={error}
        >
          <form
            className="add-grupos-form"
            onSubmit={subir_grupo}
            ref={form_ref}
          >
            <input type="text" placeholder="Nombre" ref={grupo_nombre_inpt} />
            <button>Subir</button>
          </form>
        </Retractile_menu>
        </div>
      </dialog>
    </>
  );
};

export default Add_grupos;
