import "./Read_grupos_disponibles.css";
import { useDispatch } from "react-redux";
import { set_grupo_seleccionado } from "../../../redux/ControlUsuariosSlice";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ListItem } from "@mui/material";
const Select_grupos_disponibles = ({ nombre, id }) => {
  const { grupo_seleccionado } = useSelector((e) => e.ControlUsuarios);
  const [selected, setSelected] = useState(false);
  const accion = useDispatch();

  useEffect(() => {
    grupo_seleccionado == id ? setSelected(true) : setSelected(false);
  }, [grupo_seleccionado]);

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
          grupo_seleccionado == id
            ? accion(set_grupo_seleccionado(null))
            : accion(set_grupo_seleccionado(id));
        }}
        style={{cursor: 'pointer'}}
      >
        <div className="grupo-disponible-informacion">
          <p>{nombre}</p>
        </div>
        <div
          className={
            selected
              ? "grupo-disponible-checkbox-selected"
              : "grupo-disponible-checkbox"
          }
        >
          {selected && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="30px"
              viewBox="0 -960 960 960"
              width="30px"
              fill="#ffff"
            >
              <path d="M378-246 154-470l43-43 181 181 384-384 43 43-427 427Z" />
            </svg>
          )}
        </div>
      </div>
    
  );
};

export default Select_grupos_disponibles;
