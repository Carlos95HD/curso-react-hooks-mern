import React, { useMemo, useState } from 'react'
import { procesoPesado } from '../../helpers/procesoPesado';
import { useCounter } from '../../Hooks/useCounter'
import '../02-useEffect/effects.css'


export const MemoHook = () => {
  const { counter, increment } = useCounter( 500 );
  const [show, setShow] = useState(true)

  const memoProcesoPesado = useMemo(() => procesoPesado(counter),[counter])

  return (
    <div>
      <h3>Counter: <small>{ memoProcesoPesado }</small></h3>
      <hr />

      <button
        className='btn btn-primary'
        onClick={ increment }
      >
        +1
      </button>

      <button
        className='btn btn-outline-primary ml-3'
        onClick={ () => {
          setShow(!show)
        } }
      >
        Show/Hide { JSON.stringify( show ) }
      </button>

    </div>
  )
}
