import React from 'react'
import { TodoList } from '../../../components/08-useReducer/TodoList';
import { demoTodos } from '../../fixtures/demoTodos';
import { shallow } from 'enzyme';

describe('Pruebas en Todolist', () => {
  
  const handleToggle = jest.fn();
  const handleDelete = jest.fn();

  const wrapper = shallow (
    <TodoList 
      todos={ demoTodos }
      handleDelete={ handleDelete }
      handleToggle={ handleToggle }
    />
  )

  test('should mostrarse correctamente', () => {
    
    expect( wrapper ).toMatchSnapshot()
  })

  test('should debe tener dos <TodoListItem />', () => {

    expect( wrapper.find('TodoListItem').length ).toBe( demoTodos.length)
    expect(wrapper.find('TodoListItem').at(0).prop('handleDelete') ).toEqual(expect.any(Function))//se espera a que sea una función
  })



})