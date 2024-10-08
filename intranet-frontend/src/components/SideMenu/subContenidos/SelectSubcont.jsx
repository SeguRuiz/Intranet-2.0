import { useDispatch } from "react-redux";
import "./SubCont.css";
import { set_archivo_mostrandose } from "../../../redux/CursosContenidosSlice";
const SelectSubcont = ({ id, nombre, archivo, contenido_id }) => {
  const accion = useDispatch();
  return (
    <>
      <div
        key={id}
        className="subContenido"
        onClick={() => {
          accion(
            set_archivo_mostrandose({
              archivo: archivo,
              subcontenido: id,
              contenido: contenido_id,
            })
          );
        }}
      >
        <p style={{ marginLeft: "10px" }}>{nombre}</p>
      </div>
    </>
  );
};

export default SelectSubcont;
