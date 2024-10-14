import { useSelector } from "react-redux";
import Add_menu from "../../components/Control-page/Add-menu/Add-menu";
import { useDispatch } from "react-redux";
import { abrir_aside } from "../../redux/ControlUsuariosSlice";
import "./Control_usuarios.css";
import { useFetch } from "../../services/llamados";
import { cerrar_aside } from "../../redux/ControlUsuariosSlice";
import { useLayoutEffect } from "react";
import Read_usuarios from "../../components/Control-page/Usuarios-crud/read/Read_usuarios";
import { set_usuarios } from "../../redux/ControlUsuariosSlice";
import { set_pestaña_seleccionada } from "../../redux/ControlUsuariosSlice";
import { set_sedes } from "../../redux/ControlUsuariosSlice";
import Read_sedes from "../../components/Control-page/Sedes-crud/read/Read_sedes";
import Edit_crud from "../../components/Control-page/edit-option/Edit_crud";
import { desactivar_seleccion_multiple, desactivar_seleccion_multiple_sedes } from "../../redux/ControlUsuariosSlice";
import { set_grupos } from "../../redux/ControlUsuariosSlice";
import Read_grupos from "../../components/Control-page/Grupos_Crud/read/Read_grupos";
import Add_grupos from "../../components/Control-page/Grupos_Crud/add/Add_grupos";
import Add_integrantes_grupo from "../../components/Control-page/Add-integrantes-grupo/Add_integrantes_grupo";

const Control_usuarios_page = () => {
  const { aside_abierto } = useSelector((state) => state.ControlUsuarios);
  const { pestaña_seleccionada } = useSelector((e) => e.ControlUsuarios);
  const token = sessionStorage.getItem("token");
  const accion = useDispatch();
  const { define_fetch, fetch_the_data } = useFetch();

  useLayoutEffect(() => {
    (async () => {
      define_fetch("http://localhost:8000/api/register", "", "GET");
      const data = await fetch_the_data(token);

      accion(set_usuarios(data[1]?.usuarios));
    })();
  }, []);

  useLayoutEffect(() => {
    (async () => {
      define_fetch("http://localhost:8000/cursos/sedes", "", "GET");
      const data = await fetch_the_data(token);

      accion(set_sedes(data[1]));
    })();
  }, []);

  useLayoutEffect(() => {
    (async () => {
      define_fetch("http://localhost:8000/cursos/grupos", "", "GET");
      const data = await fetch_the_data(token);
      console.log(data);
      
      accion(set_grupos(data[1]));
    })()
  }, []);
  
   
  

  return (
    <div className="CUP-container">
      <nav>
       <div
          className="side-menu-icon"
          onClick={() => {
            aside_abierto ? accion(cerrar_aside()) : accion(abrir_aside());
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="40px"
            viewBox="0 -960 960 960"
            width="45px"
            fill="#9AA0A6"
          >
            <path d="M120-240v-66.67h720V-240H120Zm0-206.67v-66.66h720v66.66H120Zm0-206.66V-720h720v66.67H120Z" />
          </svg>
        </div> 
        <div className="navbar-edit-options">
          <Edit_crud />
          <Add_integrantes_grupo/>
        </div>
      </nav>
      <main
        style={{
          gridTemplateColumns: aside_abierto ? "7% 35% auto" : " 7% 0% auto",
        }}
      >
        <div className="side-bar-nav">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="40px"
            viewBox="0 -960 960 960"
            width="40px"
            fill="#9AA0A6"
            style={{ alignSelf: "center" }}
            onClick={() => {
              if (pestaña_seleccionada != "usuarios") {
                accion(set_pestaña_seleccionada("usuarios"));
                accion(desactivar_seleccion_multiple_sedes())
                accion(desactivar_seleccion_multiple());
              }
            }}
          >
            <path d="M480-480.67q-66 0-109.67-43.66Q326.67-568 326.67-634t43.66-109.67Q414-787.33 480-787.33t109.67 43.66Q633.33-700 633.33-634t-43.66 109.67Q546-480.67 480-480.67ZM160-160v-100q0-36.67 18.5-64.17T226.67-366q65.33-30.33 127.66-45.5 62.34-15.17 125.67-15.17t125.33 15.5q62 15.5 127.28 45.3 30.54 14.42 48.96 41.81Q800-296.67 800-260v100H160Zm66.67-66.67h506.66V-260q0-14.33-8.16-27-8.17-12.67-20.5-19-60.67-29.67-114.34-41.83Q536.67-360 480-360t-111 12.17Q314.67-335.67 254.67-306q-12.34 6.33-20.17 19-7.83 12.67-7.83 27v33.33ZM480-547.33q37 0 61.83-24.84Q566.67-597 566.67-634t-24.84-61.83Q517-720.67 480-720.67t-61.83 24.84Q393.33-671 393.33-634t24.84 61.83Q443-547.33 480-547.33Zm0-86.67Zm0 407.33Z" />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="40px"
            viewBox="0 -960 960 960"
            width="40px"
            fill="#9AA0A6"
            style={{ alignSelf: "center" }}
            onClick={() => {
              if (pestaña_seleccionada != "grupos") {
                accion(set_pestaña_seleccionada("grupos"));
                accion(desactivar_seleccion_multiple());
                accion(desactivar_seleccion_multiple_sedes())
              }
            }}
          >
            <path d="M38.67-160v-100q0-34.67 17.83-63.17T105.33-366q69.34-31.67 129.67-46.17 60.33-14.5 123.67-14.5 63.33 0 123.33 14.5T611.33-366q31 14.33 49.17 42.83T678.67-260v100h-640Zm706.66 0v-102.67q0-56.66-29.5-97.16t-79.16-66.84q63 7.34 118.66 22.5 55.67 15.17 94 35.5 34 19.34 53 46.17 19 26.83 19 59.83V-160h-176ZM358.67-480.67q-66 0-109.67-43.66Q205.33-568 205.33-634T249-743.67q43.67-43.66 109.67-43.66t109.66 43.66Q512-700 512-634t-43.67 109.67q-43.66 43.66-109.66 43.66ZM732-634q0 66-43.67 109.67-43.66 43.66-109.66 43.66-11 0-25.67-1.83-14.67-1.83-25.67-5.5 25-27.33 38.17-64.67Q578.67-590 578.67-634t-13.17-80q-13.17-36-38.17-66 12-3.67 25.67-5.5 13.67-1.83 25.67-1.83 66 0 109.66 43.66Q732-700 732-634ZM105.33-226.67H612V-260q0-14.33-8.17-27.33-8.16-13-20.5-18.67-66-30.33-117-42.17-51-11.83-107.66-11.83-56.67 0-108 11.83-51.34 11.84-117.34 42.17-12.33 5.67-20.16 18.67-7.84 13-7.84 27.33v33.33Zm253.34-320.66q37 0 61.83-24.84Q445.33-597 445.33-634t-24.83-61.83q-24.83-24.84-61.83-24.84t-61.84 24.84Q272-671 272-634t24.83 61.83q24.84 24.84 61.84 24.84Zm0 320.66Zm0-407.33Z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="40px"
            viewBox="0 -960 960 960"
            width="40px"
            fill="#9AA0A6"
            style={{ alignSelf: "center" }}
            onClick={() => {
              if (pestaña_seleccionada != "sedes") {
                accion(set_pestaña_seleccionada("sedes"));
                accion(desactivar_seleccion_multiple());
                accion(desactivar_seleccion_multiple_sedes())
              }
            }}
          >
            <path d="M120-120v-556.67h163.33V-840h393.34v326.67H840V-120H528.67v-163.33h-97.34V-120H120Zm66.67-66.67h96.66v-96.66h-96.66v96.66Zm0-163.33h96.66v-96.67h-96.66V-350Zm0-163.33h96.66V-610h-96.66v96.67ZM350-350h96.67v-96.67H350V-350Zm0-163.33h96.67V-610H350v96.67Zm0-163.34h96.67v-96.66H350v96.66ZM513.33-350H610v-96.67h-96.67V-350Zm0-163.33H610V-610h-96.67v96.67Zm0-163.34H610v-96.66h-96.67v96.66Zm163.34 490h96.66v-96.66h-96.66v96.66Zm0-163.33h96.66v-96.67h-96.66V-350Z" />
          </svg>
        </div>
        <aside
          style={{
            border: aside_abierto ? "1.5px solid rgba(0, 0, 0, 0.2)" : "",
          }}
        >
          <Add_menu />
        </aside>
        <div className={aside_abierto ? "CUP-Iteradores-2" : "CUP-Iteradores"}>
          {pestaña_seleccionada == "usuarios" && <Read_usuarios />}
          {pestaña_seleccionada == "sedes" && <Read_sedes />}
          {pestaña_seleccionada == 'grupos' && <Read_grupos/>}
        </div>
      </main>
    </div>
  );
};

export default Control_usuarios_page;
