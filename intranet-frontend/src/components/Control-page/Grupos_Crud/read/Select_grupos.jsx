import "./Read_grupos.css";
import { useSelector } from "react-redux";
import { setear_grupo_mostrandose } from "../../../../redux/ControlUsuariosSlice";
import { useDispatch } from "react-redux";
import Read_Integrantes_modal from "./Read_integrantes/Read_Integramtes_modal";
const Select_grupos = ({ id, nombre_grupo }) => {
  const { mostrando_usuarios_grupo } = useSelector((e) => e.ControlUsuarios);
  const accion = useDispatch();
  console.log(id);

  const mostrar_usuarios = () => {
    mostrando_usuarios_grupo != id
      ? accion(setear_grupo_mostrandose(id))
      : accion(setear_grupo_mostrandose(null));
  };
   

  return (
    <div className='read-grupos-card'>
      <div className="read-grupos-title">
        <div className="read-grupos-file-style"></div>
        <div className="read-grupos-sede-info">
          <div className="main-sede-info"></div>
        </div>
      </div>
      <div className="read-grupos-info">
        <div className="main-grupos-text">
            {nombre_grupo}
        </div>
        <div className="main-grupos-options">
          <Read_Integrantes_modal/>
        </div>
      </div>
    </div>
  );
};

export default Select_grupos;
