import { Paper, Box } from "@mui/material";
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

  //   {
  //     field: "reportes",
  //     headerName: "Reportes",
  //     type: "number",
  //     headerAlign: "left",
  //     align: "left",
  //   },
  {
    field: "activo",
    headerName: "Activo",
    type: "boolean",
    headerAlign: "left",
    align: "left",
  },
  {
    field: "fecha_creacion",
    headerName: "Creación",
    headerAlign: "left",
    align: "left",
  },
  {
    field: "faltas",
    headerName: "Faltas",
    type: "number",
    headerAlign: "left",
    align: "left",
  },
];

const mockEstudiantes = generarEstudiantesMock(100);

const Estudiantes_tabla = ({setCurrentLink}) => {
  const [estudiantes, setEstudiantes] = useState([]);
  const { id_usuario} = useParams();
  const navigate = useNavigate();
  const token = getCookie("token");
  const { fetch_the_data } = useFetch();
  useEffect(() => {
    (async () => {
      const data = await fetch_the_data(
        "http://localhost:8000/api/get_all_estudiantes_info",
        token,
        "GET"
      );
      data == undefined &&
        toast.error(
          "Ocurrio un error trayendo los estudiantes intenta denuevo"
        );

      if (data[0] == 200) {
        setEstudiantes(data[1]);
        return;
      }
      toast.error("Ocurrio un error trayendo los estudiantes intenta denuevo");
    })();
  }, []);


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
        rowSelection={false}
        localeText={localeText}
        onRowClick={(event) => {
          navigate(`/usuarios/${id_usuario}/estudiantes?est=${event.id}`);
          setCurrentLink(`${event.row.nombre_usuario} ${event.row.apellidos_usuario}`)
          
        }}
      />
    </Paper>
  );
};

export default Estudiantes_tabla;
