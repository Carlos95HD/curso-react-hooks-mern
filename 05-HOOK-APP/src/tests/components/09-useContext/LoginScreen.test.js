import React, { useContext } from 'react'
import { mount } from 'enzyme';
import { LoginScreen } from '../../../components/09-useContext/LoginScreen';
import { UserContext } from '../../../components/09-useContext/UserContext';

describe('Test <LoginScreen>', () => {

  const setUser = jest.fn()

  const wrapper = mount(
    <UserContext.Provider value={{
      setUser
    }}>

      <LoginScreen />
    </UserContext.Provider>
  )

  test('should mostrarse correctamente', () => {
    expect( wrapper ).toMatchSnapshot()
  });

  test('should ejecutar el setUser con el argumento esperado', () => {

    // wrapper.find("button").simulate("click");
    wrapper.find("button").prop("onClick")();

    expect( setUser ).toHaveBeenCalledWith({
      id:1233,
      name:"carlos"
    })

  });
  
})
