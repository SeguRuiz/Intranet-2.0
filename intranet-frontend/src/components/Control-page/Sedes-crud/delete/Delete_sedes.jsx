import React from 'react'
import { useFetch } from '../../../../services/llamados'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { set_sedes } from '../../../../redux/ControlUsuariosSlice'
import { vaciar_ids_temporales } from '../../../../redux/ControlUsuariosSlice'
const Delete_sedes = () => {
    const { seleccion_multiple_sedes, sedes } = useSelector(
        (e) => e.ControlUsuarios
      );
      const accion = useDispatch();
      const token = sessionStorage.getItem("token");
      const { define_fetch, fetch_the_data, } = useFetch();
    
      const eliminar_lista_sedes = async () => {
        define_fetch(
          "http://localhost:8000/cursos/eliminar_lista_sedes",
          "",
          "DELETE",
          {
            sedes: seleccion_multiple_sedes,
          }
        );
        const data = await fetch_the_data(token);
        console.log(data);
        let usuarios_copia = [...sedes];
        seleccion_multiple_sedes.forEach((e) => {
          const sedes_filtered = usuarios_copia.filter((x) => x.id != e.sede_id);
          usuarios_copia = sedes_filtered;
        });
        accion(set_sedes(usuarios_copia));
        accion(vaciar_ids_temporales('sedes'))

      };
  return (
    <>
   
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="30px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#9AA0A6"
          onClick={eliminar_lista_sedes}
        >
          <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
        </svg>
    
    </>
  )
}

export default Delete_sedes