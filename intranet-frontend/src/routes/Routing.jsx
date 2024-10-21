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
import Cronograma from "../pages/Cronograma_page/Cronograma_page.jsx";
import Register from "../pages/Register_page.jsx";
import Control_usuarios_page from "../pages/Control_usuarios/Control_usuarios.jsx";
import { useFetch } from "../services/llamados.js";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUserSession } from "../redux/AuthSlice.js";
import { setUserNull } from "../redux/AuthSlice.js";
import { setTokenUser } from "../redux/AuthSlice.js";
import { useSelector } from "react-redux";
import { setAutorized } from "../redux/AuthSlice.js";
import { ToastContainer } from "react-toastify";
import { getCookie } from "../utils/Cookies.js";
import { jwtDecode } from "jwt-decode";
import { set_roles } from "../redux/ControlUsuariosSlice.js";
import { estado_admin, estado_no_admin } from "../redux/IsAdminSlice.js";
import Contenido_tarea from "../pages/tarea_page/Contenido_tarea_page.jsx";

export const Routing = () => {
  const { fetch_the_data } = useFetch();
  const { Es_admin } = useSelector((e) => e.IsAdmin);
  const [timeOut, setTime] = useState(false);
  const { authorized, retraer } = useSelector((e) => e.Auth);
 

  const token = getCookie("token");

  const accion = useDispatch();

  useEffect(() => {
    (async () => {
      const data = await fetch_the_data(
        "http://localhost:8000/api/roles",
        token,
        "GET"
      );

      accion(set_roles(data[1]));
    })();
  }, [retraer]);

  useEffect(() => {
    (async () => {
      if (token) {
        setTime(true);
        const id = jwtDecode(token)?.user_id;
        const data = await fetch_the_data(
          "http://localhost:8000/api/get_user_info",
          token,
          "GET",
          null,
          id
        );

        if (data[0] == 200) {
          accion(setUserSession(data[1]));
          data[1].rol == "admin"
            ? accion(estado_admin())
            : accion(estado_no_admin());

          accion(setTokenUser(token));
          accion(setAutorized(true));
        } else {
          accion(setUserNull());
          accion(setAutorized(false));
        }
      } else {
        accion(setAutorized(false));
      }
      setTimeout(() => {
        setTime(false);
      }, 1000);
    })();
  }, [retraer]);

  return (
    <div>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Loginpage />} />

          {authorized  && (
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
                path="/cursos/:id_curso/:id_tarea/contenido_tarea"
                element={<Contenido_tarea />}
              />
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

              {Es_admin && !timeOut && (
                <Route
                  path="/admin/control_usuarios"
                  element={<Control_usuarios_page />}
                />
              )}
            </>
          )}
          {!timeOut && <Route path="/*" element={"Not found"} />}
        </Routes>
      </Router>
    </div>
  );
};
