import React from 'react';
import { mount } from "enzyme"
import { AppRouters } from '../../routers/AppRouters';
import { AuthContext } from '../../auth/AuthContext';

describe('Pruebas en <AppRouter />', () => {
  
  const contextValue = {
    dispatch: jest.fn(),
    user:{
      logged:false
    }
  };

  test('should mostrar el login si no esta autenticado', () => {
    
    const wrapper = mount(
      <AuthContext.Provider value={ contextValue }>
        <AppRouters />
      </AuthContext.Provider>
      
    );

    expect(wrapper).toMatchSnapshot();
  })

  test('should mostrar el componente marvel si esta autenticado', () => {
    
    const contextValue = {
      dispatch: jest.fn(),
      user:{
        logged:true,
        name:'Carlos'
      }
    };

    const wrapper = mount(
      <AuthContext.Provider value={ contextValue }>
        <AppRouters />
      </AuthContext.Provider>
    );

    expect(wrapper.find('.navbar').exists()).toBe(true);
  })
})
