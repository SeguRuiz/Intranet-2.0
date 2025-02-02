import Header from "../../components/Home/header/Header_student";
import Navbar from "../../components/Home/navbar/NavBar";
import { useParams } from "react-router-dom";
import "./Comunicaciones.css";
import Read_Comu from "../../components/Comunicaciones_pagination/read/Read_Comu";
import Admin_actions_cursos from "../../components/admin_actions_cursos/Admin_actions_cursos";
import Go_to_admin from "../../components/admin_actions_cursos/go_to_admin";
import Open_add_com from "../../components/admin_actions_cursos/Open_add_com";
import Read_grupos_del_curso from "../../components/Seleccionar_grupos_del_curso/Read_grupos_del_curso";
import { useFetch } from "../../services/llamados";
import { getCookie } from "../../utils/Cookies";
import { set_avisos } from "../../redux/ComunicacionesSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { set_grupos } from "../../redux/ControlUsuariosSlice";
import Grupo_card from "../../components/Info_grupo_seleccionado/Grupo_card";

const Comunicaciones_page = () => {
  const { id_curso } = useParams();
  const token = getCookie("token");
  const accion = useDispatch();
  const { fetch_the_data } = useFetch();

  const cursosLinks = [
    { href: `/cursos/${id_curso}/contenidos`, label: "Contenidos" },
    { href: `/cursos/${id_curso}/grupos`, label: "Grupos" },
    { href: `/cursos/${id_curso}/tareas`, label: "Tareas" },
    { href: `/cursos/${id_curso}/comunicaciones`, label: "Comunicaciones" },
   
  ];
  useEffect(() => {
    (async () => {
      const data = await fetch_the_data(
        "http://localhost:8000/cursos/get_grupos_integrantes",
        token,
        "GET"
      );

      accion(set_grupos(data[1]));
    })();
  }, []);
  useEffect(() => {
    (async () => {
      const data = await fetch_the_data(
        "http://localhost:8000/cursos_contenidos/comunicados_date",
        token,
        "GET"
      );
      console.log(data);

      accion(set_avisos(data[1].reverse()));
    })();
  }, []);

  return (
    <div className="comunicaciones-page-container">
      <div>
        <Header />
        <Navbar links={cursosLinks} />
      </div>
      <div className="comunicaciones-content">
        <Read_Comu />
        <Admin_actions_cursos>
          <Go_to_admin />
          <Open_add_com />
          <Read_grupos_del_curso />
        </Admin_actions_cursos>
      </div>
      <Grupo_card/>
    </div>
  );
};

export default Comunicaciones_page;
