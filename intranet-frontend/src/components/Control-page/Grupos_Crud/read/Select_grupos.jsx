import "./Read_grupos.css";
import { useSelector } from "react-redux";
import { useCustomSelection } from "../../../../utils/customHooks";
import {
  agregar_seleccion_grupos,
  eliminar_de_seleccion_multiple_grupos,
} from "../../../../redux/ControlUsuariosSlice";
import Read_Integrantes_modal from "./Read_integrantes/Read_Integramtes_modal";
const Select_grupos = ({ id, nombre_grupo, usuarios_grupo, sedes_id }) => {
  const {
    seleccion_multiple_activado_grupos,
    seleccion_multiple_grupos,
    sedes,
  } = useSelector((e) => e.ControlUsuarios);

  const { selected, click_Checkbox } = useCustomSelection(
    eliminar_de_seleccion_multiple_grupos,
    agregar_seleccion_grupos,
    id,
    seleccion_multiple_activado_grupos
  );

  const sede = sedes.find((e) => e.id == sedes_id) ?? false;

  return (
    <div
      className={
        seleccion_multiple_activado_grupos && !selected
          ? "read-grupos-card-animated "
          : selected && seleccion_multiple_activado_grupos
          ? "read-grupos-card-selected"
          : "read-grupos-card"
      }
      onClick={click_Checkbox}
    >
      <div
        className={
          seleccion_multiple_activado_grupos && selected
            ? "read-grupos-title-selected"
            : "read-grupos-title"
        }
      >
        <div
          className={
            seleccion_multiple_activado_grupos && selected
              ? "read-grupos-file-style-selected"
              : "read-grupos-file-style"
          }
        >
          {!selected && (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="20px"
                fill="#9AA0A6"
              >
                <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
              </svg>
              <p>{usuarios_grupo.length}</p>
            </>
          )}

          {seleccion_multiple_grupos && selected && (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="40px"
                viewBox="0 -960 960 960"
                width="40px"
                fill="#ffff"
              >
                <path d="M379.33-244 154-469.33 201.67-517l177.66 177.67 378.34-378.34L805.33-670l-426 426Z" />
              </svg>
            </>
          )}
        </div>
        <div className="read-grupos-sede-info">
          <div className="main-sede-info"></div>
        </div>
      </div>
      <div className="read-grupos-info">
        <div className="main-grupos-text">
          <div className="grupo-nombre">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="28px"
              fill="var(--OnsurfaceVariant)"
            >
              <path d="M0-240v-63q0-43 44-70t116-27q13 0 25 .5t23 2.5q-14 21-21 44t-7 48v65H0Zm240 0v-65q0-32 17.5-58.5T307-410q32-20 76.5-30t96.5-10q53 0 97.5 10t76.5 30q32 20 49 46.5t17 58.5v65H240Zm540 0v-65q0-26-6.5-49T754-397q11-2 22.5-2.5t23.5-.5q72 0 116 26.5t44 70.5v63H780Zm-455-80h311q-10-20-55.5-35T480-370q-55 0-100.5 15T325-320ZM160-440q-33 0-56.5-23.5T80-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T160-440Zm640 0q-33 0-56.5-23.5T720-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T800-440Zm-320-40q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T600-600q0 50-34.5 85T480-480Zm0-80q17 0 28.5-11.5T520-600q0-17-11.5-28.5T480-640q-17 0-28.5 11.5T440-600q0 17 11.5 28.5T480-560Zm1 240Zm-1-280Z" />
            </svg>
            <p>{nombre_grupo}</p>
          </div>
          <div className="grupo-sede">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="28px"
              viewBox="0 -960 960 960"
              width="28px"
              fill="var(--OnsurfaceVariant)"
            >
              <path d="M120-120v-560h160v-160h400v320h160v400H520v-160h-80v160H120Zm80-80h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 320h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 480h80v-80h-80v80Zm0-160h80v-80h-80v80Z" />
            </svg>
            <p>{sede.nombre}</p>
          </div>
          <div className="grupo-ubicacion">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="28px"
              viewBox="0 -960 960 960"
              width="28px"
              fill="var(--OnsurfaceVariant)"
            >
              <path d="M480-301q99-80 149.5-154T680-594q0-90-56-148t-144-58q-88 0-144 58t-56 148q0 65 50.5 139T480-301Zm0 101Q339-304 269.5-402T200-594q0-125 78-205.5T480-880q124 0 202 80.5T760-594q0 94-69.5 192T480-200Zm0-320q33 0 56.5-23.5T560-600q0-33-23.5-56.5T480-680q-33 0-56.5 23.5T400-600q0 33 23.5 56.5T480-520ZM200-80v-80h560v80H200Zm280-520Z" />
            </svg>
            <p>{sede?.ubicacion}</p>
          </div>
        </div>
        <div className="main-grupos-options">
          {!seleccion_multiple_activado_grupos && (
            <Read_Integrantes_modal usuarios_grupo={usuarios_grupo} grupo_id={id} grupo_nombre={nombre_grupo} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Select_grupos;
