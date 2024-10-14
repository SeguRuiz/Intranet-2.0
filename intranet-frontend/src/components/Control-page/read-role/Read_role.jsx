import './Read_role.css'
import { useSelector } from 'react-redux'
import Role_container from './Role_container'
import Retractile_menu from '../Retractile_menu/Retractile_menu'

const Read_role = () => {
const {roles} = useSelector(e => e.ControlUsuarios)
  return (
   
   <Retractile_menu titulo='Roles' altura={30} >
    <div className='select-roles-container'>
   {roles.map(e=>(
    <Role_container key={e?.id} tipo={e?.tipo}/>
   ))}
    </div>
   </Retractile_menu>
  
  )
}

export default Read_role