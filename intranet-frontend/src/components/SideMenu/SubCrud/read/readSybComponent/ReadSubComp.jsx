import DeleteSubCont from "../../delete/DeleteSubCont";
import Add_file2 from "../../addFile/Add_file2";
import "./ReadSubConts.css";

const ReadSubComp = ({ subcontenido = [] }) => {
  return (
    <div key={subcontenido.id} className="subcontenido-edit-container">
      <div className="subcontenidos-nombre">
        <p style={{ marginLeft: "10px" }}>{subcontenido.nombre}</p>
      </div>
      <div className="subcontenidos-btns">
       
        <Add_file2 id={subcontenido.id} contenido_id={subcontenido.contenido_id ?? subcontenido.contenido} archivo={subcontenido.archivo}/>
        <DeleteSubCont
          id={subcontenido.id}
          contenido_id={subcontenido.contenido_id ?? subcontenido.contenido}
        />
      </div>
    </div>
  );
};

export default ReadSubComp;
