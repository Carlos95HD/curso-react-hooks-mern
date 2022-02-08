import React from 'react';
import { HomeScreen } from '../../../components/09-useContext/HomeScreen';
import { UserContext } from '../../../components/09-useContext/UserContext';
import { mount } from 'enzyme';

describe('Pruebas en <HomeScreen />', () => {

  const user = {
    name:'Carlos',
    email:'carlos@gmail.com'
  }

  const wrapper = mount(
    <UserContext.Provider value={{
      user
    }}>

      <HomeScreen />
    </UserContext.Provider>
  )
  
  test('should mostrarse correctamente', () => {
    
    expect(wrapper).toMatchSnapshot()
  })
  
})
