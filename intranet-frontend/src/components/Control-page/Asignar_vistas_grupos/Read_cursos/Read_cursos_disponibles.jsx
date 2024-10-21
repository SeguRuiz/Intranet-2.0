import './Read_cursos.css'
import { useSelector } from 'react-redux'
import Select_cursos_disponibles from './Select_cursos_disponibles'
const Read_cursos_disponibles = () => {
const {cursos} = useSelector(e => e.modal)
  return (
    <>
    {cursos.map((curso)=>(
        <Select_cursos_disponibles key={curso?.id} nombre={curso.nombre} id={curso.id}/>
    ))}
    </>
  )
}

export default Read_cursos_disponibles