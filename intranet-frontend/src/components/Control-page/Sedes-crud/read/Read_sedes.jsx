import "./Read_sedes.css";
import { useSelector } from "react-redux";
import Select_sedes from "./Select_sedes";
import { useDispatch } from "react-redux";
import { set_empty } from "../../../../redux/ControlUsuariosSlice";
import { useEffect } from "react";
import empty_sedes from '../../../../assets/Empty/sedes_empty.svg'
const Read_sedes = () => {
  const { sedes, empty } = useSelector((e) => e.ControlUsuarios);

  const accion = useDispatch();
  useEffect(() => {
    accion(set_empty(sedes[0] == undefined));
  }, [sedes]);
  return (
    <>
      {empty ? (
        <div className="empty-grupos-admin">
          <p>Aqui estaran tus sedes agregadas</p>
          <img src={empty_sedes} alt="emptysedes" style={{height: '50%', width: '50%'}} />
        </div>
      ) : (
        <>
          {sedes.map((sedes) => (
            <Select_sedes
              key={sedes?.id}
              nombre={sedes?.nombre}
              ubicacion={sedes?.ubicacion}
              sede_id={sedes?.id}
            />
          ))}
        </>
      )}
    </>
  );
};

export default Read_sedes;
