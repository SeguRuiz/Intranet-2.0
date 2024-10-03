import { useEffect, useState } from "react";
import "./Sidemenu.css";
import MenuContenido from "./contenido/MenuContenido";
import { useSelector } from "react-redux";
import MenuModal from "./MenuCrud/Add/MenuModal";
import { useFetch } from "../../services/llamados";
import { useDispatch } from "react-redux";
import { setContenidos } from "../../redux/CursosContenidosSlice";
export const Sidemenu = () => {
  const { define_fetch, fetch_the_data_without_token } = useFetch();
  const accion = useDispatch();
  const { Es_admin } = useSelector((state) => state.IsAdmin);
  const { Contenidos } = useSelector((state) => state.CursosContenidos);

  useEffect(() => {
    (async () => {
      define_fetch(
        "http://localhost:8000/cursos_contenidos/get_contenidos_and_subcontenidos",
        "",
        "GET"
      );
      const data = await fetch_the_data_without_token();
      accion(setContenidos(JSON.parse(data[1])));
    })();
  }, []);

  return (
    <>
      {Es_admin ? (
        <div className="sidemenu-container">
          <div className="menu-container">
            {Contenidos.map((contenido) => (
              <MenuContenido
                key={contenido.id}
                nombre={contenido.nombre}
                subcontenidos={contenido.subcontenidos}
              />
            ))}
          </div>
          <MenuModal />
        </div>
      ) : (
        <div className="menu-container" style={{ maxHeight: "100%" }}>
          {Contenidos.map((contenido) => (
            <MenuContenido
              key={contenido.id}
              nombre={contenido.nombre}
              subcontenidos={contenido.subcontenidos}
            />
          ))}
        </div>
      )}
    </>
  );
};
