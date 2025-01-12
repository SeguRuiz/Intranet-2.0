import { Button, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ROLES_DE_USUARIO } from "../../utils/Globals.d";

const Go_to_admin = () => {
  const navigate = useNavigate();
  const { userInSession } = useSelector((x) => x.Auth);
  return (
    <>
      {userInSession.is_staff || userInSession?.rol == ROLES_DE_USUARIO.profesor ? (
        <Tooltip title="Ir a la pagin administrativa">
          <Button
            onClick={() => {
              navigate("/admin/control_usuarios");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="30px"
              viewBox="0 -960 960 960"
              width="30px"
              fill="var(--OnPrymary-color)"
            >
              <path d="M688.67-80Q609-80 552.83-136.5q-56.16-56.5-56.16-134.83 0-79.67 56.16-136.17Q609-464 688.67-464q79 0 135.5 56.5t56.5 136.17q0 78.33-56.5 134.83Q767.67-80 688.67-80ZM480-80q-138.33-33-229.17-157.5Q160-362 160-520v-240.67l320-120 320 120V-505q-25.33-12.33-54.17-19-28.83-6.67-57.16-6.67-107.34 0-183 76-75.67 76-75.67 183.34 0 52.66 20.83 100Q471.67-124 506.33-89q-6.33 3.33-13.16 5.17Q486.33-82 480-80Zm207.33-193.33q25.67 0 43.5-18.5 17.84-18.5 17.84-44.17t-17.84-43.5q-17.83-17.83-43.5-17.83-25.66 0-44.16 17.83-18.5 17.83-18.5 43.5t18.5 44.17q18.5 18.5 44.16 18.5ZM686.67-150q32.33 0 59-14.17 26.66-14.16 44.66-39.5-24.66-13.66-50.33-20.66-25.67-7-53.33-7-27.67 0-53.67 7t-50 20.66q18 25.34 44.33 39.5Q653.67-150 686.67-150Z" />
            </svg>
          </Button>
        </Tooltip>
      ) : (
        <></>
      )}
    </>
  );
};

export default Go_to_admin;
