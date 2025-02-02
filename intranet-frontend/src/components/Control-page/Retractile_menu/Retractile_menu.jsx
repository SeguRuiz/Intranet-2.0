import { useState } from "react";
import "./Retractile_menu.css";
const Retractile_menu = ({
  children,
  altura = 30,
  titulo = "default",
  loading = false,
  ok = false,
  error = false,
}) => {
  const [abrir, setAbrir] = useState(true);
  return (
    <div
      className="retractile-div"
      style={{ height: abrir ? `${altura}vh` : "9vh" }}
    >
      <div
        className={abrir ?  "crud-title" : "crud-title-closed"}
        style={{ height: abrir ? "5vh" : "9vh" }}
        
      >
        <p
          style={{
            marginLeft: "10px",
            fontSize: abrir ? "" : "30px",
            transition: "0.2s",
          }}
        >
          {titulo}
        </p>
        {loading && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#9AA0A6"
            className="loading-icon"
          >
            <path d="M160-160v-80h110l-16-14q-52-46-73-105t-21-119q0-111 66.5-197.5T400-790v84q-72 26-116 88.5T240-478q0 45 17 87.5t53 78.5l10 10v-98h80v240H160Zm400-10v-84q72-26 116-88.5T720-482q0-45-17-87.5T650-648l-10-10v98h-80v-240h240v80H690l16 14q49 49 71.5 106.5T800-482q0 111-66.5 197.5T560-170Z" />
          </svg>
        )}
        {ok && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#9AA0A6"
          >
            <path d="M440-82q-76-8-141.5-41.5t-114-87Q136-264 108-333T80-480q0-91 36.5-168T216-780h-96v-80h240v240h-80v-109q-55 44-87.5 108.5T160-480q0 123 80.5 212.5T440-163v81Zm-17-214L254-466l56-56 113 113 227-227 56 57-283 283Zm177 196v-240h80v109q55-45 87.5-109T800-480q0-123-80.5-212.5T520-797v-81q152 15 256 128t104 270q0 91-36.5 168T744-180h96v80H600Z" />
          </svg>
        )}
        {error && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#9AA0A6"
          >
            <path d="M120-160v-80h110l-16-14q-52-46-73-105t-21-119q0-111 66.5-197.5T360-790v84q-72 26-116 88.5T200-478q0 45 17 87.5t53 78.5l10 10v-98h80v240H120Zm360-120q-17 0-28.5-11.5T440-320q0-17 11.5-28.5T480-360q17 0 28.5 11.5T520-320q0 17-11.5 28.5T480-280Zm-40-160v-240h80v240h-80Zm160 270v-84q72-26 116-88.5T760-482q0-45-17-87.5T690-648l-10-10v98h-80v-240h240v80H730l16 14q49 49 71.5 106.5T840-482q0 111-66.5 197.5T600-170Z" />
          </svg>
        )}
      </div>
      <div className="retractile-div-content">{children}</div>
    </div>
  );
};

export default Retractile_menu;
