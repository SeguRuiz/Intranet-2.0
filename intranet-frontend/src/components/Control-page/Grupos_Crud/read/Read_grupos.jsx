import { useSelector } from "react-redux";
import Select_grupos from "./Select_grupos";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { set_empty } from "../../../../redux/ControlUsuariosSlice";
import empty_grupos_admin from "../../../../assets/Empty/empty_grupos_admin.svg"

const Read_grupos = () => {
  const { grupos, empty } = useSelector((e) => e.ControlUsuarios);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(set_empty(grupos[0] == undefined));
  }, [grupos]);

  return (
    <>
      {empty ? (
          <div className="empty-grupos-admin">
            <p>Aqui estaran tus grupos agregados</p>
          <img src={empty_grupos_admin} alt="empty" style={{height: '60%', width: '60%'}}/>
          </div>
       
      ) : (
        <>
          {grupos.map((grupo) => (
            <Select_grupos
              key={grupo?.id}
              id={grupo?.id}
              nombre_grupo={grupo.nombre_grupo}
              usuarios_grupo={grupo?.integrantes}
              sedes_id={grupo?.sede_id}
            />
          ))}
        </>
      )}
    </>
  );
};

export default Read_grupos;
