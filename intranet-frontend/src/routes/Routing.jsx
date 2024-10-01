import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Loginpage } from "../pages/Loginpage";
import Home_student_page from "../pages/cursos";
import Admin from "../pages/Admin";
import Home from "../pages/home";

export const Routing = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Loginpage/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/cursos" element={<Home_student_page />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </div>
  );
};
