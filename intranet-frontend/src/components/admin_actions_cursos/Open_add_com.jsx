import { Tooltip } from "@mui/material";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { set_edit_com } from "../../redux/ComunicacionesSlice";
import { useDispatch } from "react-redux";
import { ROLES_DE_USUARIO } from "../../utils/Globals.d";
const Open_add_com = () => {
  const { edit_com } = useSelector((x) => x.Comunicaciones);
  const { userInSession } = useSelector((x) => x.Auth);
  const accion = useDispatch();
  return (
    <>
      {userInSession?.rol == ROLES_DE_USUARIO.profesor || userInSession?.is_staff ? (
        <Tooltip
          title="Agregar un comunicado"
          onClick={() => {
            edit_com ? accion(set_edit_com(false)) : accion(set_edit_com(true));
          }}
        >
          <Button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="30px"
              viewBox="0 -960 960 960"
              width="30px"
              fill="var(--OnPrymary-color)"
            >
              <path d="M718-101h33v-110h110v-33H751v-110h-33v110H608v33h110v110Zm15 60q-78 0-133-55.5T545-228q0-78 55-133.5T733-417q77 0 132.5 55.5T921-228q0 76-55.5 131.5T733-41ZM280-620h400v-60H280v60Zm230 500H180q-25 0-42.5-17.5T120-180v-600q0-25 17.5-42.5T180-840h600q25 0 42.5 17.5T840-780v329q-25-13-52-19t-55-6q-14 0-27 1.5t-26 4.5v-40H280v60h344q-36 18-64.5 46.5T513-340H280v60h211q-3 13-4.5 26t-1.5 27q0 29 6 55t19 52Z" />
            </svg>
          </Button>
        </Tooltip>
      ) : (
        <></>
      )}
    </>
  );
};

export default Open_add_com;
