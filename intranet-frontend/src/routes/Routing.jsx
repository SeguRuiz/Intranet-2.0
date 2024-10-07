import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Loginpage } from "../pages/Loginpage";

import Contenido from "../pages/info_cursos/Info_cursos";
import Cursos from "../pages/Cursos_page";
import Home from "../pages/Home_page";
import Social from "../pages/Social_page";
import Anuncios from "../pages/Anuncios_page";
import Demolab from "../pages/Demolab_page";
import Ingles from "../pages/Ingles_page";
import Grupo from "../pages/Grupo_page.jsx";
import Tarea from "../pages/Tarea_page.jsx";
import Comunicaciones from "../pages/comunicaciones_page.jsx";
import Cronograma from "../pages/Cronograma_page.jsx";
import Register from "../pages/Register_page.jsx";

export const Routing = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Loginpage />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/social" element={<Social />} />
          <Route path="/anuncios" element={<Anuncios />} />
          <Route path="/demolab" element={<Demolab />} />
          <Route path="/ingles" element={<Ingles />} />
          <Route path="/cursos" element={<Cursos />} />

          <Route path="/cursos/grupos" element={<Grupo />} />
          <Route path="/cursos/:id_curso/tareas" element={<Tarea />} />
          <Route
            path="/cursos/:id_curso/comunicaciones"
            element={<Comunicaciones />}
          />
          <Route path="/cursos/:id_curso/cronograma" element={<Cronograma />} />
          <Route
            path={`/cursos/:id_curso/contenidos`}
            element={<Contenido />}
          />
          <Route path={`/cursos/:id_curso/grupos`} element={<Grupo />} />
        </Routes>
      </Router>
    </div>
  );
};
