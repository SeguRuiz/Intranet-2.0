import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Loginpage } from "../pages/Loginpage";
import Home_student_page from "../pages/cursos";
import Admin from "../pages/Admin";
import Home from "../pages/home";
import Info_cursos from "../pages/info_cursos/Info_cursos";

export const Routing = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Loginpage/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/cursos" element={<Home_student_page />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/cursos/info_curso" element={<Info_cursos/>} />
        </Routes>
      </Router>
    </div>
  );
};
