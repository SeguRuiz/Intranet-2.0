import "./Read_grupos_disponibles.css";
import { useDispatch } from "react-redux";
import { set_grupo_seleccionado } from "../../../redux/ControlUsuariosSlice";
import { useSelector } from "react-redux";
const Select_grupos_disponibles = ({ nombre, id }) => {
  const { grupo_seleccionado } = useSelector((e) => e.ControlUsuarios);
  const accion = useDispatch();

  const set_class = () => {
    switch (grupo_seleccionado) {
      case id:
        return "grupo-disponible-container-selected";

      default:
        return "grupo-disponible-container";
    }
  };

  return (
    <div
      className={set_class()}
      onClick={() => {
        accion(set_grupo_seleccionado(id));
      }}
    >
      {nombre}
    </div>
  );
};

export default Select_grupos_disponibles;
