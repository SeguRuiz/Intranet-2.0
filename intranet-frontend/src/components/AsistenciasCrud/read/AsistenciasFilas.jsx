import {
  Fade,
  formControlLabelClasses,
  TableCell,
  TableRow,
} from "@mui/material";
import { MuiTableFilasContext } from "../../AsistenciasTable/AsistenciasTable";
import { useContext, useEffect, useState } from "react";
import { Grow } from "@mui/material";

const filasDefault = [
  {
    nombre: `nombre`,
    apellido: `apelido`,
    cedula: `cedula`,
  },
  {
    nombre: `nombre`,
    apellido: `apelido`,
    cedula: `cedula`,
  },
  {
    nombre: `nombre`,
    apellido: `apelido`,
    cedula: `cedula`,
  },
  {
    nombre: `nombre`,
    apellido: `apelido`,
    cedula: `cedula`,
  },
  {
    nombre: `nombre`,
    apellido: `apelido`,
    cedula: `cedula`,
  },
  {
    nombre: `nombre`,
    apellido: `apelido`,
    cedula: `cedula`,
  },
  {
    nombre: `nombre`,
    apellido: `apelido`,
    cedula: `cedula`,
  },
  {
    nombre: `nombre`,
    apellido: `apelido`,
    cedula: `cedula`,
  },
  {
    nombre: `nombre`,
    apellido: `apelido`,
    cedula: `cedula`,
  },
  {
    nombre: `nombre`,
    apellido: `apelido`,
    cedula: `cedula`,
  },
  {
    nombre: `nombre`,
    apellido: `apelido`,
    cedula: `cedula`,
  },
  {
    nombre: `nombre`,
    apellido: `apelido`,
    cedula: `cedula`,
  },
  {
    nombre: `nombre`,
    apellido: `apelido`,
    cedula: `cedula`,
  },
  {
    nombre: `nombre`,
    apellido: `apelido`,
    cedula: `cedula`,
  },
  {
    nombre: `nombre`,
    apellido: `apelido`,
    cedula: `cedula`,
  },
  {
    nombre: `nombre`,
    apellido: `apelido`,
    cedula: `cedula`,
  },
  {
    nombre: `nombre`,
    apellido: `apelido`,
    cedula: `cedula`,
  },
  {
    nombre: `nombre`,
    apellido: `apelido`,
    cedula: `cedula`,
  },
];

const AsistenciasFilas = () => {
  const { calcularPaginas, setFilas, filas } = useContext(MuiTableFilasContext);
  
  useEffect(() => {
    setFilas(filasDefault);
    

    
  }, []);

  return (
    <>
      {calcularPaginas().map((x, i) => (
        
          <TableRow sx={{ bgcolor: "var(--SurfaceDarked-color)" }} key={i}>
            <TableCell>Hola</TableCell>
            <TableCell>Hola</TableCell>
            <TableCell>Hola</TableCell>
          </TableRow>
       
      ))}
    </>
  );
};

export default AsistenciasFilas;
