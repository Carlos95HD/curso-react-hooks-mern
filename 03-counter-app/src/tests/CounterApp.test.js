import React from 'react';
import { shallow } from 'enzyme'; 
import '@testing-library/jest-dom'
import CounterApp from '../CounterApp';

describe('Prueba en CounterApp', () => {

  let wrapper;

  beforeEach( () => {
    wrapper = shallow( <CounterApp /> )
  })

  test('Test <CounterApp >', () => {
    
    expect(wrapper).toMatchSnapshot();
  })


  test('debe mostrar el valor por defecto de 100', () => {

    const wrapper = shallow( <CounterApp value={ 100 }/> )

    const counterText = wrapper.find('h2').text().trim()
    console.log(counterText)

    expect(counterText).toBe("100")
  })

  test('debe incrementar con el boton +1', () => {
    
    wrapper.find('button').at(0).simulate('click');
    const counterText = wrapper.find('h2').text().trim()
    expect( counterText ).toBe( '11' )
    
  })


  test('debe decrementar con el boton -1', () => {
    
    wrapper.find('button').at(2).simulate('click');
    const counterText = wrapper.find('h2').text().trim()
    expect( counterText ).toBe( '9' )
    
  })

  test('debe colocar el valor por defecto con el btn reset', () => {
    const wrapper = shallow( <CounterApp value={ 105 }/> )

    wrapper.find('button').at(0).simulate('click');
    wrapper.find('button').at(0).simulate('click');
    wrapper.find('button').at(1).simulate('click');
    const counterText = wrapper.find('h2').text().trim()

    expect(counterText).toBe('105')
  })
  
  

})
