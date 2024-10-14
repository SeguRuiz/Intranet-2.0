import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Loginpage } from "../pages/Loginpage";

import Contenido from "../pages/info_cursos/Info_cursos";
import Cursos from "../pages/Cursos_page/Cursos_page.jsx";
import Home from "../pages/Home_page";
import Social from "../pages/Social_page";
import Anuncios from "../pages/Anuncios_page";
import Demolab from "../pages/Demolab_page";
import Ingles from "../pages/Ingles_page";
import Grupo from "../pages/grupos_page/Grupo_page.jsx";
import Tarea from "../pages/tarea_page/Tarea_page.jsx";
import Comunicaciones from "../pages/comunicaciones_page.jsx";
import Cronograma from "../pages/Cronograma_page.jsx";
import Register from "../pages/Register_page.jsx";
import Control_usuarios_page from "../pages/Control_usuarios/Control_usuarios.jsx";
import { useFetch } from "../services/llamados.js";
import { useEffect, useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserSession } from "../redux/AuthSlice.js";
import { setUserNull } from "../redux/AuthSlice.js";
import { setTokenUser } from "../redux/AuthSlice.js";
import { useSelector } from "react-redux";
import { setAutorized } from "../redux/AuthSlice.js";

export const Routing = () => {
  const { define_fetch, fetch_the_data_without_token } = useFetch();
  const { authorized} = useSelector((e) => e.Auth);
  const token = sessionStorage.getItem("token") || null;
  const accion = useDispatch();

  useLayoutEffect(() => {
    (async () => {
      if (token != null) {
        define_fetch("http://localhost:8000/api/verificar_token", "", "POST", {
          token: token,
        });
        const data = await fetch_the_data_without_token();
        console.log(data);

        if (data[1]?.validez) {
          accion(setUserSession({ email: data[1].email, id: data[1].id }));
          accion(setTokenUser(token));
          accion(setAutorized(true));
        } else {
          accion(setUserNull());
          accion(setAutorized(true));
          sessionStorage.removeItem("token");
        }
      } else {
        accion(setAutorized(false));
      }
    })();
  }, []);
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Loginpage />} />
          <Route path="/*" element={"Not found"} />
          {authorized && (
            <>
              <Route path="/registro" element={<Register />} />
              <Route path="/home" element={<Home />} />
              <Route path="/social" element={<Social />} />
              <Route path="/anuncios" element={<Anuncios />} />
              <Route path="/demolab" element={<Demolab />} />
              <Route path="/ingles" element={<Ingles />} />
              <Route path="/cursos" element={<Cursos />} />

              <Route path="/cursos/:id_curso/tareas" element={<Tarea />} />
              <Route
                path="/cursos/:id_curso/comunicaciones"
                element={<Comunicaciones />}
              />
              <Route
                path="/cursos/:id_curso/cronograma"
                element={<Cronograma />}
              />
              <Route
                path={`/cursos/:id_curso/contenidos`}
                element={<Contenido />}
              />

              <Route path={`/cursos/:id_curso/grupos`} element={<Grupo />} />
              <Route
                path="/admin/control_usuarios"
                element={<Control_usuarios_page />}
              />
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
};
