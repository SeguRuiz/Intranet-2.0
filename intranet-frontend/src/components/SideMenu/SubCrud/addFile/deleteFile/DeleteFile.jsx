import React from 'react'
import { useFetch } from '../../../../../services/llamados'
import { delete_archivos_subcontenidos } from '../../../../../redux/CursosContenidosSlice'
import { useDispatch } from 'react-redux'
const DeleteFile = ({id, contenido_id, archivo_key, set }) => {
  const {define_fetch, fetch_the_data_without_token} = useFetch()
  const accion = useDispatch()

  const DeleteFile = async () => {
    console.log(archivo_key);
    
    define_fetch('http://localhost:8000/files/delete_archivo', "", "DELETE", {
        method: 'DELETE',
        id: archivo_key
       
    })
    const data = await fetch_the_data_without_token()
    console.log(data);
    
    accion(delete_archivos_subcontenidos({contenido_id: contenido_id, subcontenido_id:id, key:archivo_key}))
    set(false)
    
 }

  return (
    <>
    <button onClick={DeleteFile}>Eliminar archivo</button>
    </>
  )
}

export default DeleteFile