import React from 'react'
import { useSelector } from 'react-redux'
import Select_grupos from './Select_grupos'

const Read_grupos = () => {
const {grupos} = useSelector(e => e.ControlUsuarios)
  return (
    <>
    {grupos.map(grupo =>(
      <Select_grupos key={grupo?.id} id={grupo?.id} nombre_grupo={grupo.nombre_grupo}/>
    ))}
    </>
  )
}

export default Read_grupos