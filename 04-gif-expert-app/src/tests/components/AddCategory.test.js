import React from 'react'
import { shallow } from "enzyme";
import { AddCategory } from "../../components/AddCategory";


describe('pruebas en <AddCategory />', () => {

  const setCategories = jest.fn();
  let wrapper = shallow( <AddCategory setCategories = { setCategories }/> )

  beforeEach( () => {
    jest.clearAllMocks();
    wrapper = shallow( <AddCategory setCategories = { setCategories }/> )
  });

  test('Se debe mostrar correctamente', () => {
    expect( wrapper ).toMatchSnapshot();
  })

  // test('debe cambiar la caja de texto', () => {
  //   const input = wrapper.find('input');
  //   const value = 'Hola Mundo'
  //   input.simulate( 'change', { target: {value} } )

  //   expect( wrapper.find('p').text().trim() ).toBe( value )
  // })

  test('No debe postear la información del submit', () => {

    wrapper.find('form').simulate( 'submit', { preventDefault(){} } );

    expect( setCategories ).not.toHaveBeenCalled();
  })

  test('se debe llamar el setCategories y limpiar la caja de texto', () => {

    const value = 'Hola'
    // 1 simultar el inputChange
    const input = wrapper.find('input');
    input.simulate('change', { target: { value } });

    // 2 simular el submit
    wrapper.find('form').simulate( 'submit', { preventDefault(){} } );

    // 3 setCategories se debe de haber llamado
    expect(setCategories).toHaveBeenCalled();

    //Funcion para saber las cantidad de veces ha sido llamada
    expect(setCategories).toHaveBeenCalledTimes(1);
    //Espera una función a travez
    expect(setCategories).toHaveBeenCalledWith( expect.any(Function) );

    // 4 el valor del input debe de estar ''
    expect( wrapper.find('input').prop('value')).toBe('');
  });


});