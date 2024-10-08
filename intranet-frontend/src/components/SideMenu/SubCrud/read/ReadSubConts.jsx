import React, { useRef } from 'react'

import ReadSubComp from './readSybComponent/ReadSubComp'

const ReadSubConts = ({subContenidos = []}) => {
 console.log(subContenidos);
  return (
    <>
    {subContenidos.map((subContenidos) => (
        <ReadSubComp subcontenido={subContenidos} key={subContenidos.id}/>
    ))}
    </>
  )
}

export default ReadSubConts