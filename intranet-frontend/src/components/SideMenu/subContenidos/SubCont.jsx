import "./SubCont.css";
import SelectSubcont from "./SelectSubcont";
import AddSubContInpt from "../SubCrud/addv2/AddSubContInpt";
import { List } from "@mui/material";

const SubCont = ({
  subcontenidos,
  addSub = false,
  open = false,
  setAddSub,
  contenido_id = null,
  setOpen,
}) => {
  return (
    <>
      <List sx={{ bgcolor: "var(--SurfaceBrigth-color)" }} disablePadding>
        {addSub && open && (
          <AddSubContInpt
            setAddSub={setAddSub}
            contenido_id={contenido_id}
            setOpen={setOpen}
            subcontenidos={subcontenidos}
          />
        )}
        {subcontenidos.map((subCont) => (
          <SelectSubcont
            key={subCont.id}
            nombre={subCont.nombre}
            archivo={subCont?.archivo}
            contenido_id={subCont.contenido}
            id={subCont.id}
          />
        ))}
      </List>
    </>
  );
};

export default SubCont;
