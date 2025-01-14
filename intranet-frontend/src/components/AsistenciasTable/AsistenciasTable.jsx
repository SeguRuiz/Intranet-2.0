import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TablePagination,
  Box,
  Grid2,
} from "@mui/material";
import { createContext, useState } from "react";

const columnasDefault = [
  {
    contenido: "Nombre",
    align: "right",
  },
  {
    contenido: "Apellido",
    align: "right",
  },
  {
    contenido: "Cedula",
    align: "right",
  },
];

export const MuiTableFilasContext = createContext();

const MuiTable = ({
  columnas = columnasDefault,
  height = "100%",
  width = "100%",
  maxHeight = "100%",
  pagination = true,
  headerColor = "var(--PrymaryContainer-color)",
  textColor = "var(--OnPrymary-color)",
  AccionesExtra = null,
  children,
}) => {
  const [filas, setFilas] = useState([]);
  const [page, setPage] = useState(0);
  const [filasPorPagina, setFilasPorPagina] = useState(10);

  const handleCambioPagina = (event, nuevaPagina) => {
    setPage(nuevaPagina);
  };

  const handleCambioDeFilasPorPagina = (event) => {
    setFilasPorPagina(+event.target.value);
    setPage(0);
  };

  return (
    <MuiTableFilasContext.Provider
      value={{
        calcularPaginas: () => {
          return filas.slice(
            page * filasPorPagina,
            page * filasPorPagina + filasPorPagina
          );
        },
        setFilas,
        filas,
      }}
    >
      <Box
        sx={{
          height: height,
          width: width,
          borderRadius: "5px",
          overflow: "hidden",
          bgcolor: headerColor,
        }}
      >
        <TableContainer
          sx={{
            maxHeight: maxHeight,
            height: maxHeight,
            scrollbarColor: `${textColor} ${headerColor}`,
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow sx={{ bgcolor: headerColor }}>
                {columnas.map((columna, i) => (
                  <TableCell
                    key={i}
                    sx={{ bgcolor: headerColor, color: textColor }}
                  >
                    {columna.contenido}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>{children}</TableBody>
          </Table>
        </TableContainer>
        {pagination && (
          <Grid2 container columns={2}>
            {AccionesExtra && (
              <Grid2
                size={1}
                sx={{ bgcolor: headerColor, paddingLeft: "1%" }}
                display={"flex"}
                justifyContent={"start"}
                alignItems={"center"}
              >
                {AccionesExtra}
              </Grid2>
            )}
            <Grid2 size="grow">
              <TablePagination
                rowsPerPageOptions={[5, 10]}
                page={page}
                component={"div"}
                count={filas.length}
                onPageChange={handleCambioPagina}
                rowsPerPage={filasPorPagina}
                onRowsPerPageChange={handleCambioDeFilasPorPagina}
                sx={{ bgcolor: headerColor, color: textColor }}
                labelRowsPerPage="Filas por pagina:"
              />
            </Grid2>
          </Grid2>
        )}
      </Box>
    </MuiTableFilasContext.Provider>
  );
};

export default MuiTable;
