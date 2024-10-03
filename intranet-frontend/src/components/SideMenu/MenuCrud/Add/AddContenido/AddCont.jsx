import { useRef } from "react"
import { useCustomModal } from "../../../../../utils/customHooks"
import { pushContenidos } from "../../../../../redux/CursosContenidosSlice"
import { useDispatch } from "react-redux"
import { useFetch } from "../../../../../services/llamados"

export const AddCont = () => {
const modalRef = useRef()
const inputNombre = useRef()
const {openModal, closeModalDlg, closeModal} = useCustomModal(modalRef)
const {define_fetch, fetch_the_data_without_token} = useFetch()
const accion = useDispatch()

const subirContenido = async (o) => {
o.preventDefault()
const nombre_value = inputNombre.current.value.trim()
define_fetch("http://localhost:8000/cursos_contenidos/contenidos", "", "POST", {
    nombre: nombre_value,
    curso: '2fb1ba44-f02f-428b-9314-301b9316fac9'
})
const data = await fetch_the_data_without_token()
accion(pushContenidos(data[1]))
closeModal()
inputNombre.current.value = ""
}
  return (
    <>
    <button onClick={openModal}>Agregar</button>
    <dialog ref={modalRef} onClick={closeModalDlg} style={{margin: "auto"}}>
        <form onSubmit={subirContenido}>
        <input type="text" name="" placeholder="Nombre del contenido" ref={inputNombre} />
        </form>
    </dialog>
    </>
  )
}
