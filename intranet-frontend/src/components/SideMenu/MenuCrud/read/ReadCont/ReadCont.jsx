import './ReadCont.css'
import DeleteContent from '../../Delete/DeleteContent'
import ReadSubConts from '../../../SubCrud/read/ReadSubConts'
import AddSubConts from '../../../SubCrud/add/AddSubConts'

import { useState } from 'react'
export const ReadCont = ({nombre, id, subContenidos}) => {
const [abrir, setAbrir] = useState(false)
const abrirCerrar = () => {
    abrir ? setAbrir(false) : setAbrir(true);
  };

  return (
    <>
    <div className='subCont-container'  style={{ height: abrir ? "auto" : "10.5vh" }}>
    <div key={id} className='read-container' onClick={abrirCerrar}>
           <div className='read-nombre'><p>{nombre}</p></div>
           <div className='read-contenidos'>
           </div>
           <div className='read-opciones'>
            <DeleteContent id={id}/>
           </div>
    </div>
      <AddSubConts Contenido_id={id}/>
      <ReadSubConts subContenidos={subContenidos}/>
    </div>
    </>
  )
}
