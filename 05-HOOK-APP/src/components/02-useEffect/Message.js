import React, { useEffect, useState } from 'react'

export const Message = () => {

  const [coords, setCoords] = useState({ x:0 , y:0 })
  const { x, y } = coords

  useEffect(() => {

    // Función coords que añade las coords al useState()
    const mouseMove = (e) => {
      const coords = { x: e.x, y: e.y }
      setCoords( coords )
    }

    // Ejecutando el evento
    window.addEventListener('mousemove', mouseMove)

    // Limpieza del componente para evitar consumo de memoria y duplicidad del evento
    return () => {
      console.log( 'Componente Desmontado' )
      window.removeEventListener('mousemove', mouseMove)
    }

  }, [])

  return (
    <div>
      <h3>Eres Genial!</h3>
      <p>
        x:{ x } , y:{ y }
      </p>
    </div>
  )
}
