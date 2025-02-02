import "./Add-menu.css";
import Add_usuarios from "../Usuarios-crud/add/Add-usuarios";
import { useSelector } from "react-redux";
import Add_sedes from "../Sedes-crud/add/Add_sedes";
import Add_Reportes from "../Reportes/add/Add_Reportes";
import Read_grupos_tabla from "../Asignar_vistas_grupos/Read_grupos_tabla/Read_grupos_tabla";
const Add_menu = () => {
  const { pestaña_seleccionada } = useSelector((e) => e.ControlUsuarios);

  const Swicht_paginas = () => {
    switch (pestaña_seleccionada) {
      case "usuarios":
        return (
          <>
            <Add_usuarios />
            
          </>
        );
      case "sedes":
        return (
          <>
            <Add_sedes />
          </>
        );
      case "permisos":
        return (
          <>
            <Read_grupos_tabla />
          </>
        );
      case "reportes":
        return (
          <>
            <Add_Reportes />
          </>
        );
      default:
        console.log("default");
    }
  };

  return Swicht_paginas();
};

export default Add_menu;
