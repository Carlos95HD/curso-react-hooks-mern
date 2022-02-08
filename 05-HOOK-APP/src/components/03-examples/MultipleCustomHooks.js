import React from 'react'
import { useCounter } from '../../Hooks/useCounter'
import { useFetch } from '../../Hooks/useFetch'
import '../02-useEffect/effects.css'

export const MultipleCustomHooks = () => {

  const {counter, increment} = useCounter(1)

  const { loading, data } = useFetch(`https://breakingbadapi.com/api/quotes/${counter}`)
  //si !!data devuelve false no retornara data[0] 
  const { author, quote } = !!data && data[0]


  return (
    <div>
      <h1>BreakingBad Quotes</h1>
      <hr />

      {
        loading ?
        <div className='alert alert-info text-center'>
          loading...
        </div>
        :
        <blockquote className='blockquote text-right'>
          <p className="mb-0">{ quote }</p>
          <footer className='blockquote-footer'>{ author }</footer>
        </blockquote>
      }

      <button 
      className='btn btn-primary'
      onClick={ increment }
      >Siguiente
      </button>

    </div>
  )
}
