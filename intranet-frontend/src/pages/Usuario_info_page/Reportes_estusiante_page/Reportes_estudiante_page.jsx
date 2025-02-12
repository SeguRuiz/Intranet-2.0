import { Box } from "@mui/material";
import Data_table_Reportes from "./Data_Reportes/Data_table_Reportes";
import Filtros_Reportes from "./Filtros_reportes/Filtros_Reportes";
const Reportes_estudiante_page = () => {
  return (
    <Box
      sx={{
        pl: 2,
        pr: 2,
        pt: 2,
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        alignItems: "center",
      }}
    >
      <Filtros_Reportes/>
      <Data_table_Reportes />
    </Box>
  );
};

export default Reportes_estudiante_page;
