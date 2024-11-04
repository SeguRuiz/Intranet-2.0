import { useEffect } from "react";
import { useSelector } from "react-redux";
import { set_grupo_mostrandose } from "../../redux/CursosContenidosSlice";
import { useDispatch } from "react-redux";
const Select_grupos_del_curso = ({ grupo_id, curso_id }) => {
  const { grupos } = useSelector((x) => x.ControlUsuarios);
  const accion = useDispatch();
  const { grupo_mostrandose } = useSelector((x) => x.CursosContenidos);

  useEffect(() => {}, [grupo_mostrandose]);

  const nombre_grupo = grupos.find((x) => x.id == grupo_id)?.nombre_grupo;
  return (
    <div
      className={
        grupo_mostrandose == grupo_id
          ? "grupos-a-seleccionar-selected"
          : "grupos-a-seleccionar"
      }
      onClick={() => {
        grupo_mostrandose === grupo_id
          ? accion(set_grupo_mostrandose(null))
          : accion(set_grupo_mostrandose(grupo_id));
      }}
    >
      <div className="grupo-a-seleccionar-nombre">
        <p>{nombre_grupo}</p>
      </div>
      <div className="grupo-a-seleccionar-check">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="35px"
          viewBox="0 -960 960 960"
          width="35px"
          fill="#3f4850"
        >
          <path d="M378-246 154-470l43-43 181 181 384-384 43 43-427 427Z" />
        </svg>
      </div>
    </div>
  );
};

export default Select_grupos_del_curso;
