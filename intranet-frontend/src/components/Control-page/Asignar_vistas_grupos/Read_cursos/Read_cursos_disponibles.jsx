import './Read_cursos.css'
import { useSelector } from 'react-redux'
import Select_cursos_disponibles from './Select_cursos_disponibles'
import { useDispatch } from 'react-redux'
import { set_empty } from '../../../../redux/ControlUsuariosSlice'
import { useEffect } from 'react'
const Read_cursos_disponibles = () => {
const {cursos} = useSelector(e => e.modal)
const accion = useDispatch()
useEffect(()=>{
  accion(set_empty(cursos[0] == undefined))
},[cursos])
  return (
    <>
    {cursos.map((curso)=>(
        <Select_cursos_disponibles key={curso?.id} nombre={curso.nombre} id={curso.id}/>
    ))}
    </>
  )
}

export default Read_cursos_disponibles