import React from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { IconButton, Tooltip } from "@mui/material";
import UserInfoCard from "../../userInfoCard/UserInfoCard";
import flecha_4 from "../../../assets/flechas/flecha4.png";
import "./header.css";
import { useSelector } from "react-redux";

const Header_student = ({ imgSrc, buttonText, salirBtn = false  }) => {
  const { userInSession } = useSelector((x) => x.Auth);
  const navigate = useNavigate();
  const { id_curso } = useParams();

  // Función que decide qué renderizar dentro del div circular
  const renderCircularContent = () => {
    if (id_curso != undefined || salirBtn) {
      return (
        <Tooltip
          sx={{ marginRight: "15px" }}
          title={"Ir al campus virtual"}
          placement="left"
        >
          <IconButton
            className="btn-circular"
            onClick={() => navigate("/cursos")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="30px"
              viewBox="0 -960 960 960"
              width="30px"
              fill="var(--OnPrymary-color)"
            >
              <path d="m313-435 199 200q13 13.09 13.5 32.05.5 18.95-12.5 32.38Q500-157 480.18-157T448-171L171-447q-5.91-6.17-9.95-15.19-4.05-9.03-4.05-18.92 0-7.89 4.05-16.84 4.04-8.95 9.95-15.05l278-277q13.5-13 32.25-13T513-790q13 14 13 32.93 0 18.94-13 31.07L313-526h463q19.88 0 32.94 13Q822-500 822-481q0 21-13.06 33.5T776-435H313Z" />
            </svg>
          </IconButton>
        </Tooltip>
      );
    }
    return (
      <>
        <UserInfoCard
          right={15}
          nombre={`${userInSession?.nombre} ${userInSession?.apellidos}`}
        />
      </>
    );
  };

  return (
    <div className="header_style">
      <div className="flecha-navbar">
        <img src={flecha_4} alt="" style={{ height: "100%", width: "100%" }} />
      </div>
      {renderCircularContent()}
    </div>
  );
};

export default Header_student;
