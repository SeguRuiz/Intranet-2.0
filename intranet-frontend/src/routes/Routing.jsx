import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Loginpage } from "../pages/Loginpage";

import Info_cursos from "../pages/info_cursos/Info_cursos";
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
import Curso from "../pages/dentro_curso_page.jsx";

export const Routing = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Loginpage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/social" element={<Social />} />
          <Route path="/anuncios" element={<Anuncios />} />
          <Route path="/demolab" element={<Demolab />} />
          <Route path="/ingles" element={<Ingles />} />
          <Route path="/cursos" element={<Cursos />} />
          <Route path="/cursos/curso" element={<Curso />} />
          <Route path="/cursos/curso/grupos" element={<Grupo />} />
          <Route path="/cursos/curso/info_curso" element={<Info_cursos />} />
          <Route path="/cursos/curso/tareas" element={<Tarea />} />
          <Route
            path="/cursos/curso/comunicaciones"
            element={<Comunicaciones />}
          />
          <Route path="/cursos/curso/cronograma" element={<Cronograma />} />
        </Routes>
      </Router>
    </div>
  );
};
