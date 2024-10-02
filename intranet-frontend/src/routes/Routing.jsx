import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Loginpage } from "../pages/Loginpage";
import Home from "../pages/home";
import Info_cursos from "../pages/info_cursos/Info_cursos";
import Cursos from "../pages/Cursos_page";
import Home from "../pages/Home_page";
import Social from "../pages/Social_page";
import Anuncios from "../pages/Anuncios_page";
import Demolab from "../pages/Demolab_page";
import Ingles from "../pages/Ingles_page";
import Grupo from "../pages/Grupo_page.jsx";

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
          <Route path="/cursos/grupos" element={<Grupo />} />
          <Route path="/cursos/info_curso" element={<Info_cursos />} />
        </Routes>
      </Router>
    </div>
  );
};
