import { MenuItem } from "@mui/material"
import { useDispatch } from "react-redux"
import { setUserNull } from "../../redux/AuthSlice"
import { useNavigate } from "react-router-dom"
import { setCookie } from "../../utils/Cookies"

const Log_out = () => {
 const dispatch = useDispatch()
 const navigate = useNavigate()

  return (
   <MenuItem onClick={()=>{
    dispatch(setUserNull())
    setCookie('token', '', 0)
    setCookie('refresh', '', 0)
    navigate('/')
   }}>
   Cerrar sesion
   </MenuItem>
  )
}

export default Log_out