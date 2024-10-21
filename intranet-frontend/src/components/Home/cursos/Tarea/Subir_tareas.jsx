import React, { useState } from "react";
import Swal from "sweetalert2";
import { useFetch } from "../../../../services/llamados";

const Subir_tareas = () => {
  const [selectedFiles, setSelectedFiles] = useState(null);
  const { define_fetch } = useFetch();

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };

  const handleUpload = () => {
    if (!selectedFiles) {
      Swal.fire("Por favor selecciona al menos un archivo.");
      return;
    }

    // Creamos un FormData para enviar el archivo
    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("files", selectedFiles[i]);
    }

    define_fetch("http://localhost:8000/info_tareas/info", "", "POST"),
      {
        //tengo que agregar el cuerpo del archivo que se va a subir al endpoint
      };
  };

  return (
    <div>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        style={{ marginBottom: "10px" }}
      />
      <button onClick={handleUpload}>Subir archivos</button>
    </div>
  );
};

export default Subir_tareas;
