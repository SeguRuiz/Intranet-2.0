import { TableRow, TableCell, Avatar, Checkbox } from "@mui/material";
import { stringAvatar } from "../../../utils/Utils";
import SeEstadoAsistencia from "../add/SeEstadoAsistencia";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const asistenciasEstados = {
  presente: "presente",
  ausente: "ausente",
  tardia: "tardia",
  retiro: "retiro",
};

const AsistenciasFila = ({ nombre = "", id = null }) => {
  const [estado, setEstado] = useState(null);
  const { informeAsubir } = useSelector((x) => x.Asistencias);

  useEffect(() => {
    informeAsubir.length == 0 && setEstado(null);
  }, [informeAsubir]);
  return (
    <TableRow sx={{ bgcolor: "var(--SurfaceBrigth-color)" }}>
      <TableCell>
        <Avatar {...stringAvatar(`${nombre}`)} />
      </TableCell>
      <TableCell>{nombre}</TableCell>
      <SeEstadoAsistencia
        id={id}
        estadoNuevo={asistenciasEstados.presente}
        cambiarEstado={setEstado}
        estadoDeFila={estado}
        nombre={nombre}
      />
      <SeEstadoAsistencia
        id={id}
        estadoNuevo={asistenciasEstados.ausente}
        cambiarEstado={setEstado}
        estadoDeFila={estado}
        nombre={nombre}
      />
      <SeEstadoAsistencia
        id={id}
        estadoNuevo={asistenciasEstados.tardia}
        cambiarEstado={setEstado}
        estadoDeFila={estado}
        nombre={nombre}
      />
      <SeEstadoAsistencia
        id={id}
        estadoNuevo={asistenciasEstados.retiro}
        cambiarEstado={setEstado}
        estadoDeFila={estado}
        nombre={nombre}
      />
    </TableRow>
  );
};

export default AsistenciasFila;
