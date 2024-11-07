import "./content.css";
import { useEffect, useState } from "react";
import { useFetch } from "../../../../services/llamados";
import { set_archivo_mostrandose } from "../../../../redux/CursosContenidosSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setData } from "../../../../redux/modalSlice";
import { useNavigate } from "react-router-dom";
import { DecodeToken } from "../../../../services/llamados";
import { getCookie } from "../../../../utils/Cookies";
import Select_cursos_home from "./Read/Select_cursos_home";
import { CircularProgress } from "@mui/material";
import { promesa } from "../../../../utils/Utils";

const Content = ({ grupos = [] }) => {
  const { cursos } = useSelector((state) => state.modal);
  const { Es_admin } = useSelector((state) => state.IsAdmin);
  const { userInSession } = useSelector((state) => state.Auth);
  const [filtrando_cursos, set_filtrando_cursos] = useState(false);
  const [cursos_state, setCursos] = useState([]);

  const { grupos_cursos } = useSelector((state) => state.ControlUsuarios);

  const token = getCookie("token");

  const { fetch_the_data, fetching } = useFetch();

  const accion = useDispatch();


  useEffect(() => {
    const data = async () => {
      set_filtrando_cursos(true)

      const datos = await fetch_the_data(
        "http://localhost:8000/cursos/cursos",
        null,
        "GET"
      );

      accion(setData(datos[1]));
      accion(set_archivo_mostrandose(null));
    };
    data();
  }, []);

  const grupos_del_usuario = (grupos = []) => {
    const grupos_usuario_fun = [];
    const cursos_permitidos = [];
    const cursos_filtrados = [];
    if (grupos[0] == undefined && !Es_admin) {
      return [];
    }
    grupos.forEach((e) => {
      e?.integrantes.forEach((x) => {
        x == DecodeToken(token).user_id && grupos_usuario_fun.push(e.id);
      });
    });

    grupos_cursos.forEach((d) => {
      const grupo = grupos_usuario_fun.find((e) => e == d.grupo_id) ?? false;
      grupo != false && cursos_permitidos.push(d.curso_id);
    });

    cursos.forEach((c) => {
      const curso = cursos_permitidos.find((v) => v == c.id) ?? false;
      curso != false && cursos_filtrados.push(c);
    });

    return Es_admin ? [...cursos] : cursos_filtrados;
  };

  useEffect(() => {
    (async () => {
      set_filtrando_cursos(true);
      setCursos(grupos_del_usuario(grupos));
      set_filtrando_cursos(false);
    })();
  }, [grupos,fetching, cursos]);

  return (
    <>
      <div className="container">
        <div className={filtrando_cursos ? "cursos-home-grid-loading" : "cursos-home-grid"}>
          {filtrando_cursos ? (
            <CircularProgress />
          ) : (
            <>
              {cursos_state.map((e) => (
                <Select_cursos_home key={e?.id} nombre={e?.nombre} id={e?.id} />
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Content;
