import { MenuItem, ListItemIcon, ListItemText } from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox';
import { MenuContext } from '../../../Control-page/Reportes/read/Menu_options_reportes';
import { useContext } from 'react';

const AddSubContV2 = ({contenido_id = null, setAddSubcont, setOpen, bloqueado = false}) => {
   const {setMenu} = useContext(MenuContext)
   
   
  return (
    <MenuItem onClick={()=>{
        setOpen(true)
        setAddSubcont(true)
        setMenu(false)

    }} disabled={bloqueado}>
    <ListItemIcon>
        <AddBoxIcon sx={{color: 'var(--OnsurfaceVariant)'}}/>
    </ListItemIcon>
    <ListItemText primary="Añadir un archivo" sx={{color: 'var(--OnsurfaceVariant)'}}/>
    </MenuItem>
  )
}

export default AddSubContV2
