import React from 'react'

export const Small = React.memo( ({ value }) => {

  console.log('Small LLamado')

  return (
      <small>{ value }</small>
  )
})