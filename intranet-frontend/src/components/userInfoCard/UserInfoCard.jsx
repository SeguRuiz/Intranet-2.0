import "./UserInfoCard.css";
import { Avatar } from "@mui/material";
import { stringAvatar } from "../../utils/Utils";
import { Tooltip } from "@mui/material";
import Menu_options_reportes from "../Control-page/Reportes/read/Menu_options_reportes";
import Log_out from "./Log_out";
const UserInfoCard = ({ nombre, right = 0 }) => {
  return (
    <div
      className="UserInfoContainer"
      style={{ position: "absolute", right: right }}
    >
      <Menu_options_reportes
        customBtn={true}
        btn={
          <Avatar
            {...stringAvatar(nombre, {
              fontSize: "15px",
              width: 30,
              height: 30,
            })}
          ></Avatar>
        }
      >
        <Log_out />
      </Menu_options_reportes>
      <Tooltip title={nombre}>
        <strong
          style={{
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
            maxWidth: "70px",
          }}
        >
          {nombre}
        </strong>
      </Tooltip>
    </div>
  );
};

export default UserInfoCard;
