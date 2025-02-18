import { useParams } from "react-router-dom";
import "./Usuario_info_page.css";
import Navbarv2 from "../../components/Home/Navbarv2/Navbar";
import UserInfoSideBar from "../../components/User_info_Side_Bar/UserInfoSideBar";
import Page_info from "./Page_info/Page_info";
import Informacion_personal_page from "./Informacion_personal/Informacion_personal_page";
import { createContext, useEffect, useState } from "react";
import Reportes_estudiante_page from "../../components/Reportes_estusiante_page/Reportes_estudiante_page";
import Estudiantes_page from "./Estudiantes_page/Estudiantes_page";

const pagesInfo = {
  informacion_personal: {
    title: "Informacion personal",
    subheader: "Informacion general sobre tu usuario en el sistema",
  },
  inicio: {
    title: "Inicio",
    subheader: "Encuentra informacion general",
  },
  historial_reportes: {
    title: "Historial de reportes",
    subheader: "Una recopilacion de los reportes que as tenido",
  },
  historial_de_asistencias: {
    title: "Hisrorial de asistencias",
    subheader: "Una recopilacion de tus asistencias en el programa",
  },
  estudiantes: {
    title: "Estudiantes",
    subheader: "Un vistazo a todos los estudiantes en el programa",
  },
};



const Usuario_info_page = () => {
  const { page } = useParams();
  const [currentLink, setCurrentLink] = useState(null)

  return (
   
    <div className="UserInfoPage">
      <div className="UserInfoNav">
        <Navbarv2 volver={-1} />
      </div>
      <div className="UserInfoMain">
        <UserInfoSideBar />
        <div className="UserInfoCenter">
          <Page_info pages={pagesInfo} current_page={page} currentLink={currentLink} />
          {(() => {
            switch (page) {
              case "informacion_personal":
                return <Informacion_personal_page />;

              case "historial_reportes":
                return <Reportes_estudiante_page />;
              case "estudiantes":
                return <Estudiantes_page setCurrentLink={setCurrentLink} />;
              default:
                if (page.includes("estudiantes")) {
                  return <Estudiantes_page />;
                }
            }
          })()}
        </div>
      </div>
    </div>
   
  );
};

export default Usuario_info_page;
