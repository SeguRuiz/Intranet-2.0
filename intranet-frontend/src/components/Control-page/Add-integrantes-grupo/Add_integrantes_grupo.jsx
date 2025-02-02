import { useCustomModal } from "../../../utils/customHooks";
import { useEffect, useRef, useState } from "react";
import Read_grupos_disponibles from "../Read-grupos-escogibles/Read_grupos_disponibles";
import { set_grupo_seleccionado } from "../../../redux/ControlUsuariosSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  activar_seleccion_multiple,
  desactivar_seleccion_multiple,
} from "../../../redux/ControlUsuariosSlice";
import { set_seleccion_integrantes } from "../../../redux/ControlUsuariosSlice";
import Add_integrantes_btn from "./Add_integrantes_btn";
import "./Add_integrantes_grupo.css";
import { Divider, IconButton, Tooltip } from "@mui/material";
const Add_integrantes_grupo = () => {
  const dlg_ref = useRef();
  const { grupo_seleccionado, seleccionando_integrantes, grupos } = useSelector(
    (e) => e.ControlUsuarios
  );
  const [habilitar, setHabilitar] = useState(true);
  const aceptarBtn = useRef();
  const accion = useDispatch();

  useEffect(() => {
    setHabilitar(grupo_seleccionado != null);
  }, [grupo_seleccionado]);

  const { openModal, closeModal } = useCustomModal(dlg_ref);

  const resetear_grupo = (e) => {
    if (e.target == dlg_ref.current) {
      accion(set_grupo_seleccionado(null));
      closeModal();
    }
  };

  const cancelar_seleccion = () => {
    accion(desactivar_seleccion_multiple());
    accion(set_seleccion_integrantes(false));
    accion(set_grupo_seleccionado(null));
  };

  return (
    <>
      {!seleccionando_integrantes ? (
        <>
          <Tooltip title="Agregar usuarios a un grupo">
            <IconButton onClick={openModal}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="var(--OnsurfaceVariant)"
              >
                <path d="M500-482q29-32 44.5-73t15.5-85q0-44-15.5-85T500-798q60 8 100 53t40 105q0 60-40 105t-100 53Zm220 322v-120q0-36-16-68.5T662-406q51 18 94.5 46.5T800-280v120h-80Zm80-280v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80Zm-480-40q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM0-160v-112q0-34 17.5-62.5T64-378q62-31 126-46.5T320-440q66 0 130 15.5T576-378q29 15 46.5 43.5T640-272v112H0Zm320-400q33 0 56.5-23.5T400-640q0-33-23.5-56.5T320-720q-33 0-56.5 23.5T240-640q0 33 23.5 56.5T320-560ZM80-240h480v-32q0-11-5.5-20T540-306q-54-27-109-40.5T320-360q-56 0-111 13.5T100-306q-9 5-14.5 14T80-272v32Zm240-400Zm0 400Z" />
              </svg>
            </IconButton>
          </Tooltip>
          <dialog
            className="add-integrantes-grupo-dlg"
            ref={dlg_ref}
            onClick={resetear_grupo}
          >
            <div className="add-integrantes-grupo-container">
              <div
                className={
                  grupos[0] == undefined
                    ? "add-integrantes-grupo-content-vacio"
                    : "add-integrantes-grupo-content"
                }
              >
                {grupos.length != 0 && (
                  <>
                    <h1 className="hint-grupo-usuarios" >
                      Selecciona a que grupo quieres agregar usuarios
                    </h1>
                    <Divider variant="middle" />
                  </>
                )}
                {grupos[0] == undefined ? (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="150px"
                      viewBox="0 -960 960 960"
                      width="150px"
                      fill="var(--OnsurfaceVariant)"
                    >
                      <path d="m150-400 82-80-82-82-80 82 80 80Zm573-10 87-140 88 140H723Zm-243-70q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T600-600q0 50-34.5 85T480-480Zm.35-180q-25.35 0-42.85 17.15t-17.5 42.5q0 25.35 17.35 42.85t43 17.5Q506-540 523-557.35t17-43Q540-626 522.85-643t-42.5-17Zm-.35 60ZM0-240v-53q0-39.46 42-63.23Q84-380 150.4-380q12.16 0 23.38.5 11.22.5 22.22 2.23-8 17.27-12 34.84-4 17.57-4 37.43v65H0Zm240 0v-65q0-65 66.5-105T480-450q108 0 174 40t66 105v65H240Zm570-140q67.5 0 108.75 23.77T960-293v53H780v-65q0-19.86-3.5-37.43T765-377.27q11-1.73 22.17-2.23 11.17-.5 22.83-.5Zm-330.2-10Q400-390 350-366q-50 24-50 61v5h360v-6q0-36-49.5-60t-130.7-24Zm.2 90Z" />
                    </svg>
                    <strong>No hay grupos disponibles para asignar</strong>
                  </>
                ) : (
                  <Read_grupos_disponibles />
                )}
              </div>
              <div className="add-integrantes-grupo-options">
                <button
                  className="cancelar-seleccion-grupos"
                  onClick={() => {
                    accion(set_grupo_seleccionado(null));
                    closeModal();
                  }}
                >
                  cancelar
                </button>
                <button
                  ref={aceptarBtn}
                  className={
                    habilitar
                      ? "aceptar-seleccion-grupos"
                      : "aceptar-seleccion-grupos-desactivado"
                  }
                  onClick={() => {
                    if (grupo_seleccionado != null) {
                      accion(activar_seleccion_multiple());
                      accion(set_seleccion_integrantes(true));
                      closeModal();
                    }
                  }}
                >
                  aceptar
                </button>
              </div>
            </div>
          </dialog>
        </>
      ) : (
        <>
          <Tooltip title="Cancelar seleccion">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#9AA0A6"
              onClick={cancelar_seleccion}
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </Tooltip>
          <Add_integrantes_btn />
        </>
      )}
    </>
  );
};

export default Add_integrantes_grupo;
