import { useEffect, useState } from "react";
import "./read-comu.css";
import { Avatar } from "@mui/material";
import { stringAvatar } from "../../../utils/Utils";
import UserInfoCard from "../../userInfoCard/UserInfoCard";
import Delete_comunicado from "../delete/Delete_comunicado";
import { useFetch } from "../../../services/llamados";
import { Tooltip } from "@mui/material";
import { getCookie } from "../../../utils/Cookies";
const Select_Comu = ({
  id,
  asunto,
  fecha_creacion,
  descripcion,
  usuario_id,
}) => {
  const fecha = new Date(fecha_creacion);
  const [nombre, setNombre] = useState("No Name");
  const token = getCookie("token");
  const { fetch_the_data } = useFetch();

  const dia = fecha.toLocaleDateString("en-GB");

  const hora = fecha.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  useEffect(() => {
    (async () => {
      const data = await fetch_the_data(
        "https://intranet-2-0-api.onrender.com/api/get_user_info",
        token,
        "GET",
        null,
        usuario_id
      );
      console.log(data);

      data[0] == 200 && setNombre(`${data[1].nombre} ${data[1].apellidos}`);
    })();
  }, []);

  return (
    <div className="asunto-container">
      <div className="asunto-info-area">
        <strong>{asunto}</strong>
        <Tooltip title={nombre} placement="left">
          <Avatar
            {...stringAvatar(nombre, {
              fontSize: "15px",
              width: 30,
              height: 30,
              cursor: "pointer",
            })}
          />
        </Tooltip>
      </div>
      <textarea
        className="asunto-desc-info"
        defaultValue={descripcion}
        readOnly
      ></textarea>
      <div className="asunto-date-info">
        <strong>{`${dia}  ${hora}`}</strong>
      </div>
      <Delete_comunicado id={id} />
    </div>
  );
};

export default Select_Comu;
