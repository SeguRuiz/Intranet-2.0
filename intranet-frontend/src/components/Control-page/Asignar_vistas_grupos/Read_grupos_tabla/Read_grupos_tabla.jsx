import { useSelector } from "react-redux";
import Retractile_menu from "../../Retractile_menu/Retractile_menu";
import Select_grupos_tabla from "./Select_grupos_tabla";
import Read_grupos_vacio from "./Read_grupos_vacio";

import "./Read_grupos_tabla.css";

const Read_grupos_tabla = () => {
  const { grupos, curso_seleccionado } = useSelector((e) => e.ControlUsuarios);

  return (
    <>
      {(() => {
        switch (grupos[0]) {
          case undefined:
            return <Read_grupos_vacio />;

          default:
            return (
              <>
                <Retractile_menu
                  titulo="Asignar grupos"
                  altura={curso_seleccionado != null ? 80 : 50}
                >
                  <div
                    className={
                      curso_seleccionado != null
                        ? "read-grupos-tabla-containar"
                        : "read-grupos-tabla-containar-vacio"
                    }
                  >
                    {curso_seleccionado == null ? (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="80px"
                          viewBox="0 -960 960 960"
                          width="80px"
                          fill="var(--OnsurfaceVariant)"
                        >
                          <path d="M453-280h60v-240h-60v240Zm26.98-314q14.02 0 23.52-9.2T513-626q0-14.45-9.48-24.22-9.48-9.78-23.5-9.78t-23.52 9.78Q447-640.45 447-626q0 13.6 9.48 22.8 9.48 9.2 23.5 9.2Zm.29 514q-82.74 0-155.5-31.5Q252-143 197.5-197.5t-86-127.34Q80-397.68 80-480.5t31.5-155.66Q143-709 197.5-763t127.34-85.5Q397.68-880 480.5-880t155.66 31.5Q709-817 763-763t85.5 127Q880-563 880-480.27q0 82.74-31.5 155.5Q817-252 763-197.68q-54 54.31-127 86Q563-80 480.27-80Zm.23-60Q622-140 721-239.5t99-241Q820-622 721.19-721T480-820q-141 0-240.5 98.81T140-480q0 141 99.5 240.5t241 99.5Zm-.5-340Z" />
                        </svg>
                        <p style={{ marginBottom: "50px" }}>Escoje un curso</p>
                      </>
                    ) : (
                      <>
                        {grupos.map((grupo) => (
                          <Select_grupos_tabla
                            key={grupo.id}
                            nombre_grupo={grupo.nombre_grupo}
                            id={grupo.id}
                            sede_id={grupo.sede_id}
                          />
                        ))}
                      </>
                    )}
                  </div>
                </Retractile_menu>
              </>
            );
        }
      })()}
    </>
  );
};

export default Read_grupos_tabla;
