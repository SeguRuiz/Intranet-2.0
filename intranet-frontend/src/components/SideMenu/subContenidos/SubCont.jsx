import './SubCont.css'
const SubCont = () => {
 const arrayPrueba = [0,1,2,3]
  return (
    <>
    {
     arrayPrueba.map((subCont, i) => (
        <div key={i} className='subContenido'>
            <p style={{marginLeft: "10px"}}>Sub Contenido</p>
        </div>
     ))
    }
    </>
  )
}
 
export default SubCont