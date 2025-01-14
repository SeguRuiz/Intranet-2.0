import { Avatar, TableCell, TableRow } from "@mui/material";
import { MuiTableFilasContext } from "../../AsistenciasTable/AsistenciasTable";
import { useContext, useEffect, useState } from "react";
import { stringAvatar, stringToColor } from "../../../utils/Utils";

import { useSelector } from "react-redux";
import AsistenciasFila from "./AsistenciasFila";

const AsistenciasFilas = () => {
  const { calcularPaginas, setFilas } = useContext(MuiTableFilasContext);
  const { estudiantesDelDia } = useSelector((x) => x.Asistencias);

  useEffect(() => {
    setFilas(estudiantesDelDia);
  }, [estudiantesDelDia]);
   
  return (
    <>
      {calcularPaginas().map((x, i) => (
        <AsistenciasFila key={x?.id} nombre={`${x?.nombre}`} id={x.id} />
      ))}
    </>
  );
};

export default AsistenciasFilas;
