import { useEffect, useState } from "react";
import { set_reportes } from "../../../../redux/ControlUsuariosSlice";
import { useDispatch, useSelector } from "react-redux";
import { useFetch } from "../../../../services/llamados";
import { getCookie } from "../../../../utils/Cookies";
import Select_reportes from "./Select_reportes";
import { set_empty } from "../../../../redux/ControlUsuariosSlice";
import report_empty from "../../../../assets/Empty/reportes_empty.svg";
import "./Read_reportes.css";
import { set_fetching } from "../../../../redux/FetchsSlice";

const Read_reportes = () => {
  const token = getCookie("token");
  const { fetch_the_data, fetching } = useFetch();
  const { reportes, empty } = useSelector((x) => x.ControlUsuarios);
  const [f, setF] = useState(false);
  const accion = useDispatch();

  useEffect(() => {
    accion(set_empty(reportes.length == 0 && f));
  }, [reportes, f]);

  useEffect(() => {
    (async () => {
      accion(set_fetching(true));
      if (reportes.length == 0) {
        const data = await fetch_the_data(
          "http://localhost:8000/reportes/reportes",
          token,
          "GET"
        );
        if (data[0] == 200) {
          accion(set_reportes(data[1]));
          setF(true);
        }
      }
      accion(set_fetching(false));
    })();
  }, []);
  return (
    <>
      {empty && f ? (
        <div className="empty-grupos-admin">
          <p>Aqui estaran tus reportes agregrados</p>
          <img
            src={report_empty}
            alt={"reportes info"}
            style={{ height: "75%", width: "75%" }}
          />
        </div>
      ) : fetching ? (
        <></>
      ) : (
        <>
          {reportes.map((reporte) => (
            <Select_reportes
              key={reporte?.id}
              fecha_creacion={reporte?.fecha_creado}
              usuario_id={reporte?.usuario_id}
              tipo_incidente={reporte?.tipo_incidente}
              estado={reporte?.estado}
              comprobante={reporte?.presento_comprobante}
              grupo={reporte?.grupo_id}
              sede={reporte?.sede_id}
              estudiante_id={reporte?.estudiante_id}
              detalles={reporte?.detalles}
              id={reporte?.id}
              comprobante_id={reporte?.archivo_id}
            />
          ))}
        </>
      )}
    </>
  );
};

export default Read_reportes;
