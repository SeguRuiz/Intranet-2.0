import { useParams } from "react-router-dom";
import "./Usuario_info_page.css";
import Navbarv2 from "../../components/Home/Navbarv2/Navbar";
import UserInfoSideBar from "../../components/User_info_Side_Bar/UserInfoSideBar";
import Page_info from "./Page_info/Page_info";
import pages from "../../components/User_info_Side_Bar/UserInfoSidePages";
import Informacion_personal_page from "./Informacion_personal/Informacion_personal_page";
import { useEffect, useState } from "react";

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
    title: "Hisrorial de reportes",
    subheader: "Una recopilacion de los reportes que as tenido",
  },
  historial_de_asistencias: {
    title: "Hisrorial de asistencias",
    subheader: "Una recopilacion de tus asistencias en el programa",
  },
};

const Usuario_info_page = () => {
  const { page } = useParams();
  const [main, setMain] = useState(page);

  useEffect(() => {
    setMain(page);
  }, [page]);
  
  return (
    <div className="UserInfoPage">
      <div className="UserInfoNav">
        <Navbarv2 volver={-1} />
      </div>
      <div className="UserInfoMain">
        <UserInfoSideBar />
        <div className="UserInfoCenter">
          <Page_info pages={pagesInfo} current_page={page} />
          {(() => {
            switch (page) {
              case "informacion_personal":
                return <Informacion_personal_page />;

              default:
                return null;
            }
          })()}
        </div>
      </div>
    </div>
  );
};

export default Usuario_info_page;
