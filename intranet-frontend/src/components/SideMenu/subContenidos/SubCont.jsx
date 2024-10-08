import "./SubCont.css";
import SelectSubcont from "./SelectSubcont";

const SubCont = ({ subcontenidos }) => {

  return (
    <>
      {subcontenidos.map((subCont) => (
        <SelectSubcont key={subCont.id} nombre={subCont.nombre} archivo={subCont.archivo} contenido_id={subCont.contenido} id={subCont.id}/>
      ))}
    </>
  );
};

export default SubCont;
