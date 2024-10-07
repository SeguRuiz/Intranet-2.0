import { useSelector } from "react-redux";
import { useFetch } from "../../services/llamados";
import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { add_archivos_subcontenidos } from "../../redux/CursosContenidosSlice";
import { useParams } from "react-router-dom";
import './File_preview.css'
function File_preview() {
  const [archivo, setArchivo] = useState(null);
  const accion = useDispatch()
  const { curso_id } = useParams();

  const { archivo_mostrandose } = useSelector(
    (state) => state.CursosContenidos
  );
  const { define_fetch, fetch_the_data_without_token, fetching } = useFetch();
  const { Arhivos_subcontenidos, Contenidos} = useSelector(
    (state) => state.CursosContenidos
  );

  useLayoutEffect(() => {
    (async () => {
        const archivo_encontrado = Arhivos_subcontenidos.find(e => e.id == archivo_mostrandose?.archivo) ?? false
        archivo_encontrado != false ? setArchivo(archivo_encontrado?.archivo) : setArchivo(null)
      if (
        archivo_mostrandose?.archivo != null &&
        archivo_mostrandose?.archivo != undefined && 
        archivo_encontrado == false
      ) {
        define_fetch("http://localhost:8000/files/get_archivo", "", "POST", {
          archivo: archivo_mostrandose.archivo,
        });
        const data = await fetch_the_data_without_token();
        console.log(data);
        setArchivo(data[1].archivo);
        accion(
            add_archivos_subcontenidos({
              subcontenido_id: archivo_mostrandose.subcontenido,
              contenido_id: archivo_mostrandose.contenido,
              data: {
                id: archivo_mostrandose.archivo,
                archivo: data[1].archivo,
              },
            })
          );
           
      } 
    })();
  }, [archivo_mostrandose]);

  useLayoutEffect(() => {
    if (archivo_mostrandose != null) {
      Contenidos.forEach((e) => {
        if (e.id == archivo_mostrandose.contenido) {
          e.subcontenidos.forEach((e) => {
            if (e.id == archivo_mostrandose.subcontenido && e.archivo == null) {
              setArchivo(null);
            }
          });
        }
      });
    }
  }, [Contenidos, archivo_mostrandose]);

  return (
    <>
      {!fetching && archivo == null ? (
        <h1>default</h1>
      ) : fetching ? (
        <h1>cargando</h1>
      ) : (
        <div className="file-container">
        <iframe src={archivo} className="file-iframe"></iframe>
        </div>
      )}
    </>
  );
}

export default File_preview;
