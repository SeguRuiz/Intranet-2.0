import "./Asistencias_page.css";
import Header_student from "../../components/Home/header/Header_student";
import { Box, Button, Grid2, Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AsistenciasTable from "../../components/AsistenciasTable/AsistenciasTable";
import AsistenciasFilas from "../../components/AsistenciasCrud/read/AsistenciasFilas";
import { useFetch } from "../../services/llamados";
import { getCookie } from "../../utils/Cookies";
import { useParams } from "react-router-dom";
import {
  setEstudiantesDelDia,
  setInformeAsubir,
} from "../../redux/Asistencias";
import { useDispatch, useSelector } from "react-redux";
import ReporteAsubir from "../../components/AsistenciasCrud/read/ReporteASubir/ReporteAsubir";
import SubirReporteAsistencia from "../../components/AsistenciasCrud/add/SubirReporteAsistencia";

const columnas = [
  { contenido: "Perfil", align: "right" },
  {
    contenido: "Nombre",
    align: "right",
  },
  { contenido: "Presente", align: "right" },
  { contenido: "Ausente", align: "right" },
  { contenido: "Tardia", align: "right" },
  { contenido: "Retiro", align: "right" },
];

const TomaDeAsistencias_page = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [mounted, setMounted] = useState(false);
  const token = getCookie("token");
  const { fetch_the_data } = useFetch();
  const { id_grupo } = useParams();
  const accion = useDispatch();
  const { informeAsubir } = useSelector((x) => x.Asistencias);
  const { userInSession } = useSelector((x) => x.Auth);

  useEffect(() => {
    return () => {
      setMounted(false);
      setUsuarios([]);
      accion(setEstudiantesDelDia([]));
      accion(setInformeAsubir([]));
    };
  }, []);

  useEffect(() => {
    (async () => {
      const usuarios_del_grupo = await fetch_the_data(
        "http://localhost:8000/cursos/obtener_grupo_del_usuario",
        token,
        "POST",
        {
          grupo_id: id_grupo,
        }
      );
      console.log(usuarios_del_grupo);

      if (usuarios_del_grupo[0] == 200) {
        accion(setEstudiantesDelDia(usuarios_del_grupo[1]));
        setMounted(true);
      }
    })();
  }, [id_grupo]);

  const sideBar = () => {
    const presente = informeAsubir.filter((x) => x.estado != "presente");

    return presente.length == 0 ? 0 : 3;
  };

  return (
    <div className="asistencias-page-cont">
      <div className="asistenicas-nav-cont">
        <Header_student salirBtn={true} />
      </div>
      <Grid2 container height={"100%"} columns={10}>
        <Grid2 size={sideBar()} sx={{ transition: "0.3s" }}>
          <Box
            sx={{
              width: "100%",
              height: "84vh",
              overflow: "auto",
              scrollBehavior: "smooth",
              scrollbarWidth: "thin",
              marginTop: "13px",
            }}
          >
            <ReporteAsubir />
          </Box>
        </Grid2>
        <Grid2
          size="grow"
          sx={{
            borderRadius: informeAsubir.length == 0 ? 0 : "10px",
            backgroundColor: "var(--Surface-color)",
            transition: "0.3s",
          }}
          alignSelf={"center"}
          justifySelf={"center"}
          marginRight={sideBar()}
          paddingBottom={"1%"}
        >
          <Box
            sx={{
              height: "20%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              paddingLeft: "1%",
            }}
          >
            {!mounted ? (
              <Skeleton
                variant="text"
                sx={{ fontSize: "50px" }}
                width={"40%"}
              ></Skeleton>
            ) : (
              <Typography
                fontSize={"35px"}
                color="var(--OnsurfaceVariant)"
                textOverflow={"ellipsis"}
              >
                Control de asistencia
              </Typography>
            )}
            {!mounted ? (
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
            {!mounted ? (
              <Skeleton
                variant="rounded"
                sx={{ height: "69vh", width: "100%" }}
              />
            ) : (
              <AsistenciasTable
                maxHeight="60vh"
                pagination={true}
                height="69vh"
                columnas={columnas}
                AccionesExtra={
                  <>
                    <SubirReporteAsistencia profesor_id={userInSession?.id} />
                  </>
                }
              >
                <AsistenciasFilas />
              </AsistenciasTable>
            )}
          </Box>
        </Grid2>
      </Grid2>
    </div>
  );
};

export default TomaDeAsistencias_page;
