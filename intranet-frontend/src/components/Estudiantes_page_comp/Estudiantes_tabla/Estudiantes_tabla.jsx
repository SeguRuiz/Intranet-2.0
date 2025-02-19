import { Paper, Box, Chip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { getCookie } from "../../../utils/Cookies";
import { useFetch } from "../../../services/llamados";
import { toast } from "react-toastify";
import { esES } from "@mui/x-data-grid/locales";
import { useNavigate, useParams } from "react-router-dom";

const localeText = esES.components.MuiDataGrid.defaultProps.localeText;
const generarEstudiantesMock = (cantidad) => {
  const estudiantes = [];
  const nombres = [
    "Juan",
    "María",
    "Pedro",
    "Ana",
    "Luis",
    "Sofía",
    "Carlos",
    "Elena",
  ];
  const apellidos = [
    "Gómez",
    "Rodríguez",
    "Fernández",
    "López",
    "Díaz",
    "Pérez",
  ];

  for (let i = 1; i <= cantidad; i++) {
    estudiantes.push({
      id: `mock-id-${i}`,
      usuario_id: `user_${i}`,
      nota: parseFloat((Math.random() * 100).toFixed(2)), // Nota entre 0 y 100
      reportes: Math.floor(Math.random() * 10), // Reportes entre 0 y 9
      activo: Math.random() > 0.3, // 70% activos, 30% inactivos
      fecha_creacion: new Date(
        2024,
        0,
        Math.floor(Math.random() * 28) + 1
      ).toISOString(),
      faltas: Math.floor(Math.random() * 5), // Faltas entre 0 y 4
      fecha_actualizacion: new Date().toISOString(),
    });
  }
  return estudiantes;
};

const En_espera = (en_espera) => {
  return (
    <Chip
      label={en_espera ? "En espera" : "Revisado"}
      color={en_espera ? "warning" : "success"}
      size="small"
    />
  );
};

const Render_grupo = (grupo) => {
  return grupo ? grupo : "Sin grupo"
}

const reportes_cantidad = (cantidad) => {
  return cantidad ? cantidad : 0
}

const columnas = [
  { field: "id_user", headerName: "ID", headerAlign: "left", align: "left" },
  {
    field: "nombre_usuario",
    headerName: "Nombre",
    headerAlign: "left",
    align: "left",
  },
  {
    field: "apellidos_usuario",
    headerName: "Apellidos",
    headerAlign: "left",
    align: "left",
  },
  {
    field: "correo",
    headerName: "Correo",
    headerAlign: "left",
    align: "left",
    minWidth: 160,
  },
  {
    field: "cedula",
    headerName: "Cedula",
    headerAlign: "left",
    align: "left",
  },
  {
    field: "en_espera",
    headerName: "En espera",
    type: "boolean",
    headerAlign: "left",
    align: "left",
    renderCell: (params) => En_espera(params.value),
  },
 
  {
    field: "numero_reportes",
    headerName: "Reportes",
    type: 'number',
    renderCell: (params) => reportes_cantidad(params.value),
    headerAlign: "left",
    align: "left",
  },
  {
    field: "grupo_nombre",
    headerName: "Grupo",
    minWidth: 170,
    renderCell: (params) => Render_grupo(params.value),
    headerAlign: "left",
    align: "left",
  },
];


const Estudiantes_tabla = ({ estudiantes = [], loading=false }) => {
  const { id_usuario } = useParams();
  const navigate = useNavigate();

  return (
    <Paper
      sx={{
        height: "70vh",
        width: "80%",
      }}
    >
      <DataGrid
        columns={columnas}
        rows={estudiantes}
        getRowId={(fila) => fila.id_user}
        pagination
       
        loading={loading}
        rowSelection={false}
        localeText={localeText}
        onRowClick={(event) => {
          navigate(`/usuarios/${id_usuario}/estudiantes?est=${event.id}`);
        }}
      />
    </Paper>
  );
};

export default Estudiantes_tabla;
