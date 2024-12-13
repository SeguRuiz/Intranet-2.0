import { useEffect, useState } from "react";
import "./Sidemenu.css";
import MenuContenido from "./contenido/MenuContenido";
import { useSelector } from "react-redux";
import MenuModal from "./MenuCrud/Add/MenuModal";
export const Sidemenu = () => {
  const { Es_admin } = useSelector((state) => state.IsAdmin);
  const { Contenidos } = useSelector((state) => state.CursosContenidos);

  return (
    <>
      <div className={"sidemenu-container"}>
        <div className="menu-container">
          {Contenidos.map((contenido) => (
            <MenuContenido
              key={contenido.id}
              nombre={contenido.nombre}
              subcontenidos={contenido.subcontenidos}
            />
          ))}
        </div>
      </div>
    </>
  );
};
