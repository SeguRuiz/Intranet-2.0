import { Box } from '@mui/material'
import Informacion_personal_card from '../../Informacion_personal_card/Informacion_personal_card'
import Data_table_Reportes from '../../Reportes_estusiante_page/Data_Reportes/Data_table_Reportes'
import Informacion_academica from '../../Informacion_personal_card/Informacion_academica'

const Selected_estudent_page = ({estudiante_id}) => {
  return (
    
    <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        width: '100%',
        pb: 5
    }}>
    <Informacion_personal_card id_usuario={estudiante_id}/>
    <Informacion_academica id_usuario={estudiante_id}/>
    <Data_table_Reportes id_usuario={estudiante_id}/>
    </Box>
    
  )
}

export default Selected_estudent_page