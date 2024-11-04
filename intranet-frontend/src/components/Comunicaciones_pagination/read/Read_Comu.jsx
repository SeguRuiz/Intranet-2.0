import "./read-comu.css";
import { useSelector } from "react-redux";
import { Pagination } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Add_Comunicaciones from "../add/Add_Comunicaciones";
import Select_Comu from "./Select_Comu";

const Read_Comu = () => {
  const { avisos } = useSelector((e) => e.Comunicaciones); // Avisos del estado
  const { edit_com } = useSelector((x) => x.Comunicaciones); // Estado de edición
  const { grupo_mostrandose } = useSelector((x) => x.CursosContenidos); // Grupo actual
  const { userInSession } = useSelector((x) => x.Auth); // Usuario en sesión
  const [limit_value, set_limit_value] = useState(0); // Valor límite para paginación
  const container = useRef(); // Referencia al contenedor

  // Filtra los avisos según el rol del usuario
  const filter_avisos = (avisos) => {
    return userInSession?.rol === "profesor"
      ? avisos.filter((x) => x.grupo_id === userInSession?.grupos[0]?.grupo_id)
      : grupo_mostrandose != null
      ? avisos.filter((x) => x.grupo_id === grupo_mostrandose)
      : [];
  };

  useEffect(() => {
    // Calcula el límite de páginas basado en los avisos filtrados
    set_limit_value(
      filter_avisos(avisos).length % 2 === 0
        ? filter_avisos(avisos).length / 2
        : (filter_avisos(avisos).length - 1) / 2 + 1
    );
  }, [avisos]);

  const [page, setPage] = useState(1); // Estado de la página actual
  const handlePage = (event, value) => {
    setPage(value); // Cambia la página
  };

  // Función para dividir los avisos en páginas
  const turn_pages = (array, page, limit) => {
    return [...array].splice((page - 1) * limit, limit);
  };

  return (
    <div
      className={edit_com ? "avisos-mayor-container-add" : "avisos-mayor-container"}
      ref={container}
    >
      <div className="avisos-list-cont">
        <div
          className={filter_avisos(avisos)[0] == undefined ? "avisos-list-vacio" : "avisos-list"}
        >
          {!edit_com && (
            <>
              {turn_pages(filter_avisos(avisos), page, 2).map((aviso) => (
                <Select_Comu
                  key={aviso.id}
                  id={aviso.id}
                  asunto={aviso.asunto}
                  fecha_creacion={aviso.fecha_creacion}
                  descripcion={aviso.descripcion}
                  usuario_id={aviso.usuario_id}
                />
              ))}
            </>
          )}
          {filter_avisos(avisos)[0] == undefined && !edit_com && (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="250px"
                viewBox="0 -960 960 960"
                width="250px"
                fill="#3f4850"
              >
                <path d="M730-450v-60h150v60H730Zm50 290-121-90 36-48 121 90-36 48Zm-82-503-36-48 118-89 36 48-118 89ZM210-200v-160h-70q-24.75 0-42.37-17.63Q80-395.25 80-420v-120q0-24.75 17.63-42.38Q115.25-600 140-600h180l200-120v480L320-360h-50v160h-60Zm250-146v-268l-124 74H140v120h196l124 74Zm100 0v-268q27 24 43.5 58.5T620-480q0 41-16.5 75.5T560-346ZM300-480Z" />
              </svg>
              <strong style={{ marginBottom: 50 }}>
                Aquí estarán los avisos para tu grupo
              </strong>
            </>
          )}
        </div>
        <div className="pagination-area">
          <Pagination
            count={limit_value} // Número de páginas
            color="primary"
            shape="rounded"
            onChange={handlePage} // Cambia la página
            showFirstButton
            showLastButton
          />
        </div>
      </div>
      <div className="add-avisos-area">
        <Add_Comunicaciones /> {/* Componente para agregar comunicaciones */}
      </div>
    </div>
  );
};

export default Read_Comu;
