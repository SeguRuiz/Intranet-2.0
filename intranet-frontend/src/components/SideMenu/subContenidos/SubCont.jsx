import "./SubCont.css";
const SubCont = ({ subcontenidos }) => {
  return (
    <>
      {subcontenidos.map((subCont) => (
        <div key={subCont.id} className="subContenido">
          <p style={{ marginLeft: "10px" }}>{subCont.nombre}</p>
        </div>
      ))}
    </>
  );
};

export default SubCont;
