import Retractile_menu from "../../Retractile_menu/Retractile_menu";
import { agregar_grupos } from "../../../../redux/ControlUsuariosSlice";
import { useEffect, useRef } from "react";
import { useCustomNotis } from "../../../../utils/customHooks";
import { useFetch } from "../../../../services/llamados";
import { useDispatch } from "react-redux";
import { useCustomModal } from "../../../../utils/customHooks";
import { useSelector } from "react-redux";
import {
  desactivar_seleccion_multiple_sedes,
  vaciar_ids_temporales,
} from "../../../../redux/ControlUsuariosSlice";
import { set_fetching } from "../../../../redux/FetchsSlice";
import "./Add_grupos.css";
import { TextField, Button } from "@mui/material";
import { getCookie } from "../../../../utils/Cookies";

const Add_grupos = () => {
  const { ok, error, fetching, fetch_the_data } = useFetch();
  const { ok_mensaje, error_mensaje } = useCustomNotis(
    "ocurrio un error",
    "Se agrego correctamente"
  );
  const { seleccion_multiple_sedes } = useSelector((e) => e.ControlUsuarios);
  const dlg_ref = useRef();
  const { openModal, closeModalDlg, closeModal } = useCustomModal(dlg_ref);
  const accion = useDispatch();
  const grupo_nombre_inpt = useRef();
  const form_ref = useRef();
  const token = getCookie("token");

  const subir_grupo = async (o) => {
    o.preventDefault();
    const grupo_nombre_value = grupo_nombre_inpt.current.value.trim();

    if (grupo_nombre_value != "") {
      accion(set_fetching(true));
      
      const data = await fetch_the_data(
        "http://localhost:8000/cursos/grupos",
        token,
        "POST",
        {
          nombre_grupo: grupo_nombre_value,
          sede_id: seleccion_multiple_sedes[0].sede_id,
        }
      );
      data == undefined && error_mensaje();

      if (data[0] == 201) {
        ok_mensaje();
        accion(agregar_grupos({ ...data[1], integrantes: [] }));
        accion(desactivar_seleccion_multiple_sedes());
        accion(vaciar_ids_temporales("sedes"));
        form_ref.current.reset();
        accion(set_fetching(false));
        closeModal();
      } else {
        error_mensaje();
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
        fill="var(--OnSecondary-color)"
        onClick={openModal}
      >
        <path d="M500-482q29-32 44.5-73t15.5-85q0-44-15.5-85T500-798q60 8 100 53t40 105q0 60-40 105t-100 53Zm220 322v-120q0-36-16-68.5T662-406q51 18 94.5 46.5T800-280v120h-80Zm80-280v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80Zm-480-40q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM0-160v-112q0-34 17.5-62.5T64-378q62-31 126-46.5T320-440q66 0 130 15.5T576-378q29 15 46.5 43.5T640-272v112H0Zm320-400q33 0 56.5-23.5T400-640q0-33-23.5-56.5T320-720q-33 0-56.5 23.5T240-640q0 33 23.5 56.5T320-560ZM80-240h480v-32q0-11-5.5-20T540-306q-54-27-109-40.5T320-360q-56 0-111 13.5T100-306q-9 5-14.5 14T80-272v32Zm240-400Zm0 400Z" />
      </svg>
      <dialog
        ref={dlg_ref}
        onClick={closeModalDlg}
        className="add-grupos-modal"
      >
        <div className="add-grupos-content">
          <Retractile_menu
            titulo="Grupos"
            altura={24}
            ok={ok}
            loading={fetching}
            error={error}
          >
            <form
              className="add-grupos-form"
              onSubmit={subir_grupo}
              ref={form_ref}
            >
              <TextField
                label={"Nombre del grupo"}
                inputRef={grupo_nombre_inpt}
                variant="standard"
                required
                size="big"
                margin="dense"
              />
              <Button type="submit">Subir</Button>
            </form>
          </Retractile_menu>
        </div>
      </dialog>
    </>
  );
};

export default Add_grupos;
