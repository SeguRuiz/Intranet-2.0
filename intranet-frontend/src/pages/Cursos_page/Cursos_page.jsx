import React from "react";
import Header from "../../components/Home/header/Header_student";
import NavBar from "../../components/Home/navbar/NavBar";
import Content from "../../components/Home/cursos/main_content/content";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { set_grupos_cursos } from "../../redux/ControlUsuariosSlice";
import { useFetch } from "../../services/llamados";
import { set_grupos } from "../../redux/ControlUsuariosSlice";
import "./Cursos_page.css";
import { getCookie } from "../../utils/Cookies";
import { useSelector } from "react-redux";
import Admin_actions_cursos from "../../components/admin_actions_cursos/Admin_actions_cursos";
import Go_to_admin from "../../components/admin_actions_cursos/go_to_admin";
import AddCurso from "../../components/Home/cursos/main_content/add/AddCurso";

const Cursos_page = () => {
  const { userInSession } = useSelector((x) => x.Auth);
 

  return (
    <div className="cursos-page-container">
      <div className="cursos-page-navbar-area">
        <Header />
      </div>
      <div className="cursos-page-content-area">
        <Content />
        {userInSession?.is_staff | userInSession?.is_socioemocional ? (
          <Admin_actions_cursos>
            <Go_to_admin />
            <AddCurso/>
          </Admin_actions_cursos>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Cursos_page;
