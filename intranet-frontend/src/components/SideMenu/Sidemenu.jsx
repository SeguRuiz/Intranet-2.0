import { useState } from "react";
import "./Sidemenu.css";
import MenuContenido from "./contenido/MenuContenido";
import { useSelector } from "react-redux";
import MenuModal from "./MenuCrud/Add/MenuModal";
export const Sidemenu = () => {
 const {Es_admin} = useSelector(state => state.IsAdmin)
  const arrayPrueba = [0,1,2,3,4];
  
  return (
    <>
    { Es_admin ?  (
    <div className="sidemenu-container">
    <div className="menu-container">
      {arrayPrueba.map((contenido, i) => (
       <MenuContenido key={i}/>
      ))}
    </div>
    <MenuModal/>
    </div>
    ) : (
        <div className="menu-container" style={{maxHeight: "100%"}}>
      {arrayPrueba.map((contenido, i) => (
       <MenuContenido key={i}/>
      ))}
    </div>
    )
    }
    </>
  );
};
