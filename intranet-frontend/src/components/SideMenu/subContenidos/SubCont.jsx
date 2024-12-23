import "./SubCont.css";
import SelectSubcont from "./SelectSubcont";
import { List } from "@mui/material";

const SubCont = ({ subcontenidos }) => {
  console.log(subcontenidos);

  return (
    <>
    
      <List sx={{bgcolor: 'var(--SurfaceBrigth-color)'}} disablePadding>
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
