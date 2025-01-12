import { useSelector } from "react-redux";
import { ROLES_DE_USUARIO } from "../../utils/Globals.d";
import { Tooltip, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import MuiModal from "../MuiModal/MuiModal";
import { useState } from "react";
const Ir_a_tomarAsistencias = () => {
  const navigate = useNavigate();
  const { userInSession } = useSelector((x) => x.Auth);
  const [open, setOpen] = useState(false);
  return (
    <>
      {userInSession.is_staff ||
      userInSession?.rol == ROLES_DE_USUARIO.profesor ? (
        <Tooltip title="Ir a tomar asistencia del día">
          <Button
            onClick={() => {
              try {
                const id = userInSession.grupos[0].grupo_id;

                navigate(`/asistencias/${id}`);
              } catch {
                setOpen(true);
              }
            }}
          >
            <ChecklistRtlIcon sx={{ color: "var(--OnPrymary-color)" }} />
          </Button>
        </Tooltip>
      ) : (
        <></>
      )}
      <MuiModal
        Title="¡Ups!"
        body="No estas en ningun grupo, entonces no puedes pasar lista (Admin vago no quiere arreglar el bug)"
        open={open}
        setOpen={setOpen}
        Info={true}
      
      />
    </>
  );
};

export default Ir_a_tomarAsistencias;
