import "./Read_sedes.css";
import { useCustomSelection } from "../../../../utils/customHooks";
import { useSelector } from "react-redux";
import {
  agregar_a_seleccion_multiple_sedes,
  eliminar_de_seleccion_multiple_sedes,
} from "../../../../redux/ControlUsuariosSlice";

const Select_sedes = ({ nombre, ubicacion, sede_id }) => {
  const { seleccion_multiple_activado_sedes } = useSelector(
    (e) => e.ControlUsuarios
  );
  const { selected, click_Checkbox } = useCustomSelection(
    eliminar_de_seleccion_multiple_sedes,
    agregar_a_seleccion_multiple_sedes,
    {sede_id},
    seleccion_multiple_activado_sedes
  );

  return (
    <div
      className={
        seleccion_multiple_activado_sedes && !selected
          ? "read-sedes-container-animated"
          : selected && seleccion_multiple_activado_sedes
          ? "read-sedes-container-selected"
          : "read-sedes-container"
      }
      onClick={click_Checkbox}
    >
      <div className="read-sedes-img">
        {seleccion_multiple_activado_sedes && (
          <div
            className={
              seleccion_multiple_activado_sedes && selected
                ? "chekbox-sedes-selected"
                : "chekbox-sedes"
            }
          >
            {seleccion_multiple_activado_sedes && selected && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="48px"
                viewBox="0 -960 960 960"
                width="80px"
                fill="#ffff"
              >
                <path d="M378-246 154-470l43-43 181 181 384-384 43 43-427 427Z" />
              </svg>
            )}
          </div>
        )}
      </div>
     
      <div className="read-sedes-info">
        <div className="read-sedes-nombre">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#9AA0A6"
          >
            <path d="M120-120v-560h240v-80l120-120 120 120v240h240v400H120Zm80-80h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm240 320h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm240 480h80v-80h-80v80Zm0-160h80v-80h-80v80Z" />
          </svg>
          <p
            style={{
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
              maxWidth: "165px",
            }}
          >
            {nombre}
          </p>
        </div>
        <div className="read-sedes-ubicacion">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#9AA0A6"
          >
            <path d="M516-120 402-402 120-516v-56l720-268-268 720h-56Zm26-148 162-436-436 162 196 78 78 196Zm-78-196Z" />
          </svg>
          <p
            style={{
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
              maxWidth: "165px",
            }}
          >
            {ubicacion}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Select_sedes;
