import './ReadCont.css'
import DeleteContent from '../../Delete/DeleteContent'
export const ReadCont = ({nombre, id}) => {
  return (
    <>
    <div key={id} className='read-container'>
           <div className='read-nombre'><p>{nombre}</p></div>
           <div className='read-contenidos'></div>
           <div className='read-opciones'>
            <DeleteContent id={id}/>
           </div>
    </div>
    </>
  )
}
