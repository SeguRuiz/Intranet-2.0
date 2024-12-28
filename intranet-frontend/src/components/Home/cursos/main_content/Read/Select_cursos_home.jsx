import { useNavigate } from "react-router-dom";
import cursos_img_1 from "../../../../../assets/Cursos/LandScape1.jpg";
import cursos_img_2 from "../../../../../assets/Cursos/LandScape2.jpg";
import cursos_img_3 from "../../../../../assets/Cursos/LandScape3.jpg";
import cursos_img_4 from "../../../../../assets/Cursos/LandScape4.jpg";
import cursos_img_5 from "../../../../../assets/Cursos/LandScape5.jpg";
import cursos_img_6 from "../../../../../assets/Cursos/LandScape6.jpg";
import Menu_options_reportes from "../../../../Control-page/Reportes/read/Menu_options_reportes";
import { Delete_cursos } from "../Delete/Delete_cursos";
import { stringToColor } from "../../../../../utils/Utils";
import { useSelector } from "react-redux";
const Select_cursos_home = ({ id, nombre }) => {
  const navigate = useNavigate();
  const images_array = [
    cursos_img_1,
    cursos_img_2,
    cursos_img_3,
    cursos_img_4,
    cursos_img_5,
    cursos_img_6,
  ];
  const random = Math.floor(Math.random() * images_array.length);
  const { userInSession } = useSelector((x) => x.Auth);

  return (
    <div key={id} id={id} className="note-container">
      <div
        className="cursos-card-img"
        style={{ backgroundColor: stringToColor(nombre) }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="160px"
          viewBox="0 -960 960 960"
          width="160px"
          fill="var(--OnPrymary-color)"
        >
          <path d="M480-60q-78-69-170.5-106T120-203v-429q94 0 186.5 43T480-469q81-77 173.5-120T840-632v429q-97 0-189.5 37T480-60Zm3-552q-65 0-109.5-44.5T329-766q0-65 44.5-109.5T483-920q65 0 109.5 44.5T637-766q0 65-44.5 109.5T483-612Z" />
        </svg>
      </div>
      <div className="cursos-card-text">
        <div
          className="entrar-curso-btn"
          onClick={() => {
            navigate(`/cursos/${id}/carpetas`);
          }}
        >
          Entrar
        </div>
      </div>
      <div className="text-img-curso">
        <p>{nombre}</p>
      </div>
      {userInSession?.is_staff && (
        <>
          <Menu_options_reportes
            customBtn={true}
            btn={
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="30px"
                  viewBox="0 -960 960 960"
                  width="30px"
                  fill="var(--OnPrymary-color)"
                >
                  <path d="M480-360 280-559h400L480-360Z" />
                </svg>
              </>
            }
            sx={{ position: "absolute", justifySelf: "end" }}
          >
            <Delete_cursos id={id} />
          </Menu_options_reportes>
        </>
      )}
    </div>
  );
};

export default Select_cursos_home;
