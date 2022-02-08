import { useForm } from "../../Hooks/useForm"
import  { renderHook, act } from '@testing-library/react-Hooks'

describe('Pruebas en useForm', () => {
  
  const initialForm = {
    name:'Carlos',
    email:'carlos@gmail.com'
  }

  test('Debe regresar un formulario por defecto', () => {
    
    const { result } = renderHook( () => useForm(initialForm))
    const [ values, handleInputChange, reset ] = result.current

    expect(values).toEqual(initialForm)
    expect(typeof handleInputChange ).toBe('function')
    expect(typeof reset ).toBe('function')

  })


  test('debe cambiar el valor del formulario (cambiar name)', () => {
        
    const { result } = renderHook( () => useForm(initialForm))
    const [ , handleInputChange] = result.current

    act(() => {
      handleInputChange({
        target:{
          name:'name',
          value:'Hernan'
        }
      })
    })

    const [ values ] = result.current
    expect( values ).toEqual( {...values, name:'Hernan' })

  })

  test('debe re-establecer el formularion con RESET', () => {
    const { result } = renderHook( () => useForm(initialForm))
    const [ , handleInputChange, reset] = result.current

    act(() => {
      handleInputChange({
        target:{
          name:'name',
          value:'Hernan'
        }
      })

      reset()

    })

    const [ values ] = result.current
    expect( values ).toEqual( initialForm )

  })
})
