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
import { setear_seleccion_grupos } from "../../redux/ControlUsuariosSlice";
import Read_cursos_disponibles from "../../components/Control-page/Asignar_vistas_grupos/Read_cursos/Read_cursos_disponibles";
import { set_grupos_cursos } from "../../redux/ControlUsuariosSlice";
import { setData } from "../../redux/modalSlice";
import { useEffect } from "react";
import UserInfoCard from "../../components/userInfoCard/UserInfoCard";
import { set_usuarios_en_grupos } from "../../redux/ControlUsuariosSlice";
import Read_reportes from "../../components/Control-page/Reportes/read/Read_reportes";
import {
  desactivar_seleccion_multiple,
  desactivar_seleccion_multiple_sedes,
} from "../../redux/ControlUsuariosSlice";
import { set_grupos } from "../../redux/ControlUsuariosSlice";
import Read_grupos from "../../components/Control-page/Grupos_Crud/read/Read_grupos";
import { set_fetching } from "../../redux/FetchsSlice";
import { IconButton, LinearProgress } from "@mui/material";
import Add_integrantes_grupo from "../../components/Control-page/Add-integrantes-grupo/Add_integrantes_grupo";
import { getCookie } from "../../utils/Cookies";
import Empty_page from "../../components/Control-page/Empty-case/Empty_page";

const Control_usuarios_page = () => {
  const { aside_abierto } = useSelector((state) => state.ControlUsuarios);
  const { userInSession } = useSelector((x) => x.Auth);
  const { pestaña_seleccionada } = useSelector((e) => e.ControlUsuarios);

  const { fetching_state } = useSelector((e) => e.Fetchs);
  const accion = useDispatch();
  const { fetch_the_data, fetching } = useFetch();
  const token = getCookie("token");

  useEffect(() => {
    accion(set_fetching(fetching));
    userInSession?.rol == "profesor" &&
      accion(set_pestaña_seleccionada("reportes"));
  }, [fetching]);

  useLayoutEffect(() => {
    (async () => {
      const data = await fetch_the_data(
        "http://localhost:8000/cursos/sedes",
        token,
        "GET"
      );

      accion(set_sedes(data[1]));
    })();
  }, []);

  useLayoutEffect(() => {
    (async () => {
      const data = await fetch_the_data(
        "http://localhost:8000/cursos/get_grupos_integrantes",
        token,
        "GET"
      );
      accion(set_grupos(data[1]));
    })();
  }, []);

  useLayoutEffect(() => {
    (async () => {
      const data = await fetch_the_data(
        "http://localhost:8000/cursos/grupos_cursos",
        token,
        "GET"
      );

      accion(set_grupos_cursos(data[1]));
    })();
  }, []);

  useEffect(() => {
    const data = async () => {
      const datos = await fetch_the_data(
        "http://localhost:8000/cursos/cursos",
        null,
        "GET"
      );
      accion(setData(datos[1]));
    };
    data();
  }, []);

  useLayoutEffect(() => {
    (async () => {
      const data = await fetch_the_data(
        "http://localhost:8000/cursos/integrantes_de_grupo",
        token,
        "GET"
      );
      accion(set_usuarios_en_grupos(data[1]));
    })();
  }, []);

  const aside = () => {
    switch (pestaña_seleccionada) {
      case "permisos":
        return "6.5% 35% auto";

      default:
        return aside_abierto && pestaña_seleccionada != "grupos"
          ? "6.5% 35% auto"
          : " 6.5% 0% auto";
    }
  };

  const switch_pages = () => {
    switch (pestaña_seleccionada) {
      case "usuarios":
        return <Read_usuarios />;
      case "grupos":
        return <Read_grupos />;
      case "sedes":
        return <Read_sedes />;
      case "reportes":
        return <Read_reportes />;
      case "permisos":
        return <Read_cursos_disponibles />;
      default:
        break;
    }
  };

  return (
    <div className="CUP-container">
      <nav
        className="C-U-Nav"
        style={{
          gridTemplateColumns:
            !userInSession.is_staff && userInSession.is_socioemocional
              ? "0% auto"
              : "6.5% auto",
        }}
      >
        {pestaña_seleccionada != "grupos" &&
        pestaña_seleccionada != "permisos" ? (
          <div
            className="side-menu-icon"
            onClick={() => {
              aside_abierto ? accion(cerrar_aside()) : accion(abrir_aside());
            }}
          >
            {!userInSession?.is_staff && userInSession.is_socioemocional ? (
              <></>
            ) : (
              <IconButton sx={{ padding: "10px" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="30px"
                  viewBox="0 -960 960 960"
                  width="30px"
                  fill="#3f4850"
                >
                  <path d="M120-240v-66.67h720V-240H120Zm0-206.67v-66.66h720v66.66H120Zm0-206.66V-720h720v66.67H120Z" />
                </svg>
              </IconButton>
            )}
          </div>
        ) : (
          <div className="side-menu-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="30px"
              viewBox="0 -960 960 960"
              width="30px"
              fill="#3f4850"
            >
              <path d="M480-80q-82.33 0-155.33-31.5-73-31.5-127.34-85.83Q143-251.67 111.5-324.67T80-480q0-83 31.5-156t85.83-127q54.34-54 127.34-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82.33-31.5 155.33-31.5 73-85.5 127.34Q709-143 636-111.5T480-80Zm0-66.67q139.33 0 236.33-97.33t97-236q0-139.33-97-236.33t-236.33-97q-138.67 0-236 97-97.33 97-97.33 236.33 0 138.67 97.33 236 97.33 97.33 236 97.33ZM480-480Z" />
            </svg>
          </div>
        )}
        <div
          className={
            fetching_state ? "nav_info_main-cargando" : "nav_info_main"
          }
        >
          <div className="navbar-edit-options">
            {pestaña_seleccionada != "permisos" &&
              pestaña_seleccionada != "reportes" && <Edit_crud />}
            {pestaña_seleccionada == "usuarios" && <Add_integrantes_grupo />}
            <UserInfoCard
              nombre={`${userInSession.nombre} ${userInSession.apellidos}`}
              right={16}
            />
          </div>

          <div className="linear_loading_area">
            <LinearProgress />
          </div>
        </div>
      </nav>
      <main
        style={{
          gridTemplateColumns: aside(),
        }}
      >
        <div className="side-bar-nav">
          {userInSession?.is_staff && (
            <>
              <div
                style={{
                  backgroundColor:
                    pestaña_seleccionada == "usuarios" &&
                    "var(--SurfaceDarked-color)",
                }}
                onClick={() => {
                  if (pestaña_seleccionada != "usuarios") {
                    accion(set_pestaña_seleccionada("usuarios"));
                    accion(desactivar_seleccion_multiple_sedes());
                    accion(desactivar_seleccion_multiple());
                    accion(setear_seleccion_grupos(false));
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="30px"
                  viewBox="0 -960 960 960"
                  width="30px"
                  fill="#3f4850"
                  style={{ alignSelf: "center" }}
                >
                  <path d="M480-480.67q-66 0-109.67-43.66Q326.67-568 326.67-634t43.66-109.67Q414-787.33 480-787.33t109.67 43.66Q633.33-700 633.33-634t-43.66 109.67Q546-480.67 480-480.67ZM160-160v-100q0-36.67 18.5-64.17T226.67-366q65.33-30.33 127.66-45.5 62.34-15.17 125.67-15.17t125.33 15.5q62 15.5 127.28 45.3 30.54 14.42 48.96 41.81Q800-296.67 800-260v100H160Zm66.67-66.67h506.66V-260q0-14.33-8.16-27-8.17-12.67-20.5-19-60.67-29.67-114.34-41.83Q536.67-360 480-360t-111 12.17Q314.67-335.67 254.67-306q-12.34 6.33-20.17 19-7.83 12.67-7.83 27v33.33ZM480-547.33q37 0 61.83-24.84Q566.67-597 566.67-634t-24.84-61.83Q517-720.67 480-720.67t-61.83 24.84Q393.33-671 393.33-634t24.84 61.83Q443-547.33 480-547.33Zm0-86.67Zm0 407.33Z" />
                </svg>
                <p>Usuarios</p>
              </div>
              <div
                style={{
                  backgroundColor:
                    pestaña_seleccionada == "grupos" &&
                    "var(--SurfaceDarked-color)",
                }}
                onClick={() => {
                  if (pestaña_seleccionada != "grupos") {
                    accion(set_pestaña_seleccionada("grupos"));
                    accion(desactivar_seleccion_multiple());
                    accion(desactivar_seleccion_multiple_sedes());
                    accion(setear_seleccion_grupos(false));
                    accion(cerrar_aside());
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="30px"
                  viewBox="0 -960 960 960"
                  width="30px"
                  fill="#3f4850"
                  style={{ alignSelf: "center" }}
                >
                  <path d="M38.67-160v-100q0-34.67 17.83-63.17T105.33-366q69.34-31.67 129.67-46.17 60.33-14.5 123.67-14.5 63.33 0 123.33 14.5T611.33-366q31 14.33 49.17 42.83T678.67-260v100h-640Zm706.66 0v-102.67q0-56.66-29.5-97.16t-79.16-66.84q63 7.34 118.66 22.5 55.67 15.17 94 35.5 34 19.34 53 46.17 19 26.83 19 59.83V-160h-176ZM358.67-480.67q-66 0-109.67-43.66Q205.33-568 205.33-634T249-743.67q43.67-43.66 109.67-43.66t109.66 43.66Q512-700 512-634t-43.67 109.67q-43.66 43.66-109.66 43.66ZM732-634q0 66-43.67 109.67-43.66 43.66-109.66 43.66-11 0-25.67-1.83-14.67-1.83-25.67-5.5 25-27.33 38.17-64.67Q578.67-590 578.67-634t-13.17-80q-13.17-36-38.17-66 12-3.67 25.67-5.5 13.67-1.83 25.67-1.83 66 0 109.66 43.66Q732-700 732-634ZM105.33-226.67H612V-260q0-14.33-8.17-27.33-8.16-13-20.5-18.67-66-30.33-117-42.17-51-11.83-107.66-11.83-56.67 0-108 11.83-51.34 11.84-117.34 42.17-12.33 5.67-20.16 18.67-7.84 13-7.84 27.33v33.33Zm253.34-320.66q37 0 61.83-24.84Q445.33-597 445.33-634t-24.83-61.83q-24.83-24.84-61.83-24.84t-61.84 24.84Q272-671 272-634t24.83 61.83q24.84 24.84 61.84 24.84Zm0 320.66Zm0-407.33Z" />
                </svg>
                <p>Grupos</p>
              </div>

              <div
                style={{
                  backgroundColor:
                    pestaña_seleccionada == "sedes" &&
                    "var(--SurfaceDarked-color)",
                }}
                onClick={() => {
                  if (pestaña_seleccionada != "sedes") {
                    accion(set_pestaña_seleccionada("sedes"));
                    accion(desactivar_seleccion_multiple());
                    accion(desactivar_seleccion_multiple_sedes());
                    accion(setear_seleccion_grupos(false));
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="35px"
                  viewBox="0 -960 960 960"
                  width="35px"
                  fill="#3f4850"
                  style={{ alignSelf: "center" }}
                >
                  <path d="M120-120v-556.67h163.33V-840h393.34v326.67H840V-120H528.67v-163.33h-97.34V-120H120Zm66.67-66.67h96.66v-96.66h-96.66v96.66Zm0-163.33h96.66v-96.67h-96.66V-350Zm0-163.33h96.66V-610h-96.66v96.67ZM350-350h96.67v-96.67H350V-350Zm0-163.33h96.67V-610H350v96.67Zm0-163.34h96.67v-96.66H350v96.66ZM513.33-350H610v-96.67h-96.67V-350Zm0-163.33H610V-610h-96.67v96.67Zm0-163.34H610v-96.66h-96.67v96.66Zm163.34 490h96.66v-96.66h-96.66v96.66Zm0-163.33h96.66v-96.67h-96.66V-350Z" />
                </svg>
                <p>Sedes</p>
              </div>
              <div
                style={{
                  backgroundColor:
                    pestaña_seleccionada == "permisos" &&
                    "var(--SurfaceDarked-color)",
                }}
                onClick={() => {
                  if (pestaña_seleccionada != "permisos") {
                    accion(set_pestaña_seleccionada("permisos"));
                    accion(desactivar_seleccion_multiple());
                    accion(desactivar_seleccion_multiple_sedes());
                    accion(setear_seleccion_grupos(false));
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="30px"
                  viewBox="0 -960 960 960"
                  width="30px"
                  fill="#3f4850"
                >
                  <path d="M186.67-120q-27.5 0-47.09-19.58Q120-159.17 120-186.67v-586.66q0-27.5 19.58-47.09Q159.17-840 186.67-840h586.66q27.5 0 47.09 19.58Q840-800.83 840-773.33v586.66q0 27.5-19.58 47.09Q800.83-120 773.33-120H186.67Zm0-66.67h586.66v-506.66H186.67v506.66Zm293.36-96.66q-80.7 0-144.2-43.6-63.5-43.61-92.5-113.17 29-69.57 92.48-113.07 63.47-43.5 144.16-43.5 80.7 0 144.2 43.6 63.5 43.61 92.5 113.17-29 69.57-92.48 113.07-63.47 43.5-144.16 43.5Zm-.03-53.34q56.67 0 103.97-27.38T658-440q-26.73-48.57-74.03-75.95-47.3-27.38-103.97-27.38t-103.97 27.38Q328.73-488.57 302-440q26.73 48.57 74.03 75.95 47.3 27.38 103.97 27.38ZM480-440Zm.08 53.33q22.25 0 37.75-15.58 15.5-15.57 15.5-37.83 0-22.25-15.58-37.75-15.57-15.5-37.83-15.5-22.25 0-37.75 15.58-15.5 15.57-15.5 37.83 0 22.25 15.58 37.75 15.57 15.5 37.83 15.5Z" />
                </svg>
                <p>Permisos</p>
              </div>
            </>
          )}
          <div
            style={{
              backgroundColor:
                pestaña_seleccionada == "reportes" &&
                "var(--SurfaceDarked-color)",
            }}
            onClick={() => {
              if (pestaña_seleccionada != "reportes") {
                accion(set_pestaña_seleccionada("reportes"));
                accion(desactivar_seleccion_multiple());
                accion(desactivar_seleccion_multiple_sedes());
                accion(setear_seleccion_grupos(false));
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="30px"
              viewBox="0 -960 960 960"
              width="30px"
              fill="#3f4850"
            >
              <path d="M799.82-530q-12.82 0-21.32-8.68-8.5-8.67-8.5-21.5 0-12.82 8.68-21.32 8.67-8.5 21.5-8.5 12.82 0 21.32 8.68 8.5 8.67 8.5 21.5 0 12.82-8.68 21.32-8.67 8.5-21.5 8.5ZM770-650v-180h60v180h-60ZM360-481q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42ZM40-160v-94q0-35 17.5-63.5T108-360q75-33 133.34-46.5t118.5-13.5Q420-420 478-406.5T611-360q33 15 51 43t18 63v94H40Z" />
            </svg>
            <p>Reportes</p>
          </div>
        </div>
        <aside className="aside-nav">
          <Add_menu />
        </aside>
        <Empty_page
          className={
            aside_abierto || pestaña_seleccionada == "permisos"
              ? "CUP-Iteradores-2"
              : "CUP-Iteradores"
          }
        >
          {switch_pages()}
        </Empty_page>
      </main>
    </div>
  );
};

export default Control_usuarios_page;
