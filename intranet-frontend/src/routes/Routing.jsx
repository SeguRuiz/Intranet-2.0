import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Loginpage } from "../pages/Loginpage";
import Home_student_page from "../pages/Home_student_page";
import Admin from "../pages/Admin";

export const Routing = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Loginpage />} />
          <Route path="/home" element={<Home_student_page />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </div>
  );
};
