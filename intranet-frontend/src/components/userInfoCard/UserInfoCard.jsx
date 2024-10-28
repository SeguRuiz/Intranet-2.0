import "./UserInfoCard.css";
import { Avatar } from "@mui/material";
import { stringAvatar } from "../../utils/Utils";
import { Tooltip } from "@mui/material";
const UserInfoCard = ({ nombre, right = 0, left = 0 }) => {
  return (
    <div
      className="UserInfoContainer"
      style={{ marginRight: `${right}px`, marginLeft: `${left}px` }}
    >
      <Avatar
        {...stringAvatar(nombre, {
          fontSize: "15px",
          width: 30,
          height: 30,

        })}
      />
      <Tooltip title={nombre}>
        <strong
          style={{
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
            maxWidth: "100px",
          }}
        >
          {nombre}
        </strong>
      </Tooltip>
    </div>
  );
};

export default UserInfoCard;
