import { Card, CardHeader, Collapse, Stack } from "@mui/material";
import ReporteAsubirCard from "./ReporteAsubirCard";
import { useSelector } from "react-redux";
import { TransitionGroup } from "react-transition-group";
import ReportIcon from "@mui/icons-material/Report";

const ReporteAsubir = () => {
  const { informeAsubir } = useSelector((x) => x.Asistencias);
  

  const sideBar = () => {
    const presente = informeAsubir.filter((x) => x.estado != "presente");

    return presente.length == 0;
  };
  return (
    <Stack spacing={1}  paddingRight={1} paddingLeft={1}>
      <Collapse in={!sideBar()} unmountOnExit>
        <Card
          sx={{
            borderRadius: "10px",
            backgroundColor: "var(--Surface-color)",
            position: "sticky",
            top: 40,
          }}
        >
          <CardHeader
            avatar={<ReportIcon fontSize="large" sx={{ color: "#410002" }} />}
            sx={{ height: "6vh" }}
            title={"Reportes a enviar"}
            subheader="Se creara un reporte de los siguientes estudiantes cuando subas la asistencia"
          ></CardHeader>
        </Card>
      </Collapse>
      <TransitionGroup>
        {informeAsubir.map((x) => (
          <Collapse key={x.id}>
            <ReporteAsubirCard
              key={x?.id}
              nombre={x.nombre}
              estado={x.estado}
            />
          </Collapse>
        ))}
      </TransitionGroup>
    </Stack>
  );
};

export default ReporteAsubir;
