import React from 'react';
import { TodoAdd } from '../../../components/08-useReducer/TodoAdd';
import { shallow } from 'enzyme';

describe('Pruebas en <TodoAdd />', () => {

  const handleAddTodo = jest.fn();

  const wrapper = shallow(
    <TodoAdd
      handleAddTodo={handleAddTodo}
    />
  )

  test('should mostrarse correctamente', () => {
    expect(wrapper).toMatchSnapshot()
  })
  
  test('no debe de llamar handleAddTodo', () => {
    
    const formSubmit = wrapper.find('form').prop('onSubmit')

    formSubmit({preventDefault(){}})

    expect(handleAddTodo).toHaveBeenCalledTimes(0)
  })

  test('should llamar la función handleAddTodo', () => {

    const value = 'Aprender React'

    wrapper.find('input').simulate('change', {
      target:{
        value,
        name:'description'
      }
    })

    const formSubmit = wrapper.find('form').prop('onSubmit')
    formSubmit({preventDefault(){}})

    //Esperar que sea llamado 1 vez y con el objeto
    expect(handleAddTodo).toHaveBeenCalledTimes(1)
    expect(handleAddTodo).toHaveBeenCalledWith({
      id: expect.any(Number),
      desc: value,
      done:false
    })

    //Verificar que el input esté vacio al llamar la funcion(hacer el submit)
    // expect(wrapper.find('input').text() ).toBe('')
    expect(wrapper.find('input').prop('value') ).toBe('')
  })

})
