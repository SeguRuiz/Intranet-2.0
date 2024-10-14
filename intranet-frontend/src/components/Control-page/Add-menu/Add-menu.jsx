import Retractile_menu from "../Retractile_menu/Retractile_menu";
import "./Add-menu.css";
import Read_role from "../read-role/Read_role";
import Add_usuarios from "../Usuarios-crud/add/Add-usuarios";
import { useSelector } from "react-redux";
import Add_sedes from "../Sedes-crud/add/Add_sedes";
import Add_grupos from "../Grupos_Crud/add/Add_grupos";
const Add_menu = () => {
  const { pestaña_seleccionada } = useSelector((e) => e.ControlUsuarios);

  const Swicht_paginas = () => {
    switch (pestaña_seleccionada) {
      case "usuarios":
        return (
          <>
            <Add_usuarios />
            <Read_role />
          </>
        );
      case "sedes":
        return (
          <>
            <Add_sedes />
          </>
        );
      default:
        console.log("default");
    }
  };

  return Swicht_paginas();
};

export default Add_menu;