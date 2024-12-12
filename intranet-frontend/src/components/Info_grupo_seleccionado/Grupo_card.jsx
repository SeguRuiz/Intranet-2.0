import "./Grupo_card.css";
import { useSelector } from "react-redux";

import { useState } from "react";

import { useLayoutEffect } from "react";

const Grupo_card = () => {
  const { grupo_mostrandose } = useSelector((x) => x.CursosContenidos);
  const { Es_admin } = useSelector((x) => x.IsAdmin);
  const { grupos } = useSelector((x) => x.ControlUsuarios);
  const [nombreGrupo, setNombreGrupo] = useState("");

  useLayoutEffect(() => {
    (async () => {
      if (grupo_mostrandose != null) {
        const grupo_nombre = grupos.find(
          (x) => x.id == grupo_mostrandose
        )?.nombre_grupo;
        setNombreGrupo(grupo_nombre);
      } else {
        setNombreGrupo("Selecciona un grupo");
      }
    })();
  }, [grupo_mostrandose]);

  return (
    <>
      {Es_admin && (
        <div className="grupo-mostrandose-card">
          {grupo_mostrandose != null && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="30px"
              viewBox="0 -960 960 960"
              width="30px"
              fill="var(--PrymaryContainer-color)"
            >
              <path d="M0-240v-53q0-38.57 41.5-62.78Q83-380 150.38-380q12.16 0 23.39.5t22.23 2.15q-8 17.35-12 35.17-4 17.81-4 37.18v65H0Zm240 0v-65q0-32 17.5-58.5T307-410q32-20 76.5-30t96.5-10q53 0 97.5 10t76.5 30q32 20 49 46.5t17 58.5v65H240Zm540 0v-65q0-19.86-3.5-37.43T765-377.27q11-1.73 22.17-2.23 11.17-.5 22.83-.5 67.5 0 108.75 23.77T960-293v53H780ZM149.57-410q-28.57 0-49.07-20.56Q80-451.13 80-480q0-29 20.56-49.5Q121.13-550 150-550q29 0 49.5 20.5t20.5 49.93q0 28.57-20.5 49.07T149.57-410Zm660 0q-28.57 0-49.07-20.56Q740-451.13 740-480q0-29 20.56-49.5Q781.13-550 810-550q29 0 49.5 20.5t20.5 49.93q0 28.57-20.5 49.07T809.57-410ZM480-480q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T600-600q0 50-34.5 85T480-480Z" />
            </svg>
          )}
          <strong>{nombreGrupo}</strong>
        </div>
      )}
    </>
  );
};

export default Grupo_card;