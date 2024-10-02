import "./Info_cursos.css";
import { Sidemenu } from "../../components/SideMenu/Sidemenu";
import { estado_admin, estado_no_admin } from "../../redux/IsAdminSlice";
import { useDispatch } from "react-redux";
const Info_cursos = () => {
const accion = useDispatch()

  return (
    <>
      <div className="Info-page">
        <div className="Info-nav-container">
          <div className="Info-nav">
          <button onClick={()=>{accion(estado_admin())}}>Admin</button>
          <button onClick={()=>{accion(estado_no_admin())}}>NoAdmin</button>
          </div>
          <div className="Info-subnav"></div>
        </div>
        <div className="Info-page-main">
          <Sidemenu />
          <div className="Info-page-file"></div>
        </div>
      </div>
    </>
  );
};

export default Info_cursos;
