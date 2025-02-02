import { Checkbox, TableCell } from "@mui/material";
import { add_informe_a_subir } from "../../../redux/Asistencias";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const SeEstadoAsistencia = ({
  id = null,
  estadoNuevo = "None",
  cambiarEstado,
  estadoDeFila = "None",
  nombre = "",
}) => {
  const { id_grupo } = useParams();
  const [seleccionado, setSeleccionado] = useState(false);
  const accion = useDispatch();

  useEffect(() => {
    setSeleccionado(estadoNuevo == estadoDeFila);
  }, [estadoDeFila]);

  const handleClick = (event, value) => {
    value &&
      accion(
        add_informe_a_subir({
          id: id,
          nuevoEstado: estadoNuevo,
          nombre: nombre,
          info: {
            grupo_id: id_grupo,
            estudiante_id: id,
            estado: estadoNuevo,
            reporte_asistencias_id: null
          },
        })
      );
    cambiarEstado(estadoNuevo);
  };

  return (
    <TableCell>
      <Checkbox onChange={handleClick} checked={seleccionado} />
    </TableCell>
  );
};

export default SeEstadoAsistencia;
