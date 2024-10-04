import React, { useRef } from 'react'
import './ReadSubConts.css'
const ReadSubConts = ({subContenidos = []}) => {
 
  return (
    <>
    {subContenidos.map((subContenidos) => (
        <div style={{height: '10vh', border: 'solid black 1.5px'}} key={subContenidos.id}>{subContenidos.nombre}</div>
    ))}
    </>
  )
}

export default ReadSubConts