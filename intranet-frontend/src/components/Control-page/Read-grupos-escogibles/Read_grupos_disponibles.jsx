import './Read_grupos_disponibles.css'
import { useSelector } from 'react-redux'
import Select_grupos_disponibles from './Select_grupos_disponibles'
const Read_grupos_disponibles = () => {
    const {grupos} = useSelector(e => e.ControlUsuarios)
  return (
   <>
   {grupos.map(grupo => (
     <Select_grupos_disponibles key={grupo?.id} nombre={grupo?.nombre_grupo} id={grupo?.id}/>
   ))}
   </>
  )
}

export default Read_grupos_disponibles