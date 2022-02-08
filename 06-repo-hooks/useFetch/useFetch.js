import { useState, useEffect, useRef } from 'react'

export const useFetch = (url) => {

  const estaMontado = useRef(true)
  const [state, setstate] = useState({data: null, loading:true, error: null})

  useEffect(() => {

    return () => {
      estaMontado.current = false;
    }
  }, [])

  useEffect(() => {

    setstate({data: null, loading:true, error: null})

    fetch(url)
    .then(resp => resp.json() )
    .then( data => {

      if (estaMontado.current) {
        setstate({
          loading: false,
          error: null,
          data
        })
      }

    }).catch(() => {
      setstate({
        data: null,
        loading:false, 
        error: 'No se pudo cargar la información'
      })
    })

  }, [url])

  return state;
}

