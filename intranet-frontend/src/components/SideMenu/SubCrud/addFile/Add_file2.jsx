import "./addFile.css";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { add_archivos_subcontenidos } from "../../../../redux/CursosContenidosSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useFetch } from "../../../../services/llamados";
import uuid from "react-uuid";
import DeleteFile from "./deleteFile/DeleteFile";
import { getCookie } from "../../../../utils/Cookies";

const Add_file2 = ({ id, contenido_id, archivo }) => {
  const file_ref = useRef();
  const [archivoAsinado, setAcrhivoAsignado] = useState(false);
  const token = getCookie("token");
  const { fetching, fetch_the_data } = useFetch();
  const [archivo_key, setArchivo_key] = useState(null);
  const { Arhivos_subcontenidos, Contenidos } = useSelector(
    (state) => state.CursosContenidos
  );
  const accion = useDispatch();

  const subirArchivo = async (archivo) => {
    const data = await fetch_the_data(
      "http://localhost:8000/files/guardar_archivo",
      token,
      "POST",
      { method: "POST", subcontenido: id, files_info: [archivo] }
    );
    console.log(data);
    accion(
      add_archivos_subcontenidos({
        subcontenido_id: id,
        contenido_id: contenido_id,
        data: {
          id: data[1].archivo_creado[0].id,
          key: data[1].archivo_creado[0].key,
          archivo: archivo.data_archivo,
          nombre: archivo.nombre,
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
            setAcrhivoAsignado(true);
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
      <div className="drag-div" onClick={seleccionarArchivo}>
        {archivoAsinado ? (
          <DeleteFile
            id={id}
            contenido_id={contenido_id}
            archivo_key={archivo}
            set={setAcrhivoAsignado}
          />
        ) : fetching ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="25px"
            viewBox="0 -960 960 960"
            width="25px"
            fill="var(--PrymaryContainer-color)"
          >
            <path d="M164.67-160v-66.67H288l-15.33-12.66q-60-49.34-86.34-109Q160-408 160-477.33q0-107.67 63.83-192.84 63.84-85.16 167.5-115.83v69.33q-74 28-119.33 93.84-45.33 65.83-45.33 145.5 0 57 21.33 102.16 21.33 45.17 60 79.84L331.33-278v-115.33H398V-160H164.67Zm404.66-13.33v-70q74.67-28 119.34-93.84 44.66-65.83 44.66-145.5 0-47-21.33-94.16-21.33-47.17-58.67-84.5L630.67-682v115.33H564V-800h233.33v66.67h-124l15.34 14q56.33 53.66 83.83 115.5Q800-542 800-482.67 800-375 736.5-289.5 673-204 569.33-173.33Z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="25px"
            viewBox="0 -960 960 960"
            width="25px"
            fill="var(--PrymaryContainer-color)"
          >
            <path d="M660-480v-236h60v236h-60ZM430-253q-26-12-43-36.47T370-346v-370h60v463Zm43 173q-103.17 0-175.58-71.5Q225-223 225-326v-380q0-72.5 51.5-123.25T400-880q72 0 123.5 50.75T575-706v346h-60v-346q0-48-33.5-81t-81.71-33q-48.21 0-81.5 33.06T285-706v380q0 78 54.97 132T473-140q37 0 69.5-13t57.5-36v74q-28 17-60 26t-67 9Zm187-40v-120H540v-60h120v-120h60v120h120v60H720v120h-60Z" />
          </svg>
        )}
      </div>
    </>
  );
};

export default Add_file2;
