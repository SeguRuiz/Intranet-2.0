import Select_role from "../../select-role/Select_role";
import { useSelector } from "react-redux";
import "./Read_usuarios.css";
import { useEffect, useRef, useState } from "react";
import { agregar_a_seleccion_multiple } from "../../../../redux/ControlUsuariosSlice";
import { eliminar_de_seleccion_multiple } from "../../../../redux/ControlUsuariosSlice";
import { useCustomSelection } from "../../../../utils/customHooks";

const Select_usuarios = ({
  username,
  user_id,
  rol_id,
  apellidos,
  cedula,
  email,
  nombre,
}) => {
  const { seleccion_multiple_activado } = useSelector((e) => e.ControlUsuarios);
  const { click_Checkbox, selected } = useCustomSelection(
    eliminar_de_seleccion_multiple,
    agregar_a_seleccion_multiple,
    { user_id: user_id },
    seleccion_multiple_activado
  );
  const userCheckBox = useRef();

  return (
    <div
      className={
        seleccion_multiple_activado && !selected
          ? "user-info-card-animated"
          : selected && seleccion_multiple_activado
          ? "user-info-card-selected"
          : "user-info-card"
      }
      onClick={click_Checkbox}
    >
      <input
        type="checkbox"
        name=""
        id=""
        style={{ display: "none" }}
        ref={userCheckBox}
      />
      <div className="user-Profile">
        <div className="user-circle"></div>
        <div className="user-name">
          <p
            style={{
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
              maxWidth: "80px",
            }}
          >
            {username}
          </p>
          {!selected && !seleccion_multiple_activado && (
            <Select_role user_id={user_id} rol_de_usuario_id={rol_id} />
          )}
          {seleccion_multiple_activado && (
            <div
              className={
                seleccion_multiple_activado && selected
                  ? "chekbox-users-selected"
                  : "chekbox-users"
              }
            >
              {seleccion_multiple_activado && selected && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#ffff"
                >
                  <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                </svg>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="user-info-text">
        <div className="user-nombre">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#9AA0A6"
          >
            <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
          </svg>
          <p
            style={{
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
              maxWidth: "165px",
            }}
          >{`${nombre} ${apellidos}`}</p>
        </div>

        <div className="user-email">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#9AA0A6"
          >
            <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480v58q0 59-40.5 100.5T740-280q-35 0-66-15t-52-43q-29 29-65.5 43.5T480-280q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480v58q0 26 17 44t43 18q26 0 43-18t17-44v-58q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93h200v80H480Zm0-280q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Z" />
          </svg>
          <p
            style={{
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
              maxWidth: "165px",
            }}
          >
            {email}
          </p>
        </div>
        <div className="user-cedula">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#9AA0A6"
          >
            <path d="M560-440h200v-80H560v80Zm0-120h200v-80H560v80ZM200-320h320v-22q0-45-44-71.5T360-440q-72 0-116 26.5T200-342v22Zm160-160q33 0 56.5-23.5T440-560q0-33-23.5-56.5T360-640q-33 0-56.5 23.5T280-560q0 33 23.5 56.5T360-480ZM160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80h640v-480H160v480Zm0 0v-480 480Z" />
          </svg>
          <p
            style={{
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
              maxWidth: "165px",
            }}
          >
            {cedula}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Select_usuarios;
