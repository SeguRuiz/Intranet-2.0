import './MenuRead.css'
import { ReadCont } from './ReadCont/ReadCont';
import { useSelector } from 'react-redux'
const MenuRead = () => {
const { Contenidos } = useSelector((state) => state.CursosContenidos);
  return (
    <>
    {Contenidos.map((contenido) =>(
       <ReadCont key={contenido.id} id={contenido.id} nombre={contenido.nombre}/>
    ))}
    </>
  )
}

export default MenuRead