import './Read_sedes.css'
import { useSelector } from 'react-redux'
import Select_sedes from './Select_sedes'
const Read_sedes = () => {
const {sedes} = useSelector(e => e.ControlUsuarios)
  return (
    <>
    {sedes.map(sedes => (
      <Select_sedes key={sedes?.id} nombre={sedes?.nombre} ubicacion={sedes?.ubicacion} sede_id={sedes?.id}/>
    ))}
    </>
  )
}

export default Read_sedes