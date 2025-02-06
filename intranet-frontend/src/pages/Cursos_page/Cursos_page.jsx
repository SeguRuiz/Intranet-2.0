import Header from "../../components/Home/header/Header_student";

import Content from "../../components/Home/cursos/main_content/content";

import "./Cursos_page.css";

import { useSelector } from "react-redux";
import Admin_actions_cursos from "../../components/admin_actions_cursos/Admin_actions_cursos";
import Go_to_admin from "../../components/admin_actions_cursos/go_to_admin";
import AddCurso from "../../components/Home/cursos/main_content/add/AddCurso";
import Ir_a_tomarAsistencias from "../../components/admin_actions_cursos/Ir_a_tomarAsistencias";
import Navbarv2 from "../../components/Home/Navbarv2/Navbar";

const Cursos_page = () => {
  const { userInSession } = useSelector((x) => x.Auth);

  return (
    <div className="cursos-page-container">
      <div className="cursos-page-navbar-area">
        <Navbarv2 />
      </div>
      <div className="cursos-page-content-area">
        <Content />
        {userInSession?.is_staff |
        userInSession?.is_socioemocional |
        (userInSession?.rol == "profesor") ? (
          <Admin_actions_cursos>
            <Go_to_admin />
            <Ir_a_tomarAsistencias />
            <AddCurso />
          </Admin_actions_cursos>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Cursos_page;
