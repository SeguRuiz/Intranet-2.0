import { useFetch } from "../../../../../services/llamados";
import { delete_archivos_subcontenidos } from "../../../../../redux/CursosContenidosSlice";
import { useDispatch } from "react-redux";
import "./Delete_file.css";
import { getCookie } from "../../../../../utils/Cookies";
const DeleteFile = ({ id, contenido_id, archivo_key, set }) => {
  const { fetching, fetch_the_data } = useFetch();
  const token = getCookie("token");
  const accion = useDispatch();

  const DeleteFile = async () => {
    console.log(archivo_key);

    const data = await fetch_the_data(
      "http://localhost:8000/files/delete_archivo",
      token,
      "DELETE",
      {
        method: "DELETE",
        id: archivo_key,
      }
    );
    console.log(data);

    accion(
      delete_archivos_subcontenidos({
        contenido_id: contenido_id,
        subcontenido_id: id,
        key: archivo_key,
      })
    );
    set(false);
  };

  return (
    <>
      {fetching ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="25px"
          viewBox="0 -960 960 960"
          width="25px"
          fill="#ffff"
        >
          <path d="M164.67-160v-66.67H288l-15.33-12.66q-60-49.34-86.34-109Q160-408 160-477.33q0-107.67 63.83-192.84 63.84-85.16 167.5-115.83v69.33q-74 28-119.33 93.84-45.33 65.83-45.33 145.5 0 57 21.33 102.16 21.33 45.17 60 79.84L331.33-278v-115.33H398V-160H164.67Zm404.66-13.33v-70q74.67-28 119.34-93.84 44.66-65.83 44.66-145.5 0-47-21.33-94.16-21.33-47.17-58.67-84.5L630.67-682v115.33H564V-800h233.33v66.67h-124l15.34 14q56.33 53.66 83.83 115.5Q800-542 800-482.67 800-375 736.5-289.5 673-204 569.33-173.33Z" />
        </svg>
      ) : (
        <button className="Delete-file-btn" onClick={DeleteFile}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="25px"
            viewBox="0 -960 960 960"
            width="25px"
            fill="#ffff"
          >
            <path d="m412-279 230-230-40-40-189 189-100-100-41 41 140 140ZM251-160q-88 0-149.5-61.5T40-371q0-78 50-137t127-71q20-97 94-158.5T482-799q112 0 189 81.5T748-522v24q72-2 122 46.5T920-329q0 69-50 119t-119 50H251Zm0-60h500q45 0 77-32t32-77q0-45-32-77t-77-32h-63v-84q0-91-61-154t-149-63q-88 0-149.5 63T267-522h-19q-62 0-105 43.5T100-371q0 63 44 107t107 44Zm229-260Z" />
          </svg>
        </button>
      )}
    </>
  );
};

export default DeleteFile;
