import "./Asistencias_page.css";
import Header_student from "../../components/Home/header/Header_student";
import {
  Box,
  Button,
  Grid2,
  Paper,
  Skeleton,
  
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import AsistenciasTable from "../../components/AsistenciasTable/AsistenciasTable";
import AsistenciasFilas from "../../components/AsistenciasCrud/read/AsistenciasFilas";
import { useSelector } from "react-redux";

const TomaDeAsistencias_page = () => {
  const [loading, setLoading] = useState(true);
 

  

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);


  return (
    <div className="asistencias-page-cont">
      <div className="asistenicas-nav-cont">
        <Header_student salirBtn={true} />
      </div>
      <Grid2 container height={"100%"} columns={10}>
        <Grid2 size={1}>
          <Paper sx={{ width: "100%", height: "100%" }}></Paper>
        </Grid2>
        <Grid2 size={9} spacing={1}>
          <Box
            sx={{
              height: "20%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              paddingLeft: "1%",
            }}
          >
            {loading ? (
              <Skeleton
                variant="text"
                sx={{ fontSize: "60px" }}
                width={"40%"}
              ></Skeleton>
            ) : (
              <Typography fontSize={"45px"} color="var(--OnsurfaceVariant)">
                Control de asistencia
              </Typography>
            )}
            {loading ? (
              <Skeleton
                variant="text"
                sx={{ fontSize: "25px" }}
                width={"20%"}
              ></Skeleton>
            ) : (
              <Typography
                fontSize={"20px"}
                color="var(--OnsurfaceVariant)"
                sx={{ opacity: 0.7 }}
                paddingLeft={"5px"}
              >
                Nombre de la sede - dia - mes - año
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              height: "80%",

              display: "flex",
              alignItems: "start",
              justifyContent: "center",
              paddingLeft: "1%",
              paddingRight: "1%",
            }}
          >
            {loading ? (
              <Skeleton
                variant="rounded"
                sx={{ height: "95%", width: "100%" }}
              />
            ) : (
              <AsistenciasTable
                maxHeight="60vh"
                pagination={true}
                height="69vh"
                AccionesExtra={
                  <>
                    <Button variant="contained">holaa</Button>
                  </>
                }
                
              >
                <AsistenciasFilas/>
              </AsistenciasTable>
            )}
          </Box>
        </Grid2>
      </Grid2>
    </div>
  );
};

export default TomaDeAsistencias_page;
