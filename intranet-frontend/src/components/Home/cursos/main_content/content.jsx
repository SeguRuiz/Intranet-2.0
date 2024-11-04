import "./content.css";
import { useEffect, useState } from "react";
import { useFetch } from "../../../../services/llamados";
import { set_archivo_mostrandose } from "../../../../redux/CursosContenidosSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setData } from "../../../../redux/modalSlice";
import AddCurso from "./add/AddCurso";
import { useNavigate } from "react-router-dom";
import { DecodeToken } from "../../../../services/llamados";
import { getCookie } from "../../../../utils/Cookies";

const Content = ({ grupos = [] }) => {
  const { cursos } = useSelector((state) => state.modal);
  const { Es_admin } = useSelector((state) => state.IsAdmin);
  const { userInSession } = useSelector((state) => state.Auth);

  console.log(userInSession);

  const { grupos_cursos } = useSelector((state) => state.ControlUsuarios);

  const token = getCookie("token");

  const { fetch_the_data } = useFetch();

  const accion = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    const data = async () => {
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

  return (
    <>
      <div className="container">
        {Es_admin && <AddCurso />}
        <div className="diseno_content">
          {grupos_del_usuario(grupos).map((e) => (
            <div key={e.id} id={e.id} className="note-container">
              <div
                onClick={() => {
                  navigate(`/cursos/${e.id}/contenidos`);
                }}
                className="icono"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="100%"
                  viewBox="0 -960 960 960"
                  width="100%"
                  fill="#00000"
                >
                  <path d="M40-120v-80h880v80H40Zm120-120q-33 0-56.5-23.5T80-320v-440q0-33 23.5-56.5T160-840h640q33 0 56.5 23.5T880-760v440q0 33-23.5 56.5T800-240H160Zm0-80h640v-440H160v440Zm0 0v-440 440Z" />
                </svg>
              </div>
              <div className="titulo">{e.nombre}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Content;
