import "./addFile.css";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { add_archivos_subcontenidos } from "../../../../redux/CursosContenidosSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useFetch } from "../../../../services/llamados";
import uuid from "react-uuid";
import DeleteFile from "./deleteFile/DeleteFile";

const Add_file2 = ({ id, contenido_id, archivo }) => {
  const file_ref = useRef();
  const [archivoAsinado, setAcrhivoAsignado] = useState(false);
  const { define_fetch, fetch_the_data_without_token } = useFetch();
  const [archivo_key, setArchivo_key] = useState(null);
  const { Arhivos_subcontenidos, Contenidos } = useSelector(
    (state) => state.CursosContenidos
  );
  const accion = useDispatch();

  const subirArchivo = async (archivo) => {
    define_fetch("http://localhost:8000/files/guardar_archivo", "", "POST", {
      method: "POST",
      subcontenido: id,
      files_info: [archivo],
    });
    const data = await fetch_the_data_without_token();
    console.log(data);
    accion(
      add_archivos_subcontenidos({
        subcontenido_id: id,
        contenido_id: contenido_id,
        data: {
          id: data[1].archivo_creado[0].id,
          key: data[1].archivo_creado[0].key,
          archivo: archivo.data_archivo,
          nombre: archivo.nombre
        },
      })
    );
     
    
  };

  const convertAnArrayArchives = (Archives) => {
    const file_array = Array.from(Archives);

    file_array.forEach((e) => {
      const reader = new FileReader();

      reader.readAsDataURL(e);

      reader.addEventListener("load", () => {
        const id_archivo = uuid();

        const archivo_objeto = {
          id: id_archivo,
          nombre: e.name,
          data_archivo: reader.result,
        };
        subirArchivo(archivo_objeto);
      });
    });
  };

  const seleccionarArchivo = () => {
    if (!archivoAsinado) {
      file_ref.current.click();
      return;
    }
  };

  useEffect(() => {
    Contenidos.forEach((e) => {
      if (e.id == contenido_id) {
        e.subcontenidos.forEach((e) => {
          if (e.id == id && e.archivo != null) {
            setArchivo_key(e.archivo);
            setAcrhivoAsignado(true)
          }
        });
      }
    });
  }, [Contenidos, Arhivos_subcontenidos]);

  return (
    <>
      <input
        type="file"
        id="file"
        className="file_inp"
        ref={file_ref}
        onChange={(e) => {
          convertAnArrayArchives(e.target.files);
        }}
        accept=".pdf"
      />
      <div
        className="drag-div"
        onClick={seleccionarArchivo}
        style={{ backgroundColor: archivoAsinado ? "green" : "red" }}
      >
        {archivoAsinado ? (
          <DeleteFile
            id={id}
            contenido_id={contenido_id}
            archivo_key={archivo}
            set={setAcrhivoAsignado}
          />
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Add_file2;
