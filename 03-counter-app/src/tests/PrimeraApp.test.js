import React from 'react';
import { shallow } from 'enzyme'; 
import '@testing-library/jest-dom'
import PrimeraApp from "../PrimeraApp"

describe('Prueba en PrimeraApp', () => {
  // test('debe mostrar el mensaje hola soy goku', () => {
    
  //   const saludo = 'Hola soy Goku';

  //   const { getByText } = render(<PrimeraApp saludo={ saludo }/>)

  //   expect( getByText( saludo )).toBeInTheDocument()

  // })
  
  test('debe mostrar PrimeraApp correctamente', () => {
    
    const saludo = 'Hola soy Goku'
    const wrapper = shallow( <PrimeraApp saludo={ saludo }/> )

    expect(wrapper).toMatchSnapshot();
  })

  test('debe mostrar el subtitulo correctamente', () => {
    
    const saludo = 'Hola soy Goku'
    const subtitulo = 'Esto es un subtitulo'

    const wrapper = shallow( <PrimeraApp saludo={ saludo } subtitulo={ subtitulo }/> )

    const textoParrafo = wrapper.find('p').text();
    console.log( textoParrafo )

    expect( textoParrafo ).toBe( subtitulo )
  })
})
