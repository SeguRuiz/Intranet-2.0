import "./Info_cursos.css";
import { Sidemenu } from "../../components/SideMenu/Sidemenu";
import { estado_admin, estado_no_admin } from "../../redux/IsAdminSlice";
import { useDispatch } from "react-redux";
import { useFetch } from "../../services/llamados";
const Info_cursos = () => {
const accion = useDispatch()
const {define_fetch, fetch_the_data_without_token} = useFetch()

   const see_data = async () => {
    define_fetch('http://localhost:8000/cursos_contenidos/get_contenidos_and_subcontenidos', "", "GET")
    const data = await fetch_the_data_without_token()
    console.log(JSON.parse(data[1]));
    
   }

  return (
    <>
      <div className="Info-page">
        <div className="Info-nav-container">
          <div className="Info-nav">
          <button onClick={()=>{accion(estado_admin())}}>Admin</button>
          <button onClick={()=>{accion(estado_no_admin())}}>NoAdmin</button>
          <button onClick={see_data}>dataJson</button>
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
